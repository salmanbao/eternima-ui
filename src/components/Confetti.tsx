import React, { useEffect, useState } from "react";

interface ConfettiProps {
  active: boolean;
  duration?: number;
  particleCount?: number;
  colors?: string[];
}

const Confetti: React.FC<ConfettiProps> = ({
  active,
  duration = 3000,
  particleCount = 50,
  colors = ["#cb9b32", "#6b5420", "#d1c8a9", "#ffffff", "#fbbf24", "#f59e0b"],
}) => {
  const [particles, setParticles] = useState<Array<{
    id: number;
    left: number;
    animationDelay: number;
    backgroundColor: string;
    rotation: number;
  }>>([]);

  useEffect(() => {
    if (active) {
      // Generate confetti particles
      const newParticles = Array.from({ length: particleCount }, (_, i) => ({
        id: i,
        left: Math.random() * 100,
        animationDelay: Math.random() * 0.5,
        backgroundColor: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
      }));
      
      setParticles(newParticles);

      // Clear after duration
      const timer = setTimeout(() => {
        setParticles([]);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [active, duration, particleCount]);

  if (!active || particles.length === 0) return null;

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 opacity-80"
          style={{
            left: `${particle.left}%`,
            top: "-10px",
            backgroundColor: particle.backgroundColor,
            animation: `confetti-fall ${duration / 1000}s linear forwards`,
            animationDelay: `${particle.animationDelay}s`,
            transform: `rotate(${particle.rotation}deg)`,
          }}
        />
      ))}
      <style>{`
        @keyframes confetti-fall {
          0% {
            transform: translateY(0) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};

export default Confetti;
