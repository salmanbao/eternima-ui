import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_PRIVACY_PAGE, ENABLE_FX_GRID, ENABLE_FX_STREAMS, ENABLE_FX_PARTICLES } from "@/lib/featureFlags";
import { Shield, Lock, Key, FileCheck, Eye, HardDrive, UserCheck, Clock } from "lucide-react";

const PrivacySecurityPage = () => {
  useEffect(() => {
    if (!ENABLE_ANIME_GLOBAL || !ENABLE_ANIME_PRIVACY_PAGE) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    // Mobile detection
    const isMobile = window.innerWidth < 768;
    if (isMobile) return;

    // Dynamically import anime
    import('animejs').then((animeModule) => {
      const anime = (animeModule as any).default || animeModule;
      
      // Check if anime is v4 or v3
      const isV4 = typeof anime === 'function' && anime.timeline !== undefined;

      // Create floating particles for hero section
      const heroSection = document.querySelector('.privacy-hero-particles');
      if (heroSection) {
        for (let i = 0; i < 40; i++) {
          const particle = document.createElement('div');
          particle.className = 'hero-particle';
          particle.style.cssText = `
            position: absolute;
            width: ${3 + Math.random() * 4}px;
            height: ${3 + Math.random() * 4}px;
            background: rgba(203, 155, 50, ${0.3 + Math.random() * 0.4});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            pointer-events: none;
            z-index: 1;
          `;
          heroSection.appendChild(particle);

          if (isV4) {
            anime({
              targets: particle,
              translateY: [0, -100 - Math.random() * 100],
              translateX: [-30 + Math.random() * 60, -30 + Math.random() * 60],
              opacity: [0, 0.6, 0],
              duration: 8000 + Math.random() * 4000,
              easing: 'linear',
              loop: true,
              delay: Math.random() * 5000
            });
          } else {
            anime({
              targets: particle,
              translateY: [0, -100 - Math.random() * 100],
              translateX: [-30 + Math.random() * 60, -30 + Math.random() * 60],
              opacity: [0, 0.6, 0],
              duration: 8000 + Math.random() * 4000,
              easing: 'linear',
              loop: true,
              delay: Math.random() * 5000
            });
          }
        }
      }

      // Animate security feature cards with stagger
      const securityCards = document.querySelectorAll('.security-feature-card');
      if (securityCards.length > 0) {
        if (isV4) {
          anime({
            targets: securityCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: (el, i) => i * 100,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: securityCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
          });
        }
      }

      // Animate privacy principle cards with stagger
      const principleCards = document.querySelectorAll('.privacy-principle-card');
      if (principleCards.length > 0) {
        if (isV4) {
          anime({
            targets: principleCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: (el, i) => i * 120,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: principleCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: anime.stagger(120),
            easing: 'easeOutQuad'
          });
        }
      }

      // Animate inheritance feature cards with stagger
      const inheritanceCards = document.querySelectorAll('.inheritance-feature-card');
      if (inheritanceCards.length > 0) {
        if (isV4) {
          anime({
            targets: inheritanceCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: (el, i) => i * 120,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: inheritanceCards,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 800,
            delay: anime.stagger(120),
            easing: 'easeOutQuad'
          });
        }
      }

      // Animate inheritance use case box
      const useCaseBox = document.querySelector('.inheritance-use-case');
      if (useCaseBox) {
        if (isV4) {
          anime({
            targets: useCaseBox,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            delay: 400,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: useCaseBox,
            opacity: [0, 1],
            translateY: [40, 0],
            duration: 1000,
            delay: 400,
            easing: 'easeOutQuad'
          });
        }
      }

      // Animate technical specs sections with stagger
      const techSections = document.querySelectorAll('.tech-spec-section');
      if (techSections.length > 0) {
        if (isV4) {
          anime({
            targets: techSections,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            delay: (el, i) => i * 100,
            easing: 'easeOutQuad'
          });
        } else {
          anime({
            targets: techSections,
            opacity: [0, 1],
            translateY: [30, 0],
            duration: 700,
            delay: anime.stagger(100),
            easing: 'easeOutQuad'
          });
        }
      }

      // 3D tilt effect for security feature cards
      const handleSecurityCardTilt = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      };

      const handleSecurityCardLeave = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        card.style.transform = '';
      };

      securityCards.forEach((card) => {
        card.addEventListener('mouseenter', handleSecurityCardTilt as EventListener);
        card.addEventListener('mousemove', handleSecurityCardTilt as EventListener);
        card.addEventListener('mouseleave', handleSecurityCardLeave as EventListener);
      });

      // 3D tilt effect for inheritance cards
      const handleInheritanceCardTilt = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateX = (y - centerY) / 10;
        const rotateY = (centerX - x) / 10;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-8px) scale(1.02)`;
      };

      const handleInheritanceCardLeave = (e: MouseEvent) => {
        const card = e.currentTarget as HTMLElement;
        card.style.transform = '';
      };

      inheritanceCards.forEach((card) => {
        card.addEventListener('mouseenter', handleInheritanceCardTilt as EventListener);
        card.addEventListener('mousemove', handleInheritanceCardTilt as EventListener);
        card.addEventListener('mouseleave', handleInheritanceCardLeave as EventListener);
      });

      // Cleanup
      return () => {
        // Remove particles
        const particles = document.querySelectorAll('.hero-particle');
        particles.forEach(p => p.remove());

        // Remove event listeners
        securityCards.forEach((card) => {
          card.removeEventListener('mouseenter', handleSecurityCardTilt as EventListener);
          card.removeEventListener('mousemove', handleSecurityCardTilt as EventListener);
          card.removeEventListener('mouseleave', handleSecurityCardLeave as EventListener);
        });

        inheritanceCards.forEach((card) => {
          card.removeEventListener('mouseenter', handleInheritanceCardTilt as EventListener);
          card.removeEventListener('mousemove', handleInheritanceCardTilt as EventListener);
          card.removeEventListener('mouseleave', handleInheritanceCardLeave as EventListener);
        });
      };
    });
  }, []);

  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "Your data is encrypted on your device before it ever reaches our servers. We use AES-256 encryption—the same standard used by governments and militaries."
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "Local-First Architecture",
      description: "Most of your data lives on your device or in your LuxVault Capsule™. Cloud backups are optional, encrypted, and you control the keys."
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Zero-Knowledge Design",
      description: "We can't read your memories, voice recordings, or reflections. Only you and your designated inheritors can decrypt your data."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Biometric Safeguards",
      description: "Multi-factor authentication with biometric verification (fingerprint, face ID) ensures only authorized access to your digital legacy."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Tamper-Evident Storage",
      description: "SoulNFT™ technology creates immutable proof-of-existence timestamps. Any unauthorized changes to your data are immediately detectable."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency by Default",
      description: "Open-source encryption libraries, regular security audits, and clear documentation of how your data is handled."
    }
  ];

  const privacyPrinciples = [
    {
      title: "You Own Your Data",
      description: "Every memory, voice note, and reflection belongs to you—not us. Export, delete, or transfer it anytime."
    },
    {
      title: "No Ads, No Tracking",
      description: "We don't sell your data or show ads. Our business model is simple: you pay for the service, we protect your privacy."
    },
    {
      title: "Minimal Data Collection",
      description: "We collect only what's necessary to provide the service: email, account info, and usage analytics (anonymous and opt-out)."
    },
    {
      title: "Consent-Based AI Training",
      description: "Your personal data is never used to train public AI models. ETI.AI™ learns from your data locally, for your benefit alone."
    }
  ];

  const inheritanceFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Automated Verification",
      description: "Set up periodic check-ins (monthly, quarterly). If you don't respond, a secure countdown begins before inheritors are notified."
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Multi-Key Inheritance",
      description: "Use Shamir's Secret Sharing to split decryption keys among trusted individuals. No single person can access your data alone."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Granular Permissions",
      description: "Control what each inheritor receives: voice messages for family, professional archive for colleagues, selected memories for friends."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_PRIVACY_PAGE ? (
          <PageFX showGrid={ENABLE_FX_GRID} showHex={false} showParticles={ENABLE_FX_PARTICLES} intensity="low" showStreams={ENABLE_FX_STREAMS} showScanline={false} showCursorTrail={false}>
        {/* Hero Section */}
        <section className="privacy-hero-particles relative overflow-hidden py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
          <div className="section-container text-center relative z-10">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6 group hover:scale-110 hover:rotate-3 transition-all duration-300">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="section-title text-white mb-6">
              Privacy & Security
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your memories are sacred. We've built Eternima on a foundation of 
              zero-knowledge encryption, local-first storage, and user-controlled inheritance.
            </p>
          </div>
        </section>

        {/* Core Security Features */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Military-Grade Protection
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              We use the same encryption standards trusted by governments and financial institutions 
              to protect your most personal data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="security-feature-card group bg-white rounded-2xl border-2 border-brand-tertiary/60 p-6 hover:shadow-elegant transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-0 right-0 w-20 h-20 bg-brand-primary/10 rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-brand-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Our Privacy Commitments
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              These aren't just policies—they're promises.
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              {privacyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="privacy-principle-card bg-white rounded-2xl border-2 border-brand-tertiary/60 p-8 hover:shadow-elegant hover:border-brand-primary/40 transition-all duration-300 relative overflow-hidden group"
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-brand-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-0 right-0 w-32 h-32 bg-brand-primary/5 rounded-tl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <h3 className="text-2xl font-display font-bold mb-3 group-hover:text-brand-primary transition-colors duration-300">
                      {principle.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed text-lg">
                      {principle.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Inheritance Controls */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Control Your Digital Afterlife
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              Plan who inherits your memories, how they access them, and when—all on your terms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {inheritanceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="inheritance-feature-card group bg-brand-tertiary/20 rounded-2xl border-2 border-brand-tertiary/60 p-6 hover:shadow-elegant transition-all duration-300 relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute top-2 right-2 w-3 h-3 border-t-2 border-r-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="absolute bottom-2 left-2 w-3 h-3 border-b-2 border-l-2 border-brand-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <div className="relative z-10">
                    <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white mb-4 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-md">
                      {feature.icon}
                    </div>
                    <h3 className="text-xl font-display font-bold mb-3 group-hover:text-brand-primary transition-colors duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-muted-foreground leading-relaxed">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Inheritance Use Case */}
            <div className="inheritance-use-case max-w-4xl mx-auto bg-brand-secondary text-white rounded-3xl p-8 sm:p-12 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="relative z-10">
                <h3 className="text-2xl font-display font-bold mb-4">
                  How Inheritance Works: An Example
                </h3>
                <div className="space-y-4 text-white/90">
                  <p className="leading-relaxed">
                    <span className="font-bold text-brand-primary">Sarah</span> sets up a 
                    90-day check-in. She splits her decryption key among three people: 
                    her daughter Emma (40%), her brother Tom (30%), and her best friend Lisa (30%).
                  </p>
                  <p className="leading-relaxed">
                    Each quarter, Sarah confirms she's okay via biometric login. If she doesn't respond 
                    after 3 failed attempts, Emma, Tom, and Lisa receive encrypted key fragments.
                  </p>
                  <p className="leading-relaxed">
                    <span className="font-bold">No single person can access her data alone.</span> Emma's 
                    40% + Tom's 30% = 70% of the key (threshold met). Together, they decrypt Sarah's 
                    LuxVault Capsule™ and access her voice messages, photos, and final reflections.
                  </p>
                  <p className="leading-relaxed">
                    Lisa receives access only to Sarah's "Friends" collection—memories Sarah specifically 
                    chose to share with her close circle.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Technical Details
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              For the security-conscious: here's exactly how we protect your data.
            </p>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl border-2 border-brand-tertiary/60 p-8 sm:p-12 hover:shadow-elegant transition-shadow duration-300">
              <div className="space-y-8">
                <div className="tech-spec-section">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group">
                    <Lock className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                    Encryption Standards
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• <span className="font-semibold">AES-256-GCM</span> for data at rest</li>
                    <li>• <span className="font-semibold">TLS 1.3</span> for data in transit</li>
                    <li>• <span className="font-semibold">RSA-4096</span> for key exchange</li>
                    <li>• <span className="font-semibold">PBKDF2</span> with 100,000 iterations for password hashing</li>
                  </ul>
                </div>

                <div className="tech-spec-section">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group">
                    <HardDrive className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                    Data Storage
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Primary storage: Your device or LuxVault Capsule™ (offline)</li>
                    <li>• Optional cloud backup: Encrypted before upload (we never have the keys)</li>
                    <li>• Servers located in privacy-respecting jurisdictions (EU, Switzerland)</li>
                    <li>• Automatic data deletion 90 days after account cancellation (unless inherited)</li>
                  </ul>
                </div>

                <div className="tech-spec-section">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group">
                    <FileCheck className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                    Compliance & Audits
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• <span className="font-semibold">GDPR</span> compliant (EU data protection)</li>
                    <li>• <span className="font-semibold">SOC 2 Type II</span> audited (in progress)</li>
                    <li>• <span className="font-semibold">Annual penetration testing</span> by third-party security firms</li>
                    <li>• <span className="font-semibold">Bug bounty program</span> for responsible disclosure</li>
                  </ul>
                </div>

                <div className="tech-spec-section">
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2 group">
                    <Eye className="w-5 h-5 text-brand-primary group-hover:scale-110 transition-transform duration-300" />
                    Open Source Components
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Encryption libraries: <span className="font-mono text-sm">libsodium</span>, <span className="font-mono text-sm">OpenSSL</span></li>
                    <li>• Voice processing: <span className="font-mono text-sm">Whisper ASR</span> (runs locally)</li>
                    <li>• Security audit reports published annually</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're transparent by design. Read our full privacy policy or contact 
              our security team with specific concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/terms"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-all duration-300 inline-block hover:scale-105 hover:shadow-xl relative overflow-hidden group"
              >
                <span className="relative z-10">Read Full Privacy Policy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-brand-primary text-brand-primary rounded-xl font-semibold transition-all duration-300 inline-block hover:scale-105 hover:shadow-lg"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </section>
          </PageFX>
        ) : (
          <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
            <div className="section-container text-center">
              <h1 className="section-title text-white mb-6">Privacy & Security</h1>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default PrivacySecurityPage;
