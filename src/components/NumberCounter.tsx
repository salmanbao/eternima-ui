import React, { useEffect, useRef, useState } from "react";

interface NumberCounterProps {
  end: number;
  start?: number;
  duration?: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  separator?: string;
  className?: string;
  triggerOnce?: boolean;
}

const NumberCounter: React.FC<NumberCounterProps> = ({
  end,
  start = 0,
  duration = 2000,
  suffix = "",
  prefix = "",
  decimals = 0,
  separator = ",",
  className = "",
  triggerOnce = true,
}) => {
  const [count, setCount] = useState(start);
  const [hasAnimated, setHasAnimated] = useState(false);
  const countRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!countRef.current || (triggerOnce && hasAnimated)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && (!triggerOnce || !hasAnimated)) {
            animateCount();
            if (triggerOnce) {
              setHasAnimated(true);
              observer.disconnect();
            }
          }
        });
      },
      { threshold: 0.5 }
    );

    observer.observe(countRef.current);

    return () => {
      observer.disconnect();
    };
  }, [hasAnimated, triggerOnce]);

  const animateCount = () => {
    const startTime = Date.now();
    const startValue = start;
    const endValue = end;
    const range = endValue - startValue;

    const animate = () => {
      const now = Date.now();
      const progress = Math.min((now - startTime) / duration, 1);
      
      // Easing function (ease-out cubic)
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      
      const currentValue = startValue + range * easedProgress;
      setCount(currentValue);

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setCount(endValue);
      }
    };

    requestAnimationFrame(animate);
  };

  const formatNumber = (num: number): string => {
    const fixed = num.toFixed(decimals);
    const parts = fixed.split(".");
    
    // Add thousand separators
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);
    
    return parts.join(".");
  };

  return (
    <span ref={countRef} className={className}>
      {prefix}
      {formatNumber(count)}
      {suffix}
    </span>
  );
};

export default NumberCounter;
