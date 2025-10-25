
import React, { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface TestimonialProps {
  content: string;
  author: string;
  role: string;
  gradient: string;
}

const testimonials: TestimonialProps[] = [{
  content: "I want to hear Grandma read my name in her voice. — Import a voice clip, pin it to a family memory album.",
  author: "Grandchild Journey",
  role: "Family Memory Preservation",
  gradient: "from-brand-secondary via-brand-secondary/90 to-brand-secondary/80"
}, {
  content: "I need to capture why I made a decision. — Quick 'why' capture ties rationale to a project snapshot.",
  author: "Founder Journey",
  role: "Professional Decision Documentation",
  gradient: "from-brand-primary/90 via-brand-secondary to-brand-secondary/90"
}, {
  content: "I need context before session — With client consent, review emotion trends and flagged memories.",
  author: "Therapist Journey",
  role: "Consent-Based Care Support",
  gradient: "from-brand-secondary/80 via-brand-primary/30 to-brand-secondary"
}];

const TestimonialCard = ({
  content,
  author,
  role,
  gradient,
  isActive
}: TestimonialProps & { isActive: boolean }) => {
  return (
    <div 
      className={`bg-gradient-to-br ${gradient} rounded-2xl p-8 h-full flex flex-col justify-between text-white relative overflow-hidden transition-all duration-700 shadow-lg hover:shadow-2xl ${
        isActive ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
    >
      {/* Decorative overlay pattern */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-primary/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-brand-tertiary/20 rounded-full blur-2xl"></div>
      </div>

      {/* Quote icon with animation */}
      <div className="absolute top-6 right-6 opacity-20">
        <Quote className={`w-16 h-16 transition-transform duration-700 ${isActive ? 'rotate-0 scale-100' : 'rotate-45 scale-0'}`} />
      </div>
      
      <div className="relative z-10">
        <p className="text-xl mb-8 font-medium leading-relaxed pr-20">{`"${content}"`}</p>
        <div className={`transition-all duration-500 ${isActive ? 'translate-y-0 opacity-100' : 'translate-y-4 opacity-0'}`} style={{ transitionDelay: '0.2s' }}>
          <h4 className="font-semibold text-xl">{author}</h4>
          <p className="text-white/80">{role}</p>
        </div>
      </div>
    </div>
  );
};

const Testimonials = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  // Auto-cycle testimonials
  useEffect(() => {
    if (!isAutoPlay) return;

    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [isAutoPlay]);

  const goToNext = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev + 1) % testimonials.length);
  };

  const goToPrev = () => {
    setIsAutoPlay(false);
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const goToSlide = (index: number) => {
    setIsAutoPlay(false);
    setActiveIndex(index);
  };

  return (
    <section className="py-12 sm:py-20 bg-gradient-to-b from-white to-brand-tertiary/10 relative" id="testimonials" ref={sectionRef}>
      <div className="section-container">
        <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20">
            <span className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-brand-primary text-white text-sm font-bold mr-2">04</span>
            <span className="text-brand-secondary font-medium">Testimonials</span>
          </div>
        </div>
        
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-12 text-left opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
          Real User Journeys
        </h2>
        
        {/* Carousel Container */}
        <div className="relative">
          {/* Desktop: Grid View */}
          <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl rounded-2xl"
              >
                <TestimonialCard 
                  {...testimonial} 
                  isActive={true}
                />
              </div>
            ))}
          </div>

          {/* Mobile: Carousel View */}
          <div className="md:hidden relative h-[400px]">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className={`absolute inset-0 transition-all duration-700 ${
                  index === activeIndex ? 'z-10' : 'z-0 pointer-events-none'
                }`}
              >
                <TestimonialCard 
                  {...testimonial} 
                  isActive={index === activeIndex}
                />
              </div>
            ))}

            {/* Navigation Arrows */}
            <button
              onClick={goToPrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-6 h-6 text-brand-secondary" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white/90 hover:bg-white shadow-lg flex items-center justify-center transition-all duration-300 hover:scale-110"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-6 h-6 text-brand-secondary" />
            </button>

            {/* Dots Indicator */}
            <div className="absolute -bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
              {testimonials.map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === activeIndex 
                      ? 'bg-brand-primary w-8' 
                      : 'bg-brand-tertiary hover:bg-brand-primary/50'
                  }`}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Auto-play indicator */}
        <div className="mt-12 text-center md:hidden">
          <button
            onClick={() => setIsAutoPlay(!isAutoPlay)}
            className="text-sm text-gray-600 hover:text-brand-primary transition-colors"
          >
            {isAutoPlay ? '⏸ Pause auto-play' : '▶ Resume auto-play'}
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
