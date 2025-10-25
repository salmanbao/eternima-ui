import React, { useState, useEffect } from "react";
import { ArrowUp } from "lucide-react";

const BackToTop = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Show button when page is scrolled more than 300px
      if (window.pageYOffset > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }

      // Calculate scroll progress
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (window.pageYOffset / windowHeight) * 100;
      setScrollProgress(scrolled);
    };

    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <>
      {isVisible && (
        <button
          onClick={scrollToTop}
          className="fixed bottom-8 right-8 z-50 group"
          aria-label="Back to top"
        >
          {/* Progress Ring */}
          <svg
            className="absolute inset-0 -rotate-90 w-14 h-14"
            viewBox="0 0 56 56"
          >
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#d1c8a9"
              strokeWidth="2"
            />
            <circle
              cx="28"
              cy="28"
              r="26"
              fill="none"
              stroke="#cb9b32"
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 26}`}
              strokeDashoffset={`${2 * Math.PI * 26 * (1 - scrollProgress / 100)}`}
              className="transition-all duration-150"
            />
          </svg>

          {/* Button */}
          <div className="relative w-14 h-14 bg-white hover:bg-brand-primary text-brand-primary hover:text-white rounded-full shadow-lg hover:shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group-hover:-translate-y-1">
            <ArrowUp className="w-6 h-6" />
          </div>

          {/* Glow effect */}
          <div className="absolute inset-0 rounded-full bg-brand-primary opacity-0 group-hover:opacity-20 blur-xl transition-opacity duration-300 -z-10"></div>
        </button>
      )}
    </>
  );
};

export default BackToTop;
