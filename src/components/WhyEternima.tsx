import React, { useEffect, useRef, useState } from "react";
import { Users, Heart, Briefcase, Library } from "lucide-react";

const WhyEternima = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [visibleCards, setVisibleCards] = useState<number[]>([]);

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

  const benefits = [
    {
      title: "For families",
      description: "Keep grandparents' stories, voices and advice accessible and verifiable across generations.",
      icon: Users,
      color: "text-blue-500"
    },
    {
      title: "For caregivers & therapists",
      description: "Gain context on emotional patterns and responses to support care (consent-based).",
      icon: Heart,
      color: "text-rose-500"
    },
    {
      title: "For creators & professionals",
      description: "Preserve your voice and reasoning for future reuse — ethically and privately.",
      icon: Briefcase,
      color: "text-amber-500"
    },
    {
      title: "For heritage organizations",
      description: "Capture verified oral histories and cultural memory with integrity.",
      icon: Library,
      color: "text-emerald-500"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-brand-tertiary/10 to-white" id="why">
      <div className="section-container">
        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="section-title">Why Eternima</h2>
          <p className="section-subtitle mx-auto">
            Eternima is built for the things that matter — privacy, dignity, and continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <BenefitCard 
                key={index}
                benefit={benefit}
                Icon={Icon}
                index={index}
                onVisible={() => setVisibleCards(prev => [...prev, index])}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

interface BenefitCardProps {
  benefit: {
    title: string;
    description: string;
    color: string;
  };
  Icon: React.ElementType;
  index: number;
  onVisible: () => void;
}

const BenefitCard = ({ benefit, Icon, index, onVisible }: BenefitCardProps) => {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !isVisible) {
            setIsVisible(true);
            onVisible();
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
  }, [isVisible, onVisible]);

  return (
    <div 
      ref={cardRef}
      className="group p-6 sm:p-8 rounded-2xl bg-white border border-brand-tertiary hover:border-brand-primary hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 opacity-0"
      style={{ 
        animationName: isVisible ? 'fade-in' : 'none',
        animationDuration: '0.6s',
        animationTimingFunction: 'ease-out',
        animationFillMode: 'forwards',
        animationDelay: `${index * 0.15}s` 
      }}
    >
      <div className="flex items-start gap-4">
        {/* Animated Icon */}
        <div 
          className={`flex-shrink-0 w-14 h-14 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center ${benefit.color} transform transition-all duration-500 ${isVisible ? 'animate-scale-in-bounce' : 'scale-0 opacity-0'}`}
          style={{ animationDelay: `${index * 0.15 + 0.2}s` }}
        >
          <Icon className="w-7 h-7 group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300" />
        </div>

        <div className="flex-1">
          <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 text-brand-secondary group-hover:text-brand-primary transition-colors duration-300">
            {benefit.title}
          </h3>
          <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
            {benefit.description}
          </p>
        </div>
      </div>

      {/* Animated underline on hover */}
      <div className="mt-4 h-1 w-0 bg-gradient-to-r from-brand-primary to-brand-secondary group-hover:w-full transition-all duration-500 rounded-full"></div>
    </div>
  );
};

export default WhyEternima;
