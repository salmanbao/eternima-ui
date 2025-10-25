import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import {
  ENABLE_ANIME_GLOBAL,
  ENABLE_ANIME_FEATURES_PAGE,
  ENABLE_FX_GRID,
  ENABLE_FX_HEX,
  ENABLE_FX_PARTICLES,
  ENABLE_FX_STREAMS,
  ENABLE_FX_SCANLINE,
  ENABLE_FX_CURSORTRAIL,
} from "@/lib/featureFlags";
import { Sparkles, Shield, Cloud, Users } from "lucide-react";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "ETI.AI™ — Reflective Intelligence",
      tagline: "Your private personal AI mirror",
      description:
        "A private personal AI that learns from your voice, text, and behavior to create a personal mirror for self-awareness, memory recall, and compassionate conversations.",
      features: [
        "Personalized reflections and timelines",
        "Emotion-aware highlights and trend reports",
        "Time-sliced cognitive profiles showing how you change",
        "Local-first: data stays on your device",
        "Pattern recognition in tone, language, and behavior",
        "Private memory recall and search",
      ],
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "LuxVault Capsule™ — Offline Data Vault",
      tagline: "Tamper-proof legacy storage",
      description:
        "A biometric, air-gapped storage capsule for your complete life archive. Ideal for families who want a tamper-proof legacy store.",
      features: [
        "Biometric access (VaultKey option)",
        "Tamper-evident, offline-first storage",
        "Complete air-gap security",
        "Secure export options for legal inheritance",
        "Physical custody of your digital life",
        "No cloud dependencies",
      ],
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Lumirec™ — Wearable Voice Recorder",
      tagline: "Capture life as it happens",
      description:
        "Lightweight wearable designed to capture high-fidelity voice and emotional cues on the move. Syncs securely with the app and LuxVault.",
      features: [
        "High-fidelity voice capture",
        "Emotional cue detection",
        "Secure sync with app and vault",
        "All-day battery life",
        "Discreet wearable design",
        "Encrypted on-device storage",
      ],
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "SoulNFT™ — Verifiable Digital Identity",
      tagline: "Your inheritable continuity",
      description:
        "A living, inheritable digital identity that links your AI twin, biometric keys, and secure vault access — designed for long-term continuity (user-controlled).",
      features: [
        "Inheritable digital identity",
        "Links AI twin and biometric keys",
        "User-controlled access and permissions",
        "Verifiable provenance and integrity",
        "Executor designation system",
        "Legal continuity framework",
      ],
    },
  ];

  useEffect(() => {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const prefersReduced =
      typeof window !== "undefined" &&
      window.matchMedia &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (
      prefersReduced ||
      isMobile ||
      !(ENABLE_ANIME_GLOBAL && ENABLE_ANIME_FEATURES_PAGE)
    )
      return;

    let cancelled = false;
    let animeRef: any;
    let cleanupFns: Array<() => void> = [];

    (async () => {
      const mod: any = await import("animejs");
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4
        ? mod.animate || mod?.default?.animate
        : (typeof mod === "function" && mod) ||
          (typeof mod?.default === "function" && mod.default) ||
          (typeof mod?.anime === "function" && mod.anime) ||
          (typeof mod?.default?.anime === "function" && mod.default.anime);
      const createTimeline: any = isV4
        ? mod.createTimeline || mod?.default?.createTimeline
        : animateFn && animateFn.timeline;
      const stagger: any = isV4
        ? mod.stagger || mod?.default?.stagger
        : animateFn && animateFn.stagger;
      if (!animateFn) return;
      if (cancelled) return;
      animeRef = animateFn;

      // Create floating particles for hero section
      const heroContainers = document.querySelectorAll(
        ".floating-particles-container"
      );
      heroContainers.forEach((container) => {
        const particleCount = 50;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "floating-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${3 + Math.random() * 3}px;
            height: ${3 + Math.random() * 3}px;
            background: rgba(255, 255, 255, ${0.4 + Math.random() * 0.5});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 8px rgba(255, 255, 255, 0.6);
          `;
          container.appendChild(particle);
          particles.push(particle);

          // Animate each particle with rising motion
          if (isV4) {
            animateFn(particle, {
              y: [{ to: -100, duration: 8000 + Math.random() * 4000 }],
              x: [
                {
                  to: -30 + Math.random() * 60,
                  duration: 4000 + Math.random() * 3000,
                },
                { to: 0, duration: 4000 + Math.random() * 3000 },
              ],
              opacity: [
                { to: 0, duration: 1000 },
                { to: 0.4 + Math.random() * 0.5, duration: 2000 },
                { to: 0, duration: 1000 },
              ],
              ease: "linear",
              loop: true,
              delay: i * 300,
            });
          } else {
            animateFn({
              targets: particle,
              translateY: [
                { value: -100, duration: 8000 + Math.random() * 4000 },
              ],
              translateX: [
                {
                  value: -30 + Math.random() * 60,
                  duration: 4000 + Math.random() * 3000,
                },
                { value: 0, duration: 4000 + Math.random() * 3000 },
              ],
              opacity: [
                { value: 0, duration: 1000 },
                { value: 0.4 + Math.random() * 0.5, duration: 2000 },
                { value: 0, duration: 1000 },
              ],
              easing: "linear",
              loop: true,
              delay: i * 300,
            });
          }
        }

        cleanupFns.push(() => {
          particles.forEach((p) => p.remove());
        });
      });

      // Create floating particles for each feature visual
      const featureContainers = document.querySelectorAll(
        ".feature-particles-container"
      );
      featureContainers.forEach((container) => {
        const particleCount = 20;
        const particles: HTMLDivElement[] = [];

        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement("div");
          particle.className = "feature-particle";
          particle.style.cssText = `
            position: absolute;
            width: ${2 + Math.random() * 3}px;
            height: ${2 + Math.random() * 3}px;
            background: rgba(203, 155, 50, ${0.3 + Math.random() * 0.4});
            border-radius: 50%;
            pointer-events: none;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            box-shadow: 0 0 6px rgba(203, 155, 50, 0.5);
          `;
          container.appendChild(particle);
          particles.push(particle);

          // Animate each particle with floating motion
          if (isV4) {
            animateFn(particle, {
              y: [
                {
                  to: -50 + Math.random() * 100,
                  duration: 6000 + Math.random() * 4000,
                },
              ],
              x: [
                {
                  to: -40 + Math.random() * 80,
                  duration: 5000 + Math.random() * 3000,
                },
              ],
              opacity: [
                { to: 0, duration: 1000 },
                { to: 0.3 + Math.random() * 0.4, duration: 2000 },
                { to: 0, duration: 1000 },
              ],
              ease: "linear",
              loop: true,
              delay: i * 400,
            });
          } else {
            animateFn({
              targets: particle,
              translateY: [
                {
                  value: -50 + Math.random() * 100,
                  duration: 6000 + Math.random() * 4000,
                },
              ],
              translateX: [
                {
                  value: -40 + Math.random() * 80,
                  duration: 5000 + Math.random() * 3000,
                },
              ],
              opacity: [
                { value: 0, duration: 1000 },
                { value: 0.3 + Math.random() * 0.4, duration: 2000 },
                { value: 0, duration: 1000 },
              ],
              easing: "linear",
              loop: true,
              delay: i * 400,
            });
          }
        }

        cleanupFns.push(() => {
          particles.forEach((p) => p.remove());
        });
      });

      // Stagger in each features row
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".features-row",
          {
            y: [24, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 600,
          },
          stagger(120)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".features-row",
          translateY: [24, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 600,
          delay: stagger(120),
        });
      }

      // Orbiters around visuals
      if (isV4) {
        animateFn(".orb-ring", {
          rotate: [{ to: 360, duration: 6000 }],
          ease: "linear",
          loop: true,
        });
      } else {
        animateFn({
          targets: ".orb-ring",
          rotate: 360,
          easing: "linear",
          duration: 6000,
          loop: true,
        });
      }

      // Sweep sheen bars visibly across
      if (isV4) {
        animateFn(".sheen-bar", {
          x: [{ to: "150%", duration: 1400 }],
          ease: "inOutQuad",
          loop: true,
          delay: 300,
        });
      } else {
        animateFn({
          targets: ".sheen-bar",
          translateX: ["-150%", "150%"],
          duration: 1400,
          easing: "easeInOutQuad",
          loop: true,
          delay: 300,
        });
      }
    })();

    // 3D tilt on visuals
    const visuals = Array.from(
      document.querySelectorAll<HTMLElement>(".feature-visual")
    );
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rotX = dy * -10; // tilt up/down
      const rotY = dx * 10; // tilt left/right
      el.style.transform = `perspective(800px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(0)`;
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform =
        "perspective(800px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };
    visuals.forEach((el) => {
      el.addEventListener("mousemove", onMove as any);
      el.addEventListener("mouseleave", onLeave as any);
    });

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      visuals.forEach((el) => {
        el.removeEventListener("mousemove", onMove as any);
        el.removeEventListener("mouseleave", onLeave as any);
      });
      // animejs animations will auto GC when DOM nodes removed; no explicit destroy API
      animeRef = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main>
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_FEATURES_PAGE ? (
          <PageFX
            showGrid={ENABLE_FX_GRID}
            showHex={ENABLE_FX_HEX}
            showParticles={ENABLE_FX_PARTICLES}
            intensity="med"
            showStreams={ENABLE_FX_STREAMS}
            showScanline={ENABLE_FX_SCANLINE}
            showCursorTrail={ENABLE_FX_CURSORTRAIL}
          >
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80 relative overflow-hidden floating-particles-container">
              <div className="section-container text-center relative z-10">
                <h1 className="section-title text-white mb-6">
                  <span className="relative inline-block">
                    Complete Features Overview
                    <span
                      aria-hidden
                      className="sheen-bar absolute inset-y-0 left-0 w-[40%] -translate-x-[120%]"
                    ></span>
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Eternima combines cutting-edge AI, secure hardware, and
                  user-controlled identity to create the most comprehensive
                  digital legacy and reflection platform.
                </p>
              </div>
            </section>

            {/* Features Grid */}
            <section className="relative py-20 bg-gradient-to-b from-gray-50 to-white">
              {/* In-section grid overlay so it sits above the white background */}
              <div
                aria-hidden
                className="absolute inset-0 cyber-grid opacity-40 pointer-events-none"
              ></div>
              <div className="section-container relative z-10">
                <div className="relative">
                  <span
                    aria-hidden
                    className="sheen-bar absolute inset-y-0 left-0 w-[30%] -translate-x-[150%] z-[1]"
                  ></span>
                </div>
                <div className="space-y-16">
                  {mainFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`features-row flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-12 items-center`}
                    >
                      <div className="flex-1">
                        <div className="flex items-center gap-4 mb-4">
                          <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary">
                            {feature.icon}
                          </div>
                          <div>
                            <h2 className="text-3xl font-display font-bold text-foreground">
                              {feature.title}
                            </h2>
                            <p className="text-brand-primary font-medium">
                              {feature.tagline}
                            </p>
                          </div>
                        </div>

                        <p className="text-lg text-muted-foreground mb-6">
                          {feature.description}
                        </p>

                        <ul className="space-y-3">
                          {feature.features.map((item, idx) => (
                            <li key={idx} className="flex items-start gap-3">
                              <div className="w-6 h-6 rounded-full bg-brand-primary/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                                <div className="w-2 h-2 rounded-full bg-brand-primary"></div>
                              </div>
                              <span className="text-foreground">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex-1">
                        <div className="feature-visual relative group bg-gradient-to-br from-gray-100 via-brand-tertiary/40 to-gray-50 rounded-3xl holo-border transition-all duration-500 will-change-transform hover:shadow-2xl hover:shadow-brand-primary/30 min-h-[400px] lg:min-h-[500px] border-2 border-brand-tertiary/60 shadow-lg">
                          {/* Animated background gradient */}
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-br from-brand-primary/15 via-transparent to-brand-primary/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
                          ></div>

                          {/* Energy ring */}
                          <div
                            aria-hidden
                            className="energy-ring absolute inset-6 rounded-[2rem] pointer-events-none opacity-50 group-hover:opacity-100 transition-opacity duration-500 z-[1]"
                          ></div>

                          {/* Floating particles container */}
                          <div
                            aria-hidden
                            className="feature-particles-container absolute inset-0 pointer-events-none overflow-hidden rounded-3xl z-[2]"
                          >
                            {/* Particles will be added via JS */}
                          </div>

                          {/* Main image container */}
                          <div className="relative w-full h-full p-8 lg:p-12 flex items-center justify-center z-[3]">
                            {/* Pulsing glow effect */}
                            <div
                              aria-hidden
                              className="absolute inset-0 flex items-center justify-center z-[1]"
                            >
                              <div className="w-48 h-48 lg:w-64 lg:h-64 rounded-full bg-brand-primary/20 blur-3xl animate-pulse"></div>
                            </div>

                            {/* Feature image mockup */}
                            <div className="relative z-10 w-full h-full flex flex-col items-center justify-center py-8">
                              {/* Large icon with animation */}
                              <div className="relative w-32 h-32 lg:w-40 lg:h-40 mx-auto mb-6 rounded-2xl bg-white border-2 border-brand-primary/60 flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-2xl shadow-brand-primary/30">
                                {/* Orbit ring */}
                                <div
                                  aria-hidden
                                  className="orb-ring absolute inset-0 z-[1]"
                                >
                                  <span className="feature-orb absolute left-1/2 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-brand-primary shadow-[0_0_20px_rgba(203,155,50,1)]"></span>
                                </div>

                                {/* Icon */}
                                <div className="text-brand-primary transform group-hover:rotate-12 transition-transform duration-500 z-[2] relative drop-shadow-lg">
                                  {React.cloneElement(feature.icon, {
                                    className: "w-16 h-16 lg:w-20 lg:h-20",
                                  })}
                                </div>

                                {/* Corner accents */}
                                <div
                                  aria-hidden
                                  className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]"
                                ></div>
                                <div
                                  aria-hidden
                                  className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]"
                                ></div>
                                <div
                                  aria-hidden
                                  className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]"
                                ></div>
                                <div
                                  aria-hidden
                                  className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-[3]"
                                ></div>
                              </div>

                              {/* Feature showcase elements */}
                              <div className="grid grid-cols-3 gap-3 w-full max-w-xs mb-4">
                                <div
                                  className="h-3 bg-brand-primary/60 rounded-full animate-pulse shadow-sm"
                                  style={{ animationDelay: "0ms" }}
                                ></div>
                                <div
                                  className="h-3 bg-brand-primary/60 rounded-full animate-pulse shadow-sm"
                                  style={{ animationDelay: "150ms" }}
                                ></div>
                                <div
                                  className="h-3 bg-brand-primary/60 rounded-full animate-pulse shadow-sm"
                                  style={{ animationDelay: "300ms" }}
                                ></div>
                              </div>

                              {/* Product label */}
                              <div className="px-6 py-3 bg-white border-2 border-brand-primary rounded-full shadow-xl">
                                <p className="text-sm font-bold text-brand-primary">
                                  {feature.tagline}
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Hover overlay effect */}
                          <div
                            aria-hidden
                            className="absolute inset-0 bg-gradient-to-t from-brand-primary/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* CTA Section */}
            <section className="py-20 bg-brand-tertiary/20">
              <div className="section-container text-center">
                <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                  Ready to preserve your story?
                </h2>
                <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                  Choose the plan that fits your needs and start capturing your
                  life's moments today.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a
                    href="/pricing"
                    className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">View Pricing Plans</span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      aria-hidden="true"
                    ></span>
                  </a>
                  <a
                    href="/contact"
                    className="px-8 py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-colors relative overflow-hidden group"
                  >
                    <span className="relative z-10">Contact Sales</span>
                    <span
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                      aria-hidden="true"
                    ></span>
                  </a>
                </div>
              </div>
            </section>
          </PageFX>
        ) : (
          <>
            {/* Fallback without PageFX */}
            <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
              <div className="section-container text-center">
                <h1 className="section-title text-white mb-6">
                  Complete Features Overview
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto">
                  Eternima combines cutting-edge AI, secure hardware, and
                  user-controlled identity to create the most comprehensive
                  digital legacy and reflection platform.
                </p>
              </div>
            </section>
            <section className="py-20 bg-white">
              <div className="section-container">
                <div className="space-y-16">
                  {mainFeatures.map((feature, index) => (
                    <div
                      key={index}
                      className={`flex flex-col ${
                        index % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"
                      } gap-12 items-center`}
                    >
                      {/* ...content unchanged... */}
                    </div>
                  ))}
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
