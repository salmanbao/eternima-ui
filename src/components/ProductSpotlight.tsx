import React, { useState, useEffect, useRef } from "react";
import { ENABLE_ANIME_GLOBAL } from "@/lib/featureFlags";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
  index: number;
  badge?: string;
}

const ProductCard = ({ title, description, features, index, badge }: ProductCardProps) => {
  const [isHovered, setIsHovered] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
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
      }
    };
  }, []);

  // 3D tilt on hover
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = (e.clientX - cx) / rect.width;
    const dy = (e.clientY - cy) / rect.height;
    const rotX = dy * -8;
    const rotY = dx * 8;
    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) scale(1.02)`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)';
  };

  return (
    <div 
      ref={cardRef}
      className="group relative opacity-0 perspective-1000 transition-transform duration-300 will-change-transform"
      style={{ animationDelay: `${index * 0.15}s` }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => {
        setIsHovered(false);
        handleMouseLeave();
      }}
      onMouseMove={handleMouseMove}
    >
      {badge && (
        <div className="absolute -top-3 -right-3 z-10 bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold animate-float">
          {badge}
        </div>
      )}
      
      <div className="relative p-6 sm:p-8 rounded-2xl bg-white border border-brand-tertiary hover:border-brand-primary hover:shadow-2xl transition-all duration-500 overflow-hidden">
        {/* Holo border and energy ring on hover */}
        <div className="holo-border" aria-hidden="true"></div>
        <div className="energy-ring absolute inset-4 rounded-2xl pointer-events-none opacity-0 group-hover:opacity-100 group-hover:animate-[energy-pulse_1.2s_ease-out_infinite]" aria-hidden="true"></div>
        
        {/* Scanline effect */}
        <div className="scan-line absolute left-0 right-0 top-0 h-[2px] opacity-0 group-hover:opacity-100 pointer-events-none" style={{ animationDelay: '0.3s' }} aria-hidden="true"></div>

        <div className="relative z-10">
          <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 text-brand-primary group-hover:text-brand-secondary transition-colors duration-300">
            {title}
          </h3>
          <div className="h-1 w-0 bg-brand-primary group-hover:w-full transition-all duration-500 mb-3"></div>
        </div>
        
        <p className="relative z-10 text-gray-700 mb-6 text-sm sm:text-base">{description}</p>
        
        <ul className="relative z-10 space-y-3">
          {features.map((feature, idx) => (
            <li 
              key={idx} 
              className="text-gray-600 text-sm flex items-start opacity-0 animate-slide-in-right"
              style={{ animationDelay: isHovered ? `${idx * 0.1}s` : '0s', animationFillMode: 'forwards' }}
            >
              <span className="text-brand-primary mr-2 text-lg">✓</span>
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        {/* Hover CTA */}
        <div className={`relative z-10 mt-6 overflow-hidden transition-all duration-300 ${isHovered ? 'max-h-20 opacity-100' : 'max-h-0 opacity-0'}`}>
          <a 
            href="/features" 
            className="inline-flex items-center text-brand-primary hover:text-brand-secondary font-semibold transition-colors"
          >
            Learn More →
          </a>
        </div>
      </div>
    </div>
  );
};

const ProductSpotlight = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  // Anime.js: stagger cards in + sweeping sheen
  useEffect(() => {
    if (!ENABLE_ANIME_GLOBAL) return;
    if (typeof window === 'undefined') return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) return;

    let cleanupFns: Array<() => void> = [];

    (async () => {
      const mod: any = await import('animejs');
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4 ? (mod.animate || mod?.default?.animate) : (
        (typeof mod === 'function' && mod) ||
        (typeof mod?.default === 'function' && mod.default) ||
        (typeof mod?.anime === 'function' && mod.anime) ||
        (typeof mod?.default?.anime === 'function' && mod.default.anime)
      );
      if (!animateFn) return;

      // Animate scanline sweeps on cards
      const scanlines = Array.from(document.querySelectorAll('.scan-line'));
      if (scanlines.length > 0) {
        scanlines.forEach((line) => {
          if (isV4) {
            animateFn(line, {
              top: [{ to: '100%', duration: 2000 }],
              ease: 'linear',
              loop: true,
              delay: Math.random() * 1000,
            });
          } else {
            animateFn({
              targets: line,
              top: ['0%', '100%'],
              duration: 2000,
              easing: 'linear',
              loop: true,
              delay: Math.random() * 1000,
            });
          }
        });
      }
    })();

    return () => {
      cleanupFns.forEach((fn) => fn());
    };
  }, []);

  const products = [
    {
      title: "ETI.AI™ — Reflective Intelligence",
      description: "A private personal AI that learns from your voice, text, and behavior to create a personal mirror for self-awareness, memory recall, and compassionate conversations.",
      features: [
        "Personalized reflections and timelines",
        "Emotion-aware highlights and trend reports",
        "Local-first: data stays on your device"
      ],
      badge: "Most Popular"
    },
    {
      title: "LuxVault Capsule™ — Offline Data Vault",
      description: "A biometric, air-gapped storage capsule for your complete life archive. Ideal for families who want a tamper-proof legacy store.",
      features: [
        "Biometric access (VaultKey option)",
        "Tamper-evident, offline-first storage",
        "Secure export options for legal inheritance"
      ]
    },
    {
      title: "Lumirec™ — Wearable Voice Recorder",
      description: "Lightweight wearable designed to capture high-fidelity voice and emotional cues on the move. Syncs securely with the app and LuxVault.",
      features: [
        "High-fidelity voice capture",
        "Emotional cue detection",
        "Secure sync with app and vault"
      ]
    },
    {
      title: "SoulNFT™ — Verifiable Digital Identity",
      description: "A living, inheritable digital identity that links your AI twin, biometric keys, and secure vault access — designed for long-term continuity (user-controlled).",
      features: [
        "Inheritable digital identity",
        "Links AI twin and biometric keys",
        "User-controlled access and permissions"
      ],
      badge: "New"
    }
  ];

  return (
    <section ref={sectionRef} className="relative w-full py-12 sm:py-20 bg-gradient-to-b from-white to-brand-tertiary/20" id="products">
      {/* In-section grid overlay for visibility */}
      <div aria-hidden className="absolute inset-0 cyber-grid opacity-30 pointer-events-none"></div>
      
      <div className="section-container relative z-10">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Product Spotlight</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each product is designed to work seamlessly together, creating a complete ecosystem for preserving and reflecting on your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} index={index} />
          ))}
        </div>

        <div className="text-center">
          <a 
            href="/pricing"
            className="inline-block px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg"
          >
            Compare plans & devices
          </a>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
