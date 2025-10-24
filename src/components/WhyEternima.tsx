import React from "react";

const WhyEternima = () => {
  const benefits = [
    {
      title: "For families",
      description: "Keep grandparents' stories, voices and advice accessible and verifiable across generations."
    },
    {
      title: "For caregivers & therapists",
      description: "Gain context on emotional patterns and responses to support care (consent-based)."
    },
    {
      title: "For creators & professionals",
      description: "Preserve your voice and reasoning for future reuse — ethically and privately."
    },
    {
      title: "For heritage organizations",
      description: "Capture verified oral histories and cultural memory with integrity."
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-white" id="why">
      <div className="section-container">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Why Eternima</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Eternima is built for the things that matter — privacy, dignity, and continuity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          {benefits.map((benefit, index) => (
            <div 
              key={index}
              className="p-6 sm:p-8 rounded-2xl bg-gradient-to-br from-pulse-50 to-white border border-pulse-100 hover:shadow-elegant transition-all duration-300 animate-on-scroll"
            >
              <h3 className="text-xl sm:text-2xl font-display font-semibold mb-3 text-pulse-600">
                {benefit.title}
              </h3>
              <p className="text-gray-700 text-sm sm:text-base">
                {benefit.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhyEternima;
