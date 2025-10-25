import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_CONTACT_PAGE, ENABLE_FX_GRID, ENABLE_FX_PARTICLES } from "@/lib/featureFlags";
import { Mail, MessageSquare, Building2, HelpCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: ""
      });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "General Inquiries",
      description: "Questions about our platform",
      contact: "team@eternima.io"
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Support",
      description: "Technical help and account issues",
      contact: "support@eternima.io"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Partnerships",
      description: "Collaborate with Eternima",
      contact: "partners@eternima.io"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Press & Media",
      description: "Media inquiries and press kit",
      contact: "press@eternima.io"
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
      !(ENABLE_ANIME_GLOBAL && ENABLE_ANIME_CONTACT_PAGE)
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
        ".contact-hero-particles"
      );
      heroContainers.forEach((container) => {
        const particleCount = 35;
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

      // Stagger in contact method cards
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".contact-method-card",
          {
            y: [30, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 700,
          },
          stagger(120)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".contact-method-card",
          translateY: [30, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 700,
          delay: stagger(120),
        });
      }

      // Animate contact form entrance
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".contact-form-container",
          {
            y: [40, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 800,
          }
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".contact-form-container",
          translateY: [40, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 800,
        });
      }

      // Stagger in additional info cards
      if (isV4 && createTimeline) {
        createTimeline().add(
          ".info-link-card",
          {
            y: [30, 0],
            opacity: [0, 1],
            ease: "outQuad",
            duration: 700,
          },
          stagger(100)
        );
      } else if (createTimeline) {
        createTimeline({ autoplay: true }).add({
          targets: ".info-link-card",
          translateY: [30, 0],
          opacity: [0, 1],
          easing: "easeOutQuad",
          duration: 700,
          delay: stagger(100),
        });
      }
    })();

    // Add hover tilt effect to contact method cards
    const methodCards = Array.from(
      document.querySelectorAll<HTMLElement>(".contact-method-card")
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
    methodCards.forEach((el) => {
      el.addEventListener("mousemove", onMove as any);
      el.addEventListener("mouseleave", onLeave as any);
    });

    // Add hover tilt to info cards
    const infoCards = Array.from(
      document.querySelectorAll<HTMLElement>(".info-link-card")
    );
    infoCards.forEach((el) => {
      el.addEventListener("mousemove", onMove as any);
      el.addEventListener("mouseleave", onLeave as any);
    });

    return () => {
      cancelled = true;
      cleanupFns.forEach((fn) => fn());
      methodCards.forEach((el) => {
        el.removeEventListener("mousemove", onMove as any);
        el.removeEventListener("mouseleave", onLeave as any);
      });
      infoCards.forEach((el) => {
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
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_CONTACT_PAGE ? (
          <PageFX showGrid={ENABLE_FX_GRID} showHex={false} showParticles={ENABLE_FX_PARTICLES} intensity="low" showStreams={false} showScanline={false} showCursorTrail={false}>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80 relative overflow-hidden contact-hero-particles">
          <div className="section-container text-center relative z-10">
            <h1 className="section-title text-white mb-6">
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're here to help. Whether you have questions about our platform, need support, 
              or want to explore partnerships—reach out.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="contact-method-card group bg-white rounded-2xl border-2 border-brand-tertiary/40 p-6 hover:border-brand-primary/60 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 will-change-transform relative overflow-hidden"
                >
                  {/* Animated background on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                  
                  {/* Icon container with animation */}
                  <div className="relative w-12 h-12 rounded-xl bg-gradient-to-br from-brand-primary/20 to-brand-primary/10 border-2 border-brand-primary/30 flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg group-hover:shadow-brand-primary/30">
                    <div className="relative z-10">
                      {method.icon}
                    </div>
                    {/* Pulsing glow */}
                    <div className="absolute inset-0 rounded-xl bg-brand-primary/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse"></div>
                  </div>
                  
                  <h3 className="relative text-lg font-display font-bold mb-2 group-hover:text-brand-primary transition-colors duration-300">
                    {method.title}
                  </h3>
                  <p className="relative text-sm text-muted-foreground mb-3 group-hover:text-foreground transition-colors duration-300">
                    {method.description}
                  </p>
                  <a 
                    href={`mailto:${method.contact}`}
                    className="relative text-brand-primary hover:text-brand-primary/80 font-medium text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all duration-300"
                  >
                    {method.contact}
                    <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                  
                  {/* Corner accents */}
                  <div className="absolute top-3 left-3 w-3 h-3 border-t-2 border-l-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-3 right-3 w-3 h-3 border-t-2 border-r-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 left-3 w-3 h-3 border-b-2 border-l-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-3 right-3 w-3 h-3 border-b-2 border-r-2 border-brand-primary/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <div className="contact-form-container bg-brand-tertiary/20 rounded-3xl border-2 border-brand-tertiary/60 p-8 sm:p-12 shadow-xl">
                <h2 className="text-3xl font-display font-bold mb-2 text-center">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out. We'll respond to your inquiry shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-brand-tertiary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 hover:border-brand-tertiary"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border-2 border-brand-tertiary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 hover:border-brand-tertiary"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-brand-tertiary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 hover:border-brand-tertiary"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnerships">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border-2 border-brand-tertiary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 hover:border-brand-tertiary"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border-2 border-brand-tertiary/60 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-brand-primary transition-all duration-300 resize-none hover:border-brand-tertiary"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-[1.02] hover:shadow-xl hover:shadow-brand-primary/30 relative overflow-hidden group"
                    >
                      <span className="relative z-10">{isSubmitting ? "Sending..." : "Send Message"}</span>
                      <span className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></span>
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container max-w-4xl text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Looking for Something Else?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a 
                href="/faq"
                className="info-link-card group bg-white rounded-2xl border-2 border-brand-tertiary/40 p-6 hover:border-brand-primary/60 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 will-change-transform relative overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <h3 className="relative text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors duration-300">Visit FAQ</h3>
                <p className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Common questions answered
                </p>
                
                {/* Arrow icon */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a 
                href="/privacy"
                className="info-link-card group bg-white rounded-2xl border-2 border-brand-tertiary/40 p-6 hover:border-brand-primary/60 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 will-change-transform relative overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <h3 className="relative text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors duration-300">Privacy & Security</h3>
                <p className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Learn how we protect your data
                </p>
                
                {/* Arrow icon */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>

              <a 
                href="/features"
                className="info-link-card group bg-white rounded-2xl border-2 border-brand-tertiary/40 p-6 hover:border-brand-primary/60 hover:shadow-2xl hover:shadow-brand-primary/10 transition-all duration-500 will-change-transform relative overflow-hidden"
              >
                {/* Hover background */}
                <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 via-transparent to-brand-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl"></div>
                
                <h3 className="relative text-lg font-bold mb-2 group-hover:text-brand-primary transition-colors duration-300">Product Features</h3>
                <p className="relative text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                  Explore what we offer
                </p>
                
                {/* Arrow icon */}
                <div className="absolute bottom-6 right-6 w-8 h-8 rounded-full bg-brand-primary/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all duration-300">
                  <svg className="w-4 h-4 text-brand-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </a>
            </div>
          </div>
        </section>
          </PageFX>
        ) : (
          <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
            <div className="section-container text-center">
              <h1 className="section-title text-white mb-6">Get in Touch</h1>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
