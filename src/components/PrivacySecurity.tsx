import React from "react";

const PrivacySecurity = () => {
  const features = [
    {
      title: "Local-first architecture",
      description: "Most processing happens on your device; nothing leaves your phone unless you explicitly choose to share. (If you choose LuxVault or other hardware options, they are encrypted and offline by default.)"
    },
    {
      title: "User-controlled inheritance",
      description: "You set who can access your archive and under what conditions — no automatic transfers."
    },
    {
      title: "Tamper evidence & provenance",
      description: "Each saved item includes verifiable integrity metadata so changes can be detected."
    },
    {
      title: "Biometric safeguards",
      description: "When you use VaultKey or LuxVault, access is protected by biometric verification for continuity and safety."
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-pulse-50 to-white" id="privacy">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Privacy & Security</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
            Privacy is central. We design for the person, not the platform.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 mb-8">
          {features.map((feature, index) => (
            <div 
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-white border border-pulse-200 hover:shadow-elegant transition-all duration-300 animate-on-scroll"
            >
              <h3 className="text-lg sm:text-xl font-display font-semibold mb-3 text-pulse-600">
                {feature.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-lg text-gray-700 italic max-w-2xl mx-auto">
            "Everything we build is designed so you — and only you — keep control."
          </p>
        </div>
      </div>
    </section>
  );
};

export default PrivacySecurity;
