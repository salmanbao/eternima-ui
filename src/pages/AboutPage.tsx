import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_ABOUT_PAGE, ENABLE_FX_GRID, ENABLE_FX_PARTICLES } from "@/lib/featureFlags";
import { Heart, Shield, Users, Target } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Dignity First",
      description: "We believe every life story deserves to be preserved with dignity, truth, and compassion."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy by Design",
      description: "Your data is yours. We build systems where you maintain complete control and ownership."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered AI",
      description: "Technology should serve humanity, not replace it. Our AI amplifies human memory, not artificial content."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Long-Term Thinking",
      description: "We're building for generations, not quarters. Sustainability and continuity guide every decision."
    }
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
      !(ENABLE_ANIME_GLOBAL && ENABLE_ANIME_ABOUT_PAGE)
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
        ".about-hero-particles"
      );
      heroContainers.forEach((container) => {
        const particleCount = 40;
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

      // Stagger in value cards
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".value-card",
          {
            y: [30, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 700,
          },
          stagger(150)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".value-card",
          translateY: [30, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 700,
          delay: stagger(150),
        });
      }

      // Fade in mission content
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".mission-content",
          {
            y: [20, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 600,
          },
          stagger(100)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".mission-content",
          translateY: [20, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 600,
          delay: stagger(100),
        });
      }

      // Animate story paragraphs
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".story-paragraph",
          {
            y: [20, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 600,
          },
          stagger(80)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".story-paragraph",
          translateY: [20, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 600,
          delay: stagger(80),
        });
      }
    })();

    // Add hover tilt effect to value cards
    const valueCards = Array.from(
      document.querySelectorAll<HTMLElement>(".value-card")
    );
    const onMove = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / rect.width;
      const dy = (e.clientY - cy) / rect.height;
      const rotX = dy * -5;
      const rotY = dx * 5;
      el.style.transform = `perspective(1000px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(10px)`;
    };
    const onLeave = (e: MouseEvent) => {
      const el = e.currentTarget as HTMLElement;
      el.style.transform =
        "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0)";
    };
    valueCards.forEach((el) => {
      el.addEventListener("mousemove", onMove as any);
      el.addEventListener("mouseleave", onLeave as any);
    });

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      valueCards.forEach((el) => {
        el.removeEventListener("mousemove", onMove as any);
        el.removeEventListener("mouseleave", onLeave as any);
      });
      animeRef = null;
    };
  }, []);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_ABOUT_PAGE ? (
          <PageFX showGrid={ENABLE_FX_GRID} showHex={false} showParticles={ENABLE_FX_PARTICLES} intensity="low" showStreams={false} showScanline={false} showCursorTrail={false}>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80 relative overflow-hidden about-hero-particles">
          <div className="section-container text-center relative z-10">
            <h1 className="section-title text-white mb-6">
              Preserve Truth with Dignity
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're building a future where your life's story, voice, and wisdom live on—
              not as content for platforms, but as verifiable, private legacy for the people you love.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="section-container max-w-4xl">
            <div className="text-center mb-16 mission-content">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eternima exists to help people capture, understand, and preserve their life experiences 
                in a way that's <strong>private, verifiable, and truly their own</strong>. We believe the 
                most important stories in life shouldn't be lost to time, platforms, or corporate control.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6 mission-content">
                In an age where our digital lives are scattered across platforms we don't control, 
                and where AI can fabricate voices and memories, we're creating something different: 
                a <strong>truthful, private reflection system</strong> that helps you understand yourself 
                better today and preserve what matters for tomorrow.
              </p>

              <p className="text-muted-foreground mission-content">
                Whether you're capturing daily thoughts for self-reflection, preserving family stories 
                for future generations, or creating a verifiable archive for legal or therapeutic purposes—
                Eternima puts you in control.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                What Guides Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four principles shape every decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="value-card group bg-white rounded-2xl border-2 border-brand-tertiary/40 p-8 hover:border-brand-primary/60 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 will-change-transform relative overflow-hidden"
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Icon container with animation */}
                  <div className="relative w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg group-hover:shadow-brand-primary/30">
                    <div className="relative z-10">
                      {value.icon}
                    </div>
                    {/* Pulsing glow */}
                    <div className="absolute inset-0 rounded-2xl bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  
                  <h3 className="relative text-xl font-display font-bold mb-3 group-hover:text-brand-primary transition-colors duration-300">
                    {value.title}
                  </h3>
                  <p className="relative text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                    {value.description}
                  </p>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="section-container max-w-4xl">
            <h2 className="text-3xl font-display font-bold mb-8 text-center story-paragraph">
              Why We Started
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p className="story-paragraph">
                Eternima was born from a simple realization: <strong>most of us will be forgotten</strong>, 
                not because our lives weren't meaningful, but because our stories, voices, and wisdom 
                get lost in the noise of digital platforms or buried in devices no one can access.
              </p>

              <p className="story-paragraph">
                We watched loved ones pass away, leaving behind fragmented digital traces—photos on old phones, 
                voice messages that disappeared with expired accounts, memories scattered across platforms that 
                no longer exist or had changed their terms of service.
              </p>

              <p className="story-paragraph">
                At the same time, we saw the rise of powerful AI that could clone voices and generate text 
                so realistic it became hard to tell what was real and what was synthetic. This created a paradox: 
                technology that could preserve memory was the same technology that could fabricate it.
              </p>

              <p className="story-paragraph">
                <strong>We decided to build something different.</strong> A system where:
              </p>

              <ul className="space-y-2 story-paragraph">
                <li>Your data stays private and under your control</li>
                <li>Everything is verifiable and tamper-evident</li>
                <li>AI serves memory, not invention</li>
                <li>You decide who gets access, when, and how</li>
              </ul>

              <p className="story-paragraph">
                Eternima isn't about creating synthetic versions of ourselves for platforms to monetize. 
                It's about <strong>preserving truth</strong>—the messy, human, authentic truth of who we are.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section (Optional - can be removed or kept minimal) */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container max-w-4xl text-center">
            <h2 className="text-3xl font-display font-bold mb-6 story-paragraph">
              Building for Humanity
            </h2>
            <p className="text-lg text-muted-foreground mb-8 story-paragraph">
              We're a small team of engineers, psychologists, and privacy advocates 
              building technology that respects human dignity. We're hiring mission-driven 
              people who believe memory and legacy shouldn't be controlled by platforms.
            </p>
            <a 
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-primary/30 relative overflow-hidden group story-paragraph"
            >
              <span className="relative z-10">Join Our Mission</span>
              <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6 story-paragraph">
              Start Preserving Your Story
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto story-paragraph">
              Join thousands of families, creators, and organizations preserving what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center story-paragraph">
              <a 
                href="/pricing"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-primary/30 relative overflow-hidden group"
              >
                <span className="relative z-10">Get Started Free</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-brand-primary/20 relative overflow-hidden group"
              >
                <span className="relative z-10">Talk to Our Team</span>
                <span className="absolute inset-0 bg-gradient-to-r from-transparent via-brand-primary/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
              </a>
            </div>
          </div>
        </section>
          </PageFX>
        ) : (
          <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
            <div className="section-container text-center">
              <h1 className="section-title text-white mb-6">Preserve Truth with Dignity</h1>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
