import React, { useEffect, useRef } from "react";

type Intensity = "low" | "med" | "high";

interface PageFXProps {
  children: React.ReactNode;
  showGrid?: boolean;
  showHex?: boolean;
  showParticles?: boolean;
  particleCount?: number;
  showStreams?: boolean;
  showScanline?: boolean;
  showCursorTrail?: boolean;
  intensity?: Intensity;
}

// Shared page-level futuristic effects wrapper.
// Uses CSS helpers from index.css and dynamic Anime.js for subtle motion.
const PageFX: React.FC<PageFXProps> = ({
  children,
  showGrid = true,
  showHex = false,
  showParticles = true,
  particleCount,
  showStreams = false,
  showScanline = false,
  showCursorTrail = false,
  intensity = "med",
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const particleRef = useRef<HTMLDivElement>(null);
  const scanRef = useRef<HTMLDivElement>(null);
  const streamLeftRef = useRef<HTMLDivElement>(null);
  const streamRightRef = useRef<HTMLDivElement>(null);
  const cursorTrailRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;
    if (prefersReduced || isMobile) return;

    const cleanupFns: Array<() => void> = [];

    (async () => {
      // Support Anime.js v4 (named exports) and v3 (default function)
      const mod: any = await import('animejs');
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4 ? (mod.animate || mod?.default?.animate) : (
        (typeof mod === 'function' && mod) ||
        (typeof mod?.default === 'function' && mod.default) ||
        (typeof mod?.anime === 'function' && mod.anime) ||
        (typeof mod?.default?.anime === 'function' && mod.default.anime)
      );
      const createTimeline: any = isV4 ? (mod.createTimeline || mod?.default?.createTimeline) : (animateFn && animateFn.timeline);
      const stagger: any = isV4 ? (mod.stagger || mod?.default?.stagger) : (animateFn && animateFn.stagger);
      if (!animateFn) return;

      // Particles
      if (showParticles && particleRef.current) {
        const count = particleCount ?? (intensity === 'low' ? 12 : intensity === 'high' ? 36 : 24);
        const container = particleRef.current;
        const nodes: HTMLDivElement[] = [];
        for (let i = 0; i < count; i++) {
          const p = document.createElement('div');
          p.className = 'particle-dot';
          p.style.left = `${Math.random() * 100}%`;
          p.style.top = `${Math.random() * 100}%`;
          container.appendChild(p);
          nodes.push(p);
        }
        nodes.forEach((p, i) => {
          if (isV4) {
            animateFn(p, {
              y: [
                { to: -15 + Math.random() * 30, duration: 2000 + Math.random() * 2000 },
                { to: 0, duration: 2000 + Math.random() * 2000 }
              ],
              x: [
                { to: -12 + Math.random() * 24, duration: 2500 + Math.random() * 2000 },
                { to: 0, duration: 2500 + Math.random() * 2000 }
              ],
              opacity: [
                { to: 0.2 + Math.random() * 0.5, duration: 1500 + Math.random() * 1000 },
                { to: 0.1 + Math.random() * 0.3, duration: 1500 + Math.random() * 1000 }
              ],
              ease: 'inOutSine',
              loop: true,
              delay: i * 80,
            });
          } else {
            animateFn({
              targets: p,
              translateY: [
                { value: -15 + Math.random() * 30, duration: 2000 + Math.random() * 2000 },
                { value: 0, duration: 2000 + Math.random() * 2000 }
              ],
              translateX: [
                { value: -12 + Math.random() * 24, duration: 2500 + Math.random() * 2000 },
                { value: 0, duration: 2500 + Math.random() * 2000 }
              ],
              opacity: [
                { value: 0.2 + Math.random() * 0.5, duration: 1500 + Math.random() * 1000 },
                { value: 0.1 + Math.random() * 0.3, duration: 1500 + Math.random() * 1000 }
              ],
              loop: true,
              easing: 'easeInOutSine',
              delay: i * 80,
            });
          }
        });
        cleanupFns.push(() => {
          nodes.forEach(n => n.remove());
        });
      }

      // Scanline
      if (showScanline && scanRef.current) {
        const node = scanRef.current;
        let stop: any;
        if (isV4) {
          stop = animateFn(node!, {
            top: [{ to: '100%', duration: 4500 }],
            ease: 'linear',
            loop: true,
            delay: 800,
          });
        } else {
          const anim = animateFn({
            targets: node,
            top: ['0%', '100%'],
            duration: 4500,
            easing: 'linear',
            loop: true,
            delay: 800,
          });
          stop = () => anim.pause();
        }
        cleanupFns.push(() => { if (typeof stop === 'function') stop(); });
      }

      // Data streams
      const fillStream = (el: HTMLDivElement | null) => {
        if (!el) return;
        const chars = '01アイウエオカキクケコ><[]{}';
        let content = '';
        for (let i = 0; i < 220; i++) {
          content += chars[Math.floor(Math.random() * chars.length)];
          if (i % 22 === 21) content += '\n';
        }
        el.textContent = content;
        let cancel: any;
        if (isV4) {
          cancel = animateFn(el, {
            y: [{ to: '-80%', duration: 16000 }],
            ease: 'linear',
            loop: true,
          });
        } else {
          const anim = animateFn({
            targets: el,
            translateY: ['-20%', '-80%'],
            duration: 16000,
            easing: 'linear',
            loop: true,
          });
          cancel = () => anim.pause();
        }
        cleanupFns.push(() => { if (typeof cancel === 'function') cancel(); });
      };
      if (showStreams) {
        fillStream(streamLeftRef.current);
        fillStream(streamRightRef.current);
      }

      // Cursor trail
      if (showCursorTrail && rootRef.current) {
        const root = rootRef.current;
        const trail = cursorTrailRef.current;
        let raf = 0;
        const onMove = (e: MouseEvent) => {
          const rect = root.getBoundingClientRect();
          const x = e.clientX - rect.left;
          const y = e.clientY - rect.top;
          if (!trail) return;
          cancelAnimationFrame(raf);
          raf = requestAnimationFrame(() => {
            trail.style.left = `${x}px`;
            trail.style.top = `${y}px`;
            trail.style.opacity = '1';
          });
        };
        const onLeave = () => {
          if (trail) trail.style.opacity = '0';
        };
        root.addEventListener('mousemove', onMove);
        root.addEventListener('mouseleave', onLeave);
        cleanupFns.push(() => {
          root.removeEventListener('mousemove', onMove);
          root.removeEventListener('mouseleave', onLeave);
          cancelAnimationFrame(raf);
        });
      }
    })();

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, [showParticles, showScanline, showStreams, showCursorTrail, intensity, particleCount]);

  return (
    <div ref={rootRef} className="relative overflow-hidden">
      {showGrid && <div className="cyber-grid absolute inset-0" aria-hidden="true"></div>}
      {showHex && <div className="hex-pattern absolute inset-0" aria-hidden="true"></div>}
      {showCursorTrail && <div ref={cursorTrailRef} className="cursor-trail" aria-hidden="true"></div>}
      {showParticles && <div ref={particleRef} className="absolute inset-0 pointer-events-none" aria-hidden="true"></div>}
      {showScanline && <div ref={scanRef} className="scan-line absolute top-0 opacity-50" aria-hidden="true"></div>}
      {showStreams && (
        <>
          <div className="absolute left-0 top-0 bottom-0 w-12 opacity-20 pointer-events-none" aria-hidden="true">
            <div ref={streamLeftRef} className="data-stream"></div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 w-12 opacity-20 pointer-events-none rotate-180" aria-hidden="true">
            <div ref={streamRightRef} className="data-stream"></div>
          </div>
        </>
      )}
      <div className="relative z-10">
        {children}
      </div>
    </div>
  );
};

export default PageFX;
