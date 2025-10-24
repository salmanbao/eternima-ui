
import React, { useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  index: number;
}

const FeatureCard = ({ icon, title, description, index }: FeatureCardProps) => {
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
  
  return (
    <div 
      ref={cardRef}
      className={cn(
        "feature-card glass-card opacity-0 p-4 sm:p-6",
        "lg:hover:bg-gradient-to-br lg:hover:from-white lg:hover:to-pakistan-50",
        "transition-all duration-300"
      )}
      style={{ animationDelay: `${0.1 * index}s` }}
    >
      <div className="rounded-full bg-pakistan-50 w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center text-pakistan-500 mb-4 sm:mb-5">
        {icon}
      </div>
      <h3 className="text-lg sm:text-xl font-semibold mb-2 sm:mb-3">{title}</h3>
      <p className="text-gray-600 text-sm sm:text-base">{description}</p>
    </div>
  );
};

const Features = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  
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
    <section className="py-12 sm:py-16 md:py-20 pb-0 relative bg-gray-50" id="features" ref={sectionRef}>
      <div className="section-container">
        <div className="text-center mb-10 sm:mb-16">
          <h2 className="section-title mb-3 sm:mb-4 opacity-0 fade-in-element">
            Key Value Propositions
          </h2>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 mb-8">
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-pulse-50 to-white border border-pulse-100 hover:shadow-elegant transition-all duration-300 opacity-0 fade-in-element">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-pulse-600">Reflect — Understand yourself</h3>
            <p className="text-gray-700 text-sm sm:text-base mb-4">
              Capture voice, text, and short reflections. See emotional patterns and growth over time.
            </p>
            <p className="text-sm text-gray-600 italic">
              (Powered by the ETI.AI™ reflective system)
            </p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-accent-50 to-white border border-accent-100 hover:shadow-elegant transition-all duration-300 opacity-0 fade-in-element">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-accent-600">Preserve — Private and tamper-evident</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              Store everything in a secure offline capsule and encrypted vault. Only you decide who can access your memories.
            </p>
          </div>
          
          <div className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-pulse-50 to-white border border-pulse-100 hover:shadow-elegant transition-all duration-300 opacity-0 fade-in-element">
            <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 sm:mb-4 text-pulse-600">Pass on — Verifiable continuity</h3>
            <p className="text-gray-700 text-sm sm:text-base">
              When you choose, trusted family can access an inheritable digital identity that preserves voice, stories and preferences with clear provenance.
            </p>
          </div>
        </div>
        
        <div className="text-center">
          <button className="px-8 py-4 bg-pulse-600 hover:bg-pulse-700 text-white rounded-lg font-semibold transition-colors">
            Explore features
          </button>
        </div>
      </div>
    </section>
  );
};

export default Features;
