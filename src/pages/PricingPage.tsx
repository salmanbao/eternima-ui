import React, { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_PRICING_PAGE, ENABLE_FX_GRID, ENABLE_FX_PARTICLES } from "@/lib/featureFlags";
import { Check, X } from "lucide-react";

const PricingPage = () => {
  const [billingCycle, setBillingCycle] = useState<'monthly' | 'annual'>('monthly');

  const plans = [
    {
      name: "Reflection (Starter)",
      tagline: "Start your memory journey",
      monthlyPrice: "Free",
      annualPrice: "Free",
      description: "Basic app + local reflections; keep memories on your device.",
      features: [
        "Voice and text capture",
        "Basic emotional pattern tracking",
        "Local device storage (unlimited)",
        "Daily reflection prompts",
        "Privacy-first architecture",
        "Export your data anytime"
      ],
      limitations: [
        "No AI analysis",
        "No cloud backup",
        "No hardware integration",
        "No inheritance features"
      ],
      cta: "Start Free Trial",
      highlighted: false
    },
    {
      name: "Identity (Verified)",
      tagline: "Build your digital legacy",
      monthlyPrice: "$19",
      annualPrice: "$190",
      description: "Adds SoulNFT identity and family sharing features; includes one-time verification setup.",
      features: [
        "Everything in Starter",
        "ETI.AI™ reflective intelligence",
        "Emotional trend analysis",
        "SoulNFT™ digital identity",
        "Family sharing (up to 5 members)",
        "Cloud backup (encrypted)",
        "Voice timeline creation",
        "Memory search & insights"
      ],
      limitations: [
        "No offline vault",
        "No wearable device",
        "Basic inheritance tools"
      ],
      cta: "Start 14-Day Trial",
      highlighted: true
    },
    {
      name: "Eternal (Continuity)",
      tagline: "Complete legacy preservation",
      monthlyPrice: "$49",
      annualPrice: "$490",
      description: "Full continuity features, LuxVault integration, executor controls, and priority support.",
      features: [
        "Everything in Identity",
        "LuxVault Capsule™ integration",
        "Lumirec™ wearable support",
        "Advanced AI personality modeling",
        "Legal executor designation",
        "Inheritance automation",
        "Biometric vault access",
        "Priority support (24/7)",
        "Advanced provenance & verification",
        "Custom reflection schedules",
        "Unlimited family access"
      ],
      limitations: [],
      cta: "Start 30-Day Trial",
      highlighted: false
    }
  ];

  // Animate prices on mount and when billing cycle changes
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || isMobile || !(ENABLE_ANIME_GLOBAL && ENABLE_ANIME_PRICING_PAGE)) return;

    let cancelled = false;
    (async () => {
      const mod: any = await import('animejs');
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4 ? (mod.animate || mod?.default?.animate) : (
        (typeof mod === 'function' && mod) ||
        (typeof mod?.default === 'function' && mod.default) ||
        (typeof mod?.anime === 'function' && mod.anime) ||
        (typeof mod?.default?.anime === 'function' && mod.default.anime)
      );
      if (!animateFn) return;
      if (cancelled) return;

      const spans = Array.from(document.querySelectorAll<HTMLSpanElement>('.plan-price'));
      spans.forEach((span) => {
        const targetText = span.getAttribute(`data-${billingCycle}`) || '';
        if (!targetText || targetText.toLowerCase() === 'free') {
          span.textContent = targetText || 'Free';
          return;
        }
        const match = targetText.match(/\$?(\d+(?:\.\d+)?)/);
        if (!match) {
          span.textContent = targetText;
          return;
        }
        const target = parseFloat(match[1]);
        const prefix = targetText.trim().startsWith('$') ? '$' : '';
        const suffix = targetText.trim().endsWith('%') ? '%' : '';
        const obj = { val: 0 };
        if (isV4) {
          animateFn(obj, {
            val: [{ to: target, duration: 1200 }],
            ease: 'outCubic',
            loop: false,
            onUpdate: () => {
              span.textContent = `${prefix}${Math.round((obj as any).val)}${suffix}`;
            }
          });
        } else {
          animateFn({
            targets: obj,
            val: target,
            duration: 1200,
            easing: 'easeOutCubic',
            round: 1,
            update: () => {
              span.textContent = `${prefix}${Math.round((obj as any).val)}${suffix}`;
            }
          });
        }
      });
    })();

    return () => { cancelled = true; };
  }, [billingCycle]);

  // Create floating particles around titles on mount
  useEffect(() => {
    const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
    const prefersReduced = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || isMobile || !(ENABLE_ANIME_GLOBAL && ENABLE_ANIME_PRICING_PAGE)) return;

    let cleanupFns: Array<() => void> = [];
    (async () => {
      const mod: any = await import('animejs');
      const isV4 = !!(mod?.animate || mod?.default?.animate);
      const animateFn: any = isV4 ? (mod.animate || mod?.default?.animate) : (
        (typeof mod === 'function' && mod) ||
        (typeof mod?.default === 'function' && mod.default) ||
        (typeof mod?.anime === 'function' && mod.anime) ||
        (typeof mod?.default?.anime === 'function' && mod.default.anime)
      );
      if (!animateFn) return;

      // Create floating particles for each container
      const containers = document.querySelectorAll('.floating-particles-container');
      containers.forEach((container) => {
        const particleCount = 50; // Increased from 25 to 50 particles
        const particles: HTMLDivElement[] = [];
        
        for (let i = 0; i < particleCount; i++) {
          const particle = document.createElement('div');
          particle.className = 'floating-particle';
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
              y: [
                { to: -100, duration: 8000 + Math.random() * 4000 }
              ],
              x: [
                { to: -30 + Math.random() * 60, duration: 4000 + Math.random() * 3000 },
                { to: 0, duration: 4000 + Math.random() * 3000 }
              ],
              opacity: [
                { to: 0, duration: 1000 },
                { to: 0.4 + Math.random() * 0.5, duration: 2000 },
                { to: 0, duration: 1000 }
              ],
              ease: 'linear',
              loop: true,
              delay: i * 300,
            });
          } else {
            animateFn({
              targets: particle,
              translateY: [
                { value: -100, duration: 8000 + Math.random() * 4000 }
              ],
              translateX: [
                { value: -30 + Math.random() * 60, duration: 4000 + Math.random() * 3000 },
                { value: 0, duration: 4000 + Math.random() * 3000 }
              ],
              opacity: [
                { value: 0, duration: 1000 },
                { value: 0.4 + Math.random() * 0.5, duration: 2000 },
                { value: 0, duration: 1000 }
              ],
              easing: 'linear',
              loop: true,
              delay: i * 300,
            });
          }
        }

        cleanupFns.push(() => {
          particles.forEach(p => p.remove());
        });
      });
    })();

    return () => {
      cleanupFns.forEach(fn => fn());
    };
  }, []);

  const hardwareProducts = [
    {
      name: "LuxVault Capsule™",
      price: "$299",
      description: "Offline data vault with biometric access",
      oneTime: true
    },
    {
      name: "Lumirec™ Wearable",
      price: "$149",
      description: "High-fidelity voice recorder for daily capture",
      oneTime: true
    },
    {
      name: "VaultKey Biometric",
      price: "$79",
      description: "Additional biometric access key",
      oneTime: true
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_PRICING_PAGE ? (
          <PageFX showGrid={ENABLE_FX_GRID} showHex={false} showParticles={ENABLE_FX_PARTICLES} intensity="low" showStreams={false} showScanline={false} showCursorTrail={false}>
            {/* Hero Section */}
            <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80 relative overflow-hidden floating-particles-container">
              <div className="section-container text-center relative z-10">
                <h1 className="section-title text-white mb-6">
                  <span className="relative inline-block">
                    Transparent Pricing for Every Journey
                  </span>
                </h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  Choose the plan that fits your reflection needs. Start free, upgrade anytime.
                </p>
                
                {/* Billing Toggle */}
                <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full p-2">
              <button
                onClick={() => setBillingCycle('monthly')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === 'monthly'
                    ? 'bg-white text-brand-secondary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Monthly
              </button>
              <button
                onClick={() => setBillingCycle('annual')}
                className={`px-6 py-2 rounded-full transition-all ${
                  billingCycle === 'annual'
                    ? 'bg-white text-brand-secondary'
                    : 'text-white/70 hover:text-white'
                }`}
              >
                Annual
                <span className="ml-2 text-xs bg-brand-primary text-white px-2 py-1 rounded-full">
                  Save 20%
                </span>
              </button>
              </div>
            </div>
            </section>

            {/* Pricing Cards */}
            <section className="py-24 bg-white">
              <div className="section-container">
                {/* Section Header */}
                <div className="text-center mb-16">
                  <h2 className="text-4xl font-display font-bold mb-4">Choose Your Plan</h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Select the perfect plan for your memory preservation journey
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
              {plans.map((plan, index) => (
                <div
                  key={index}
                  className={`pricing-card group relative rounded-3xl border-2 overflow-visible transform transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 ${
                    plan.highlighted
                      ? 'border-brand-primary bg-gradient-to-br from-brand-tertiary/5 via-white to-brand-tertiary/10 shadow-xl md:mt-8 md:-translate-y-4 hover:md:-translate-y-6'
                      : 'border-brand-tertiary bg-white hover:border-brand-primary md:mt-12 hover:scale-[1.02]'
                  }`}
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationName: 'fadeInUp',
                    animationDuration: '0.8s',
                    animationFillMode: 'both',
                    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseMove={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    const r = el.getBoundingClientRect();
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    const dx = (e.clientX - cx) / r.width;
                    const dy = (e.clientY - cy) / r.height;
                    const rotX = dy * -3;
                    const rotY = dx * 3;
                    
                    // Update CSS custom properties for the spotlight effect
                    el.style.setProperty('--mouse-x', `${((e.clientX - r.left) / r.width) * 100}%`);
                    el.style.setProperty('--mouse-y', `${((e.clientY - r.top) / r.height) * 100}%`);
                    
                    const baseTransform = plan.highlighted ? 'translateY(-1rem)' : '';
                    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) ${baseTransform} translateY(-0.5rem)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    const baseTransform = plan.highlighted ? 'translateY(-1rem)' : '';
                    el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) ${baseTransform}`;
                  }}
                >
                  {/* Popular Badge */}
                  {plan.highlighted && (
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 z-20 w-max">
                      <div className="bg-gradient-to-r from-brand-primary to-brand-secondary text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg animate-pulse whitespace-nowrap">
                        ⭐ Most Popular
                      </div>
                    </div>
                  )}
                  
                  {/* Card Content */}
                  <div className="p-8 lg:p-10">
                    {/* Header */}
                    <div className="text-center mb-8 pb-6 border-b border-brand-tertiary/30">
                      <h3 className="text-2xl lg:text-3xl font-display font-bold mb-3 text-gray-900">
                        {plan.name}
                      </h3>
                      <p className="text-sm lg:text-base text-brand-primary font-semibold mb-6">
                        {plan.tagline}
                      </p>
                      
                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline justify-center gap-1">
                          <span
                            className="plan-price text-5xl lg:text-6xl font-bold bg-gradient-to-r from-brand-primary to-brand-secondary bg-clip-text text-transparent"
                            data-monthly={plan.monthlyPrice}
                            data-annual={plan.annualPrice}
                          >
                            {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          </span>
                          {plan.monthlyPrice !== 'Free' && (
                            <span className="text-base text-muted-foreground font-medium">
                              /{billingCycle === 'monthly' ? 'mo' : 'yr'}
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground leading-relaxed px-2">
                        {plan.description}
                      </p>
                    </div>

                    {/* CTA Button */}
                    <button
                      className={`w-full py-4 px-6 rounded-xl font-bold text-base mb-8 transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-2xl relative overflow-hidden ${
                        plan.highlighted
                          ? 'bg-gradient-to-r from-brand-primary to-brand-secondary hover:from-brand-secondary hover:to-brand-primary text-white'
                          : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white'
                      }`}
                    >
                      <span className="relative z-10">{plan.cta}</span>
                    </button>

                    {/* Features List */}
                    <div className="space-y-4 mb-8">
                      <div className="text-xs font-bold uppercase tracking-wider text-brand-secondary mb-3">
                        Included Features
                      </div>
                      {plan.features.map((feature, idx) => (
                        <div 
                          key={idx} 
                          className="flex items-start gap-3 group"
                          style={{
                            animationDelay: `${(index * 150) + (idx * 50)}ms`,
                            animationName: 'fadeInLeft',
                            animationDuration: '0.5s',
                            animationFillMode: 'both'
                          }}
                        >
                          <div className="flex-shrink-0 w-6 h-6 rounded-full bg-brand-primary/10 flex items-center justify-center mt-0.5 group-hover:bg-brand-primary/20 transition-colors">
                            <Check className="w-4 h-4 text-brand-primary" />
                          </div>
                          <span className="text-sm text-gray-700 leading-relaxed">{feature}</span>
                        </div>
                      ))}
                    </div>

                    {/* Limitations */}
                    {plan.limitations.length > 0 && (
                      <div className="border-t border-brand-tertiary/30 pt-6 space-y-3">
                        <div className="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">
                          Not Included
                        </div>
                        {plan.limitations.map((limitation, idx) => (
                          <div key={idx} className="flex items-start gap-3 opacity-60">
                            <X className="w-4 h-4 text-gray-400 flex-shrink-0 mt-1" />
                            <span className="text-sm text-gray-500">{limitation}</span>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              ))}
                </div>
              </div>
            </section>

            {/* Hardware Section */}
            <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <div className="text-center mb-12">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                Hardware Add-Ons
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Optional physical devices to enhance your reflection and storage experience.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {hardwareProducts.map((product, index) => (
                <div
                  key={index}
                  className="hardware-card group bg-white rounded-2xl border border-brand-tertiary p-8 text-center transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 hover:border-brand-primary hover:scale-[1.02] relative overflow-visible"
                  style={{
                    animationDelay: `${index * 150}ms`,
                    animationName: 'fadeInUp',
                    animationDuration: '0.8s',
                    animationFillMode: 'both',
                    animationTimingFunction: 'cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                  onMouseMove={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    const r = el.getBoundingClientRect();
                    const cx = r.left + r.width / 2;
                    const cy = r.top + r.height / 2;
                    const dx = (e.clientX - cx) / r.width;
                    const dy = (e.clientY - cy) / r.height;
                    const rotX = dy * -3;
                    const rotY = dx * 3;
                    
                    // Update CSS custom properties for the spotlight effect
                    el.style.setProperty('--mouse-x', `${((e.clientX - r.left) / r.width) * 100}%`);
                    el.style.setProperty('--mouse-y', `${((e.clientY - r.top) / r.height) * 100}%`);
                    
                    el.style.transform = `perspective(1200px) rotateX(${rotX}deg) rotateY(${rotY}deg) translateY(-0.5rem)`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.transform = `perspective(1200px) rotateX(0deg) rotateY(0deg) translateY(0)`;
                  }}
                >
                  <h3 className="text-xl lg:text-2xl font-display font-bold mb-3 transition-colors group-hover:text-brand-primary">
                    {product.name}
                  </h3>
                  <div className="text-4xl lg:text-5xl font-bold text-brand-primary mb-4 transition-all group-hover:scale-110">
                    {product.price}
                  </div>
                  <p className="text-sm lg:text-base text-muted-foreground mb-6 leading-relaxed">
                    {product.description}
                  </p>
                  <button className="w-full py-3 px-6 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary hover:text-white rounded-xl font-bold transition-all duration-300 transform hover:scale-[1.03] active:scale-95 shadow-md hover:shadow-2xl relative overflow-hidden">
                    <span className="relative z-10">Pre-order</span>
                  </button>
                </div>
              ))}
            </div>
          </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
          <div className="section-container max-w-4xl">
            <h2 className="text-3xl font-display font-bold text-center mb-12">
              Pricing FAQs
            </h2>
            
            <div className="space-y-6">
              <div className="border-b border-brand-tertiary pb-6">
                <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
                <p className="text-muted-foreground">
                  Yes. All subscriptions are cancel-anytime. Your data remains accessible even after cancellation.
                </p>
              </div>
              
              <div className="border-b border-brand-tertiary pb-6">
                <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                <p className="text-muted-foreground">
                  We accept all major credit cards, PayPal, and bank transfers for annual plans.
                </p>
              </div>
              
              <div className="border-b border-brand-tertiary pb-6">
                <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                <p className="text-muted-foreground">
                  Yes. 30-day money-back guarantee on all paid plans, no questions asked.
                </p>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                <p className="text-muted-foreground">
                  Absolutely. Change plans anytime. We'll prorate the difference.
                </p>
              </div>
            </div>
          </div>
            </section>
          </PageFX>
        ) : (
          <>
            {/* Fallback basic content without PageFX */}
            <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
              <div className="section-container text-center">
                <h1 className="section-title text-white mb-6">Transparent Pricing for Every Journey</h1>
                <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
                  Choose the plan that fits your reflection needs. Start free, upgrade anytime.
                </p>
                
                {/* Billing Toggle */}
                <div className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full p-2">
                  <button
                    onClick={() => setBillingCycle('monthly')}
                    className={`px-6 py-2 rounded-full transition-all ${
                      billingCycle === 'monthly'
                        ? 'bg-white text-brand-secondary'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Monthly
                  </button>
                  <button
                    onClick={() => setBillingCycle('annual')}
                    className={`px-6 py-2 rounded-full transition-all ${
                      billingCycle === 'annual'
                        ? 'bg-white text-brand-secondary'
                        : 'text-white/70 hover:text-white'
                    }`}
                  >
                    Annual
                    <span className="ml-2 text-xs bg-brand-primary text-white px-2 py-1 rounded-full">
                      Save 20%
                    </span>
                  </button>
                </div>
              </div>
            </section>
            
            <section className="py-20 bg-white">
              <div className="section-container">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                  {plans.map((plan, index) => (
                    <div
                      key={index}
                      className={`relative rounded-3xl border-2 p-8 ${
                        plan.highlighted
                          ? 'border-brand-primary bg-brand-tertiary/10 shadow-elegant scale-105'
                          : 'border-brand-tertiary bg-white'
                      } transition-all duration-300 hover:shadow-elegant-hover`}
                    >
                      {plan.highlighted && (
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-brand-primary text-white px-4 py-1 rounded-full text-sm font-semibold">
                          Most Popular
                        </div>
                      )}
                      
                      <div className="text-center mb-6">
                        <h3 className="text-2xl font-display font-bold mb-2">
                          {plan.name}
                        </h3>
                        <p className="text-sm text-brand-primary font-medium mb-4">
                          {plan.tagline}
                        </p>
                        <div className="mb-4">
                          <span className="text-4xl font-bold">
                            {billingCycle === 'monthly' ? plan.monthlyPrice : plan.annualPrice}
                          </span>
                          {plan.monthlyPrice !== 'Free' && (
                            <span className="text-muted-foreground">
                              /{billingCycle === 'monthly' ? 'month' : 'year'}
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {plan.description}
                        </p>
                      </div>

                      <button
                        className={`w-full py-3 rounded-lg font-semibold mb-6 transition-colors ${
                          plan.highlighted
                            ? 'bg-brand-primary hover:bg-brand-primary/90 text-white'
                            : 'border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10'
                        }`}
                      >
                        {plan.cta}
                      </button>

                      <div className="space-y-3 mb-6">
                        {plan.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-brand-primary flex-shrink-0 mt-0.5" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {plan.limitations.length > 0 && (
                        <div className="border-t border-brand-tertiary pt-4 space-y-2">
                          {plan.limitations.map((limitation, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <X className="w-5 h-5 text-muted-foreground flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-muted-foreground">{limitation}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Hardware Section */}
            <section className="py-20 bg-brand-tertiary/20">
              <div className="section-container">
                <div className="text-center mb-12">
                  <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                    Hardware Add-Ons
                  </h2>
                  <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                    Optional physical devices to enhance your reflection and storage experience.
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                  {hardwareProducts.map((product, index) => (
                    <div
                      key={index}
                      className="bg-white rounded-2xl border border-brand-tertiary p-6 text-center hover:shadow-elegant transition-shadow"
                    >
                      <h3 className="text-xl font-display font-bold mb-2">
                        {product.name}
                      </h3>
                      <div className="text-3xl font-bold text-brand-primary mb-3">
                        {product.price}
                      </div>
                      <p className="text-sm text-muted-foreground mb-4">
                        {product.description}
                      </p>
                      <button className="w-full py-2 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-colors">
                        Pre-order
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* FAQ Section */}
            <section className="py-20 bg-white">
              <div className="section-container max-w-4xl">
                <h2 className="text-3xl font-display font-bold text-center mb-12">
                  Pricing FAQs
                </h2>
                
                <div className="space-y-6">
                  <div className="border-b border-brand-tertiary pb-6">
                    <h3 className="text-lg font-semibold mb-2">Can I cancel anytime?</h3>
                    <p className="text-muted-foreground">
                      Yes. All subscriptions are cancel-anytime. Your data remains accessible even after cancellation.
                    </p>
                  </div>
                  
                  <div className="border-b border-brand-tertiary pb-6">
                    <h3 className="text-lg font-semibold mb-2">What payment methods do you accept?</h3>
                    <p className="text-muted-foreground">
                      We accept all major credit cards, PayPal, and bank transfers for annual plans.
                    </p>
                  </div>
                  
                  <div className="border-b border-brand-tertiary pb-6">
                    <h3 className="text-lg font-semibold mb-2">Do you offer refunds?</h3>
                    <p className="text-muted-foreground">
                      Yes. 30-day money-back guarantee on all paid plans, no questions asked.
                    </p>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-semibold mb-2">Can I upgrade or downgrade my plan?</h3>
                    <p className="text-muted-foreground">
                      Absolutely. Change plans anytime. We'll prorate the difference.
                    </p>
                  </div>
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

export default PricingPage;
