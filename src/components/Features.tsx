
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_FEATURES } from "@/lib/featureFlags";
import { useIsMobile } from "@/hooks/use-mobile";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const orb1Ref = useRef<HTMLSpanElement>(null);
  const orb2Ref = useRef<HTMLSpanElement>(null);
  const tiltInnerRef = useRef<HTMLDivElement>(null);
  const holoBorderRef = useRef<HTMLDivElement>(null);
  const iconRef = useRef<HTMLDivElement>(null);
  const [showEnergyRing, setShowEnergyRing] = React.useState(false);
  const isMobile = useIsMobile();
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-slide-up");
            observer.unobserve(entry.target);

            // Anime.js: pop-in + orbiters (behind flags and reduced-motion/mobile guards)
            if (!ENABLE_ANIME_GLOBAL || !ENABLE_ANIME_FEATURES) return;
            if (typeof window === 'undefined') return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            if (prefersReduced || isMobile) return;

            let orbit1: any = null;
            let orbit2: any = null;
            let holoBorderAnim: any = null;
            (async () => {
              const mod: any = await import('animejs');
              const anime = (mod.default ?? mod) as any;

              // Gentle pop-in scale on the card
              if (cardRef.current) {
                anime({
                  targets: cardRef.current,
                  scale: [0.98, 1],
                  opacity: [0.9, 1],
                  duration: 500,
                  easing: 'easeOutQuad',
                  delay: 50,
                });
              }

              // Tiny orbiters around corners
              const startOrbit = (el: HTMLSpanElement | null, startAngle: number) => {
                if (!el) return null as any;
                const state = { angle: startAngle } as { angle: number };
                return anime({
                  targets: state,
                  angle: startAngle + 360,
                  duration: 5000,
                  easing: 'linear',
                  loop: true,
                  update: () => {
                    const a = (state.angle * Math.PI) / 180;
                    const r = 10; // small radius for subtle motion
                    const x = Math.cos(a) * r;
                    const y = Math.sin(a) * r;
                    el.style.transform = `translate(${x}px, ${y}px)`;
                  }
                });
              };

              orbit1 = startOrbit(orb1Ref.current, 0);
              orbit2 = startOrbit(orb2Ref.current, 180);
              
              // Holographic border rotation
              if (holoBorderRef.current) {
                holoBorderAnim = anime({
                  targets: holoBorderRef.current,
                  rotate: 360,
                  duration: 8000,
                  easing: 'linear',
                  loop: true,
                });
              }
            })();

            // Attach cleanup for the Anime orbits
            const cleanup = () => {
              orbit1 && orbit1.pause && orbit1.pause();
              orbit2 && orbit2.pause && orbit2.pause();
              holoBorderAnim && holoBorderAnim.pause && holoBorderAnim.pause();
              if (orb1Ref.current) orb1Ref.current.style.transform = '';
              if (orb2Ref.current) orb2Ref.current.style.transform = '';
              if (holoBorderRef.current) holoBorderRef.current.style.transform = '';
            };
            // Ensure cleanup runs if component unmounts before observer callback completes
            (cardRef.current as any).__animeCleanup = cleanup;

            // 3D tilt interaction on pointer move (futuristic feel)
            if (!prefersReduced && !isMobile && cardRef.current && tiltInnerRef.current) {
              const cardEl = cardRef.current;
              const innerEl = tiltInnerRef.current;
              let raf = 0;
              const onMove = (e: PointerEvent) => {
                const rect = cardEl.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                const rotY = x * 10;
                const rotX = -y * 8;
                cancelAnimationFrame(raf);
                raf = requestAnimationFrame(() => {
                  innerEl.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale3d(1.03,1.03,1.03)`;
                });
                
                // Show holographic border on hover
                if (holoBorderRef.current) {
                  holoBorderRef.current.style.opacity = '1';
                }
              };
              const onLeave = () => {
                cancelAnimationFrame(raf);
                innerEl.style.transform = 'perspective(800px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)';
                if (holoBorderRef.current) {
                  holoBorderRef.current.style.opacity = '0';
                }
              };
              cardEl.addEventListener('pointermove', onMove);
              cardEl.addEventListener('pointerleave', onLeave);
              (cardRef.current as any).__tiltCleanup = () => {
                cardEl.removeEventListener('pointermove', onMove);
                cardEl.removeEventListener('pointerleave', onLeave);
              };
            }
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
        const maybeCleanup = (cardRef.current as any).__animeCleanup;
        if (typeof maybeCleanup === 'function') maybeCleanup();
        const maybeTiltCleanup = (cardRef.current as any).__tiltCleanup;
        if (typeof maybeTiltCleanup === 'function') maybeTiltCleanup();
      }
    };
  }, []);
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6 group relative",
        "lg:hover:bg-gradient-to-br lg:hover:from-card lg:hover:to-muted",
        "transition-all duration-300 hover:scale-105 hover:shadow-2xl"
      )}
      style={{ animationDelay: `${0.2 * index}s` }}
    >
      {/* Subtle orbiters (visibility controlled by feature flags via CSS presence only) */}
      <span ref={orb1Ref} className="feature-orb absolute top-3 right-3"></span>
      <span ref={orb2Ref} className="feature-orb absolute bottom-3 left-3"></span>
      
      {/* Holographic rotating border */}
      <div ref={holoBorderRef} className="holo-border" aria-hidden="true"></div>
      
      <div ref={tiltInnerRef} className="will-change-transform">
        <div 
          ref={iconRef} 
          className="rounded-full bg-muted w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-primary mb-4 sm:mb-5 transition-transform duration-300 group-hover:rotate-12 group-hover:scale-110 glow-pulse relative"
          onMouseEnter={() => setShowEnergyRing(true)}
          onMouseLeave={() => setShowEnergyRing(false)}
        >
          {icon}
          {showEnergyRing && !isMobile && (
            <>
              <span className="energy-ring absolute inset-0 animate-[energy-pulse_1s_ease-out]" style={{ animationDelay: '0s' }}></span>
              <span className="energy-ring absolute inset-0 animate-[energy-pulse_1s_ease-out]" style={{ animationDelay: '0.3s' }}></span>
              <span className="energy-ring absolute inset-0 animate-[energy-pulse_1s_ease-out]" style={{ animationDelay: '0.6s' }}></span>
            </>
          )}
        </div>
        <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3 text-foreground">{title}</h3>
        <p className="text-muted-foreground text-sm sm:text-base">{description}</p>
      </div>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const titleSheenRef = useRef<HTMLSpanElement>(null);
  const gridSweepRef = useRef<HTMLSpanElement>(null);
  const particleContainerRef = useRef<HTMLDivElement>(null);
  const scanLineRef = useRef<HTMLDivElement>(null);
  const dataStreamRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  // Magnetic cursor effect
  useEffect(() => {
    if (isMobile || !sectionRef.current) return;
    
    const section = sectionRef.current;
    const trail = cursorTrailRef.current;
    let rafId = 0;
    
    const handleMouseMove = (e: MouseEvent) => {
      const rect = section.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      
      // Update cursor trail
      if (trail) {
        cancelAnimationFrame(rafId);
        rafId = requestAnimationFrame(() => {
          trail.style.left = `${x}px`;
          trail.style.top = `${y}px`;
          trail.style.opacity = '1';
        });
      }
      
      // Magnetic attraction on cards
      const cards = section.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        const cardRect = card.getBoundingClientRect();
        const cardX = cardRect.left + cardRect.width / 2 - rect.left;
        const cardY = cardRect.top + cardRect.height / 2 - rect.top;
        const distance = Math.sqrt(Math.pow(x - cardX, 2) + Math.pow(y - cardY, 2));
        
        if (distance < 200) {
          const strength = (200 - distance) / 200;
          const moveX = (x - cardX) * strength * 0.15;
          const moveY = (y - cardY) * strength * 0.15;
          (card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`;
        } else {
          (card as HTMLElement).style.transform = '';
        }
      });
    };
    
    const handleMouseLeave = () => {
      if (trail) trail.style.opacity = '0';
      const cards = section.querySelectorAll('.feature-card');
      cards.forEach((card) => {
        (card as HTMLElement).style.transform = '';
      });
    };
    
    section.addEventListener('mousemove', handleMouseMove);
    section.addEventListener('mouseleave', handleMouseLeave);
    
    return () => {
      section.removeEventListener('mousemove', handleMouseMove);
      section.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(rafId);
    };
  }, [isMobile]);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const elements = entry.target.querySelectorAll(".fade-in-element");
            elements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add("animate-fade-in");
              }, index * 100);
            });
            observer.unobserve(entry.target);

            // Start section-level sheens when visible
            if (!ENABLE_ANIME_GLOBAL || !ENABLE_ANIME_FEATURES) return;
            if (typeof window === 'undefined') return;
            const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
            const isMobileCheck = window.innerWidth < 768;
            if (prefersReduced || isMobileCheck) return;

            (async () => {
              const mod: any = await import('animejs');
              const isV4 = !!(mod?.animate || mod?.default?.animate);
              const anime = isV4 
                ? (mod.animate || mod?.default?.animate)
                : (mod.default ?? mod);
              const createTimeline = isV4 
                ? (mod.createTimeline || mod?.default?.createTimeline)
                : (anime?.timeline);
              
              // Title sheen
              if (titleSheenRef.current && createTimeline) {
                if (isV4) {
                  const tl = createTimeline();
                  tl.add(titleSheenRef.current, {
                    x: [{ to: '240%', duration: 1800 }],
                    ease: 'inOutSine',
                  }).add(titleSheenRef.current, {
                    opacity: [{ to: 1, duration: 300 }, { to: 0, duration: 300 }],
                    ease: 'outSine',
                  }, '-=1200');
                  tl.play({ loop: true });
                } else {
                  const tl = createTimeline({ loop: true, autoplay: true });
                  tl.add({
                    targets: titleSheenRef.current,
                    translateX: ["-120%", "120%"],
                    duration: 1800,
                    easing: "easeInOutSine",
                  }).add({
                    targets: titleSheenRef.current,
                    opacity: [0, 1, 0],
                    duration: 600,
                    easing: "easeOutSine",
                    offset: "-=1200",
                  });
                }
              }

              // Grid sweep
              if (gridSweepRef.current) {
                if (isV4) {
                  anime(gridSweepRef.current, {
                    x: [{ to: '300%', duration: 3500 }],
                    ease: 'inOutSine',
                    loop: true,
                  });
                } else {
                  anime({
                    targets: gridSweepRef.current,
                    translateX: ["-150%", "150%"],
                    easing: 'easeInOutSine',
                    duration: 3500,
                    loop: true,
                  });
                }
              }

              // Particle field: create 30 floating particles
              if (particleContainerRef.current) {
                const container = particleContainerRef.current;
                const particleCount = 30;
                const particles: HTMLDivElement[] = [];
                
                for (let i = 0; i < particleCount; i++) {
                  const particle = document.createElement('div');
                  particle.className = 'particle-dot';
                  particle.style.left = `${Math.random() * 100}%`;
                  particle.style.top = `${Math.random() * 100}%`;
                  container.appendChild(particle);
                  particles.push(particle);
                }

                // Animate particles with random floating motion
                particles.forEach((p, i) => {
                  anime({
                    targets: p,
                    translateY: [
                      { value: -20 + Math.random() * 40, duration: 2000 + Math.random() * 2000 },
                      { value: 0, duration: 2000 + Math.random() * 2000 }
                    ],
                    translateX: [
                      { value: -15 + Math.random() * 30, duration: 2500 + Math.random() * 2000 },
                      { value: 0, duration: 2500 + Math.random() * 2000 }
                    ],
                    opacity: [
                      { value: 0.3 + Math.random() * 0.5, duration: 1500 + Math.random() * 1000 },
                      { value: 0.1 + Math.random() * 0.3, duration: 1500 + Math.random() * 1000 }
                    ],
                    loop: true,
                    easing: 'easeInOutSine',
                    delay: i * 100,
                  });
                });
              }

              // Scan line: vertical sweep
              if (scanLineRef.current) {
                anime({
                  targets: scanLineRef.current,
                  top: ['0%', '100%'],
                  duration: 4000,
                  easing: 'linear',
                  loop: true,
                  delay: 1000,
                });
              }

              // Data stream: scrolling text effect
              if (dataStreamRef.current) {
                const stream = dataStreamRef.current;
                const chars = '01アイウエオカキクケコ><[]{}';
                let content = '';
                for (let i = 0; i < 200; i++) {
                  content += chars[Math.floor(Math.random() * chars.length)];
                  if (i % 20 === 19) content += '\n';
                }
                stream.textContent = content;
                
                anime({
                  targets: stream,
                  translateY: ['-20%', '-80%'],
                  duration: 15000,
                  easing: 'linear',
                  loop: true,
                });
              }
            })();
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);
  
  return (
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-muted/30 overflow-hidden" id="features" ref={sectionRef}>
      {/* Cyberpunk background layers */}
      <div className="cyber-grid absolute inset-0" aria-hidden="true"></div>
      <div className="hex-pattern absolute inset-0" aria-hidden="true"></div>
      
      {/* Cursor trail */}
      <div ref={cursorTrailRef} className="cursor-trail" aria-hidden="true"></div>
      
      {/* Particle field background */}
      <div ref={particleContainerRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>
      
      {/* Scan line effect */}
      <div ref={scanLineRef} className="scan-line absolute top-0 opacity-50" aria-hidden="true"></div>
      
      {/* Data stream overlay on edges */}
      <div className="absolute left-0 top-0 bottom-0 w-12 opacity-20 pointer-events-none" aria-hidden="true">
        <div ref={dataStreamRef} className="data-stream"></div>
      </div>
      <div className="absolute right-0 top-0 bottom-0 w-12 opacity-20 pointer-events-none rotate-180" aria-hidden="true">
        <div className="data-stream"></div>
      </div>
      
      <div className="section-container relative z-10">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element animate-slide-in-left neon-text">
            <span className="relative inline-block">
              Key Value Propositions
              <span ref={titleSheenRef} aria-hidden className="sheen-bar absolute inset-y-0 left-0 w-[40%] -translate-x-[120%]"></span>
            </span>
          </h2>
        </div>
        
        <div className="relative">
          <span ref={gridSweepRef} aria-hidden className="sheen-bar absolute inset-y-0 left-0 w-[30%] -translate-x-[150%] z-[1]"></span>
          <div className="relative grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8">
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-card border border-border hover:shadow-elegant hover:scale-105 transition-all duration-300 opacity-0 fade-in-element group">
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-primary group-hover:scale-105 transition-transform">Reflect — Understand yourself</h3>
              <p className="text-foreground text-sm sm:text-base mb-4">
                Capture voice, text, and short reflections. See emotional patterns and growth over time.
              </p>
              <p className="text-sm text-muted-foreground italic">
                (Powered by the ETI.AI™ reflective system)
              </p>
            </div>
            
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-card border border-border hover:shadow-elegant hover:scale-105 transition-all duration-300 opacity-0 fade-in-element group">
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-primary group-hover:scale-105 transition-transform">Preserve — Private and tamper-evident</h3>
              <p className="text-foreground text-sm sm:text-base">
                Store everything in a secure offline capsule and encrypted vault. Only you decide who can access your memories.
              </p>
            </div>
            
            <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-muted/50 to-card border border-border hover:shadow-elegant hover:scale-105 transition-all duration-300 opacity-0 fade-in-element group">
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-primary group-hover:scale-105 transition-transform">Pass on — Verifiable continuity</h3>
              <p className="text-foreground text-sm sm:text-base">
                When you choose, trusted family can access an inheritable digital identity that preserves voice, stories and preferences with clear provenance.
              </p>
            </div>
          </div>
        </div>
        
        <div className="text-center opacity-0 fade-in-element">
          <a href="/features" className="button-primary inline-block hover:animate-pulse-glow relative overflow-hidden group">
            <span className="relative z-10">Explore features</span>
            <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" aria-hidden="true"></span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Features;
