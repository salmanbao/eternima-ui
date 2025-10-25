
import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ArrowRight } from "lucide-react";
import LottieAnimation from "./LottieAnimation";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_HERO } from "@/lib/featureFlags";

const Hero = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLImageElement>(null);
  const sheenRef = useRef<HTMLSpanElement>(null);
  const orbRef = useRef<HTMLSpanElement>(null);
  const [lottieData, setLottieData] = useState<any>(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if mobile on mount and when window resizes
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // .lottie files are dotLottie format (ZIP archives), not plain JSON
    // Skip loading or use a JSON alternative instead
    // For now, silently skip to avoid console errors
    fetch('/loop-header.lottie')
      .then(response => {
        // Check if response is JSON
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
          return response.json();
        } else {
          // .lottie files are binary ZIP format, not JSON
          // Skip parsing and use null
          return null;
        }
      })
      .then(data => {
        if (data) setLottieData(data);
      })
      .catch(error => {
        // Silently handle error - .lottie format requires special loader
        console.debug("Lottie animation not loaded (requires dotLottie player)");
      });
  }, []);

  useEffect(() => {
    // Skip effect on mobile
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current || !imageRef.current) return;
      
      const {
        left,
        top,
        width,
        height
      } = containerRef.current.getBoundingClientRect();
      const x = (e.clientX - left) / width - 0.5;
      const y = (e.clientY - top) / height - 0.5;

      imageRef.current.style.transform = `perspective(1000px) rotateY(${x * 2.5}deg) rotateX(${-y * 2.5}deg) scale3d(1.02, 1.02, 1.02)`;
    };
    
    const handleMouseLeave = () => {
      if (!imageRef.current) return;
      imageRef.current.style.transform = `perspective(1000px) rotateY(0deg) rotateX(0deg) scale3d(1, 1, 1)`;
    };
    
    const container = containerRef.current;
    if (container) {
      container.addEventListener("mousemove", handleMouseMove);
      container.addEventListener("mouseleave", handleMouseLeave);
    }
    
    return () => {
      if (container) {
        container.removeEventListener("mousemove", handleMouseMove);
        container.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, [isMobile]);

  // Anime.js: Hero sheen and orbit (feature-flagged, v4 compatible)
  useEffect(() => {
    if (!ENABLE_ANIME_GLOBAL || !ENABLE_ANIME_HERO) return;
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;
    if (isMobile) return;
    let cleanupFns: Array<() => void> = [];

    (async () => {
      const mod: any = await import("animejs");
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4 ? (mod.animate || mod?.default?.animate) : (
        (typeof mod === 'function' && mod) ||
        (typeof mod?.default === 'function' && mod.default) ||
        (typeof mod?.anime === 'function' && mod.anime) ||
        (typeof mod?.default?.anime === 'function' && mod.default.anime)
      );
      const createTimeline: any = isV4 ? (mod.createTimeline || mod?.default?.createTimeline) : (animateFn && animateFn.timeline);
      if (!animateFn) return;

      // Sheen sweep
      if (sheenRef.current) {
        if (isV4 && createTimeline) {
          const tl = createTimeline({ loop: true });
          tl.add(sheenRef.current, {
            x: [{ to: '240%', duration: 1800 }],
            ease: 'inOutSine',
          }).add(sheenRef.current, {
            opacity: [{ to: 1, duration: 300 }, { to: 0, duration: 300 }],
            ease: 'outSine',
          }, '-=1200');
          cleanupFns.push(() => { if (tl.pause) tl.pause(); });
        } else if (createTimeline) {
          const tl = createTimeline({ loop: true, autoplay: true });
          tl.add({
            targets: sheenRef.current,
            translateX: ["-120%", "120%"],
            duration: 1800,
            easing: "easeInOutSine",
          }).add({
            targets: sheenRef.current,
            opacity: [0, 1, 0],
            duration: 600,
            easing: "easeOutSine",
            offset: "-=1200",
          });
          cleanupFns.push(() => { if (tl.pause) tl.pause(); });
        }
      }

      // Orbit
      if (orbRef.current) {
        const state: { angle: number } = { angle: 0 };
        if (isV4) {
          const orbit = animateFn(state, {
            angle: [{ to: 360, duration: 6000 }],
            ease: 'linear',
            loop: true,
            onUpdate: () => {
              if (!orbRef.current) return;
              const a = (state.angle * Math.PI) / 180;
              const r = 26;
              const x = Math.cos(a) * r;
              const y = Math.sin(a) * r;
              orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
            },
          });
          cleanupFns.push(() => { if (orbit && typeof orbit === 'function') orbit(); });
        } else {
          const orbit = animateFn({
            targets: state,
            angle: 360,
            duration: 6000,
            easing: "linear",
            loop: true,
            update: () => {
              if (!orbRef.current) return;
              const a = (state.angle * Math.PI) / 180;
              const r = 26;
              const x = Math.cos(a) * r;
              const y = Math.sin(a) * r;
              orbRef.current.style.transform = `translate(${x}px, ${y}px)`;
            },
          }) as any;
          cleanupFns.push(() => { if (orbit && orbit.pause) orbit.pause(); });
        }
      }
    })();

    return () => {
      cleanupFns.forEach((fn) => fn());
      if (sheenRef.current) {
        sheenRef.current.style.transform = "";
        sheenRef.current.style.opacity = "";
      }
      if (orbRef.current) {
        orbRef.current.style.transform = "";
      }
    };
  }, [isMobile]);
  
  useEffect(() => {
    // Skip parallax on mobile
    if (isMobile) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const elements = document.querySelectorAll('.parallax');
      elements.forEach(el => {
        const element = el as HTMLElement;
        const speed = parseFloat(element.dataset.speed || '0.1');
        const yPos = -scrollY * speed;
        element.style.setProperty('--parallax-y', `${yPos}px`);
      });
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMobile]);
  
  return (
    <section 
      className="overflow-hidden relative bg-gradient-to-br from-primary via-secondary to-primary/80" 
      id="hero" 
      style={{
        padding: isMobile ? '100px 12px 40px' : '120px 20px 60px'
      }}
    >
      <div className="absolute -top-[10%] -right-[5%] w-1/2 h-[70%] bg-accent/20 blur-3xl rounded-full"></div>
      
      <div className="container px-4 sm:px-6 lg:px-8" ref={containerRef}>
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-12 items-center">
          <div className="w-full lg:w-1/2">
            <h1 
              className="section-title text-3xl sm:text-4xl lg:text-5xl xl:text-6xl leading-tight opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.1s" }}
            >
              <span className="relative inline-block">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-brand-primary via-brand-primary to-accent">
                  Eternima
                </span>
                {/* Sheen bar overlay (feature-flagged via effect) */}
                <span ref={sheenRef} aria-hidden className="sheen-bar absolute inset-y-0 left-0 w-[40%] -translate-x-[120%]"></span>
              </span>
              {" "}—{" "}
              <span className="text-gray-900">preserve your life, voice, and memory forever</span>
            </h1>
            
            <p 
              style={{ animationDelay: "0.3s" }} 
              className="section-subtitle mt-3 sm:mt-6 mb-3 sm:mb-4 leading-relaxed opacity-0 animate-fade-in text-gray-950 font-normal text-base sm:text-lg text-left"
            >
              A private, verifiable digital mirror that learns how you think, feel, and act — so your stories, values and memories live on for the people who matter.
            </p>
            
            <p 
              style={{ animationDelay: "0.4s" }} 
              className="mt-3 sm:mt-4 mb-3 sm:mb-4 leading-relaxed opacity-0 animate-fade-in text-gray-700 text-sm sm:text-base text-left"
            >
              Eternima helps you capture daily thoughts, voice recordings and emotional moments, turning them into a private, searchable life memory and a personalized reflection AI. Use it now for self-discovery, family continuity, or preserving stories for future generations.
            </p>
            
            <p 
              style={{ animationDelay: "0.5s" }} 
              className="mt-2 sm:mt-3 mb-4 sm:mb-6 leading-relaxed opacity-0 animate-fade-in text-gray-600 text-sm italic text-left"
            >
              Private by design — your data stays with you; you control who can access and inherit it.
            </p>
            
            <div 
              className="flex flex-col sm:flex-row gap-4 opacity-0 animate-fade-in" 
              style={{ animationDelay: "0.7s" }}
            >
              <a 
                href="#how-it-works" 
                className="button-primary flex items-center justify-center group w-full sm:w-auto text-center relative overflow-hidden hover:animate-pulse-glow"
              >
                Get the App — start your reflection
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </a>
              <a 
                href="#how-it-works" 
                className="px-6 sm:px-8 py-3 sm:py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-all duration-300 flex items-center justify-center w-full sm:w-auto text-center opacity-0 animate-fade-in animation-delay-200"
              >
                How it works
              </a>
            </div>
            
            {/* Floating Privacy Badge */}
            <div 
              className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-tertiary/30 border border-brand-tertiary opacity-0 animate-slide-in-right animation-delay-1000"
            >
              <svg className="w-4 h-4 text-brand-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <span className="text-sm font-medium text-gray-700">Private by Design</span>
            </div>
          </div>
          
          <div className="w-full lg:w-1/2 relative mt-6 lg:mt-0">
            {lottieData ? (
              <div className="relative z-10 animate-fade-in" style={{ animationDelay: "0.9s" }}>
                <LottieAnimation 
                  animationPath={lottieData} 
                  className="w-full h-auto max-w-lg mx-auto"
                  loop={true}
                  autoplay={true}
                />
                {/* Hero orbiting orb */}
                <span ref={orbRef} aria-hidden className="hero-orb absolute top-[25%] left-[70%]" />
              </div>
            ) : (
              <>
              <div className="absolute inset-0 bg-dark-900 rounded-2xl sm:rounded-3xl -z-10 shadow-xl"></div>
              <div className="relative transition-all duration-500 ease-out overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl">
                <img 
                  ref={imageRef} 
                  src="/lovable-uploads/5663820f-6c97-4492-9210-9eaa1a8dc415.png" 
                  alt="Atlas Robot" 
                  className="w-full h-auto object-cover transition-transform duration-500 ease-out" 
                  style={{ transformStyle: 'preserve-3d' }} 
                />
                <div className="absolute inset-0" style={{ backgroundImage: 'url("/hero-image.jpg")', backgroundSize: 'cover', backgroundPosition: 'center', mixBlendMode: 'overlay', opacity: 0.5 }}></div>
                {/* Hero orbiting orb (image fallback) */}
                <span ref={orbRef} aria-hidden className="hero-orb absolute top-[25%] left-[70%]" />
              </div>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="hidden lg:block absolute bottom-0 left-1/4 w-64 h-64 bg-brand-tertiary/30 rounded-full blur-3xl -z-10 parallax" data-speed="0.05"></div>
    </section>
  );
};

export default Hero;
