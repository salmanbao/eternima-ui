import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Shield, Cloud, Users } from "lucide-react";

const FeaturesPage = () => {
  const mainFeatures = [
    {
      icon: <Sparkles className="w-8 h-8" />,
      title: "ETI.AI™ — Reflective Intelligence",
      tagline: "Your private personal AI mirror",
      description: "A private personal AI that learns from your voice, text, and behavior to create a personal mirror for self-awareness, memory recall, and compassionate conversations.",
      features: [
        "Personalized reflections and timelines",
        "Emotion-aware highlights and trend reports",
        "Time-sliced cognitive profiles showing how you change",
        "Local-first: data stays on your device",
        "Pattern recognition in tone, language, and behavior",
        "Private memory recall and search"
      ]
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "LuxVault Capsule™ — Offline Data Vault",
      tagline: "Tamper-proof legacy storage",
      description: "A biometric, air-gapped storage capsule for your complete life archive. Ideal for families who want a tamper-proof legacy store.",
      features: [
        "Biometric access (VaultKey option)",
        "Tamper-evident, offline-first storage",
        "Complete air-gap security",
        "Secure export options for legal inheritance",
        "Physical custody of your digital life",
        "No cloud dependencies"
      ]
    },
    {
      icon: <Cloud className="w-8 h-8" />,
      title: "Lumirec™ — Wearable Voice Recorder",
      tagline: "Capture life as it happens",
      description: "Lightweight wearable designed to capture high-fidelity voice and emotional cues on the move. Syncs securely with the app and LuxVault.",
      features: [
        "High-fidelity voice capture",
        "Emotional cue detection",
        "Secure sync with app and vault",
        "All-day battery life",
        "Discreet wearable design",
        "Encrypted on-device storage"
      ]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "SoulNFT™ — Verifiable Digital Identity",
      tagline: "Your inheritable continuity",
      description: "A living, inheritable digital identity that links your AI twin, biometric keys, and secure vault access — designed for long-term continuity (user-controlled).",
      features: [
        "Inheritable digital identity",
        "Links AI twin and biometric keys",
        "User-controlled access and permissions",
        "Verifiable provenance and integrity",
        "Executor designation system",
        "Legal continuity framework"
      ]
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
              Complete Features Overview
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Eternima combines cutting-edge AI, secure hardware, and user-controlled identity 
              to create the most comprehensive digital legacy and reflection platform.
            </p>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="space-y-16">
              {mainFeatures.map((feature, index) => (
                <div 
                  key={index}
                  className={`flex flex-col ${
                    index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'
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
                    <div className="bg-gradient-to-br from-brand-tertiary/30 to-brand-tertiary/10 rounded-3xl aspect-square flex items-center justify-center">
                      <div className="text-center p-8">
                        <div className="w-32 h-32 mx-auto rounded-full bg-brand-primary/20 flex items-center justify-center mb-4">
                          <div className="text-brand-primary">
                            {feature.icon}
                          </div>
                        </div>
                        <p className="text-muted-foreground">Product visualization</p>
                      </div>
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
              Choose the plan that fits your needs and start capturing your life's moments today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                View Pricing Plans
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-colors"
              >
                Contact Sales
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default FeaturesPage;
