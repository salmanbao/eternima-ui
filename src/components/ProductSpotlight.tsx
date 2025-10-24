import React from "react";

interface ProductCardProps {
  title: string;
  description: string;
  features: string[];
}

const ProductCard = ({ title, description, features }: ProductCardProps) => {
  return (
    <div className="p-6 sm:p-8 rounded-2xl bg-white border border-pulse-200 hover:shadow-elegant transition-all duration-300 animate-on-scroll">
      <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 text-pulse-600">{title}</h3>
      <p className="text-gray-700 mb-4 text-sm sm:text-base">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="text-gray-600 text-sm flex items-start">
            <span className="text-pulse-500 mr-2">•</span>
            <span>{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

const ProductSpotlight = () => {
  const products = [
    {
      title: "ETI.AI™ — Reflective Intelligence",
      description: "A private personal AI that learns from your voice, text, and behavior to create a personal mirror for self-awareness, memory recall, and compassionate conversations.",
      features: [
        "Personalized reflections and timelines",
        "Emotion-aware highlights and trend reports",
        "Local-first: data stays on your device"
      ]
    },
    {
      title: "LuxVault Capsule™ — Offline Data Vault",
      description: "A biometric, air-gapped storage capsule for your complete life archive. Ideal for families who want a tamper-proof legacy store.",
      features: [
        "Biometric access (VaultKey option)",
        "Tamper-evident, offline-first storage",
        "Secure export options for legal inheritance"
      ]
    },
    {
      title: "Lumirec™ — Wearable Voice Recorder",
      description: "Lightweight wearable designed to capture high-fidelity voice and emotional cues on the move. Syncs securely with the app and LuxVault.",
      features: [
        "High-fidelity voice capture",
        "Emotional cue detection",
        "Secure sync with app and vault"
      ]
    },
    {
      title: "SoulNFT™ — Verifiable Digital Identity",
      description: "A living, inheritable digital identity that links your AI twin, biometric keys, and secure vault access — designed for long-term continuity (user-controlled).",
      features: [
        "Inheritable digital identity",
        "Links AI twin and biometric keys",
        "User-controlled access and permissions"
      ]
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-white to-pulse-50" id="products">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Product Spotlight</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Each product is designed to work seamlessly together, creating a complete ecosystem for preserving and reflecting on your life.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {products.map((product, index) => (
            <ProductCard key={index} {...product} />
          ))}
        </div>

        <div className="text-center">
          <button className="px-8 py-4 bg-pulse-600 hover:bg-pulse-700 text-white rounded-lg font-semibold transition-colors">
            Compare plans & devices
          </button>
        </div>
      </div>
    </section>
  );
};

export default ProductSpotlight;
