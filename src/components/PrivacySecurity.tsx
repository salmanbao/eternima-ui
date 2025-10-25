import React, { useEffect, useRef, useState } from "react";
import { Shield, Lock, Key, FileCheck } from "lucide-react";

const PrivacySecurity = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const shieldRef = useRef<HTMLDivElement>(null);

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
    if (shieldRef.current) {
      observer.observe(shieldRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
      if (shieldRef.current) {
        observer.unobserve(shieldRef.current);
      }
    };
  }, []);

  const features = [
    {
      title: "Local-first architecture",
      description: "Most processing happens on your device; nothing leaves your phone unless you explicitly choose to share. (If you choose LuxVault or other hardware options, they are encrypted and offline by default.)",
      icon: Lock,
      badge: "Zero-Knowledge"
    },
    {
      title: "User-controlled inheritance",
      description: "You set who can access your archive and under what conditions — no automatic transfers.",
      icon: Key,
      badge: "Your Control"
    },
    {
      title: "Tamper evidence & provenance",
      description: "Each saved item includes verifiable integrity metadata so changes can be detected.",
      icon: FileCheck,
      badge: "Verifiable"
    },
    {
      title: "Biometric safeguards",
      description: "When you use VaultKey or LuxVault, access is protected by biometric verification for continuity and safety.",
      icon: Shield,
      badge: "Protected"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-brand-secondary/5 to-white relative overflow-hidden" id="privacy">
      {/* Animated background elements */}
      <div className="absolute top-10 right-10 w-32 h-32 bg-brand-primary/10 rounded-full blur-3xl animate-pulse-slow"></div>
      <div className="absolute bottom-10 left-10 w-40 h-40 bg-brand-secondary/10 rounded-full blur-3xl animate-pulse-slow" style={{ animationDelay: '1s' }}></div>

      <div className="section-container relative z-10">
        {/* Central Shield Icon */}
        <div ref={shieldRef} className="flex justify-center mb-8 opacity-0">
          <div className="relative">
            <Shield className="w-16 h-16 sm:w-20 sm:h-20 text-brand-primary animate-pulse-glow" />
            {/* Pulsing rings */}
            <div className="absolute inset-0 rounded-full border-2 border-brand-primary animate-ping opacity-20"></div>
            <div className="absolute inset-0 rounded-full border-2 border-brand-primary animate-ping opacity-20" style={{ animationDelay: '0.5s' }}></div>
          </div>
        </div>

        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="section-title">Privacy & Security</h2>
          <p className="section-subtitle mx-auto mb-8">
            Privacy is central. We design for the person, not the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {features.map((feature, index) => (
            <SecurityFeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>

        <div className="text-center mt-12">
          <div className="inline-block p-6 rounded-2xl bg-gradient-to-br from-brand-primary/10 to-brand-secondary/10 border border-brand-tertiary">
            <p className="text-lg text-gray-800 font-medium italic max-w-2xl">
              "Everything we build is designed so you — and only you — keep control."
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

interface SecurityFeatureCardProps {
  feature: {
    title: string;
    description: string;
    icon: React.ElementType;
    badge: string;
  };
  index: number;
}

const SecurityFeatureCard = ({ feature, index }: SecurityFeatureCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const Icon = feature.icon;

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.2 }
    );
    
    if (cardRef.current) {
      observer.observe(cardRef.current);
    }
    
    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [isVisible]);

  return (
    <div 
      ref={cardRef}
      className="relative group p-6 sm:p-8 rounded-2xl bg-white border-2 border-brand-tertiary hover:border-brand-primary hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-1 opacity-0"
      style={{ 
        animation: isVisible ? `slide-in-${index % 2 === 0 ? 'left' : 'right'} 0.6s ease-out forwards` : 'none',
        animationDelay: `${index * 0.15}s` 
      }}
    >
      {/* Badge */}
      <div 
        className="absolute -top-3 -right-3 bg-brand-primary text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0"
        style={{ 
          animation: isVisible ? 'scale-in-bounce 0.5s ease-out forwards' : 'none',
          animationDelay: `${index * 0.15 + 0.3}s` 
        }}
      >
        {feature.badge}
      </div>

      {/* Icon */}
      <div className="flex items-start gap-4 mb-4">
        <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center text-brand-primary group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300">
          <Icon className="w-6 h-6" />
        </div>
        <h3 className="text-lg sm:text-xl font-display font-semibold text-brand-secondary group-hover:text-brand-primary transition-colors duration-300 pt-2">
          {feature.title}
        </h3>
      </div>

      {/* Description */}
      <p className="text-gray-700 text-sm sm:text-base leading-relaxed pl-16">
        {feature.description}
      </p>

      {/* Animated border pulse */}
      <div className="absolute inset-0 rounded-2xl border-2 border-brand-primary opacity-0 group-hover:opacity-100 group-hover:animate-ping pointer-events-none"></div>
    </div>
  );
};

export default PrivacySecurity;
