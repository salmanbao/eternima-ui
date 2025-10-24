import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const FAQ = () => {
  const faqs = [
    {
      question: "Is my data stored on Eternima's servers?",
      answer: "No — by default your data remains on your device. You can optionally back up encrypted archives to LuxVault hardware or export them for safekeeping."
    },
    {
      question: "What happens after I pass away?",
      answer: "You control if and how your digital continuity activates. You can define executors, legal conditions, and what your loved ones may access — all under your control."
    },
    {
      question: "Can the AI \"become\" me?",
      answer: "The AI is a simulation based on your data. We surface provenance and always disclose the synthetic nature of interactions. The goal is continuity and comfort, not deception."
    },
    {
      question: "Is voice cloning available?",
      answer: "Voice features are opt-in and protected with additional consent; any reproductions are watermarked and auditable."
    },
    {
      question: "Can I delete everything?",
      answer: "Yes — you can delete your archive, personal adapters, and any backups at any time. Deletion instructions and audit logs are available in the app."
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-white" id="faq">
      <div className="section-container max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-gray-600">
            Common questions about privacy, security, and how Eternima works
          </p>
        </div>

        <Accordion type="single" collapsible className="w-full space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className="border border-pulse-200 rounded-lg px-6 bg-white hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 hover:text-pulse-600 py-4">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm sm:text-base pb-4">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-8">
          <a href="#" className="text-pulse-600 hover:text-pulse-700 font-semibold">
            More questions? → View full FAQ page
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
