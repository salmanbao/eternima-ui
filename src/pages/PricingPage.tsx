import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
          <div className="section-container text-center">
            <h1 className="section-title text-white mb-6">
              Transparent Pricing for Every Journey
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
      </main>

      <Footer />
    </div>
  );
};

export default PricingPage;
