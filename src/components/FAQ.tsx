import React, { useState, useEffect, useRef } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { ChevronDown, HelpCircle } from "lucide-react";

const FAQ = () => {
  const titleRef = useRef<HTMLDivElement>(null);
  const [openItems, setOpenItems] = useState<string[]>([]);
  const [highlightedItem, setHighlightedItem] = useState<string | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    if (titleRef.current) {
      observer.observe(titleRef.current);
    }
    
    return () => {
      if (titleRef.current) {
        observer.unobserve(titleRef.current);
      }
    };
  }, []);

  const handleValueChange = (value: string) => {
    if (value) {
      setHighlightedItem(value);
      setTimeout(() => setHighlightedItem(null), 500);
    }
  };

  const faqs = [
    {
      question: "Is my data stored on Eternima's servers?",
      answer: "No — by default your data remains on your device. You can optionally back up encrypted archives to LuxVault hardware or export them for safekeeping.",
      icon: "🔒"
    },
    {
      question: "What happens after I pass away?",
      answer: "You control if and how your digital continuity activates. You can define executors, legal conditions, and what your loved ones may access — all under your control.",
      icon: "⏳"
    },
    {
      question: "Can the AI \"become\" me?",
      answer: "The AI is a simulation based on your data. We surface provenance and always disclose the synthetic nature of interactions. The goal is continuity and comfort, not deception.",
      icon: "🤖"
    },
    {
      question: "Is voice cloning available?",
      answer: "Voice features are opt-in and protected with additional consent; any reproductions are watermarked and auditable.",
      icon: "🎙️"
    },
    {
      question: "Can I delete everything?",
      answer: "Yes — you can delete your archive, personal adapters, and any backups at any time. Deletion instructions and audit logs are available in the app.",
      icon: "🗑️"
    }
  ];

  return (
    <section className="w-full py-12 sm:py-20 bg-gradient-to-b from-white to-brand-tertiary/10" id="faq">
      <div className="section-container max-w-4xl">
        {/* Icon Header */}
        <div className="flex justify-center mb-6 opacity-0 animate-fade-in">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-brand-primary/20 to-brand-secondary/20 flex items-center justify-center">
            <HelpCircle className="w-8 h-8 text-brand-primary" />
          </div>
        </div>

        <div ref={titleRef} className="text-center mb-12 opacity-0">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-lg text-gray-600">
            Common questions about privacy, security, and how Eternima works
          </p>
        </div>

        <Accordion 
          type="single" 
          collapsible 
          className="w-full space-y-4"
          onValueChange={handleValueChange}
        >
          {faqs.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`}
              className={`group border-2 rounded-2xl px-6 bg-white hover:border-brand-primary transition-all duration-300 overflow-hidden opacity-0 animate-fade-in ${
                highlightedItem === `item-${index}` ? 'ring-4 ring-brand-primary/20' : 'border-brand-tertiary'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <AccordionTrigger className="text-left text-base sm:text-lg font-semibold text-gray-900 hover:text-brand-primary py-5 hover:no-underline group">
                <div className="flex items-center gap-3 flex-1">
                  {/* Animated Icon */}
                  <span className="text-2xl group-data-[state=open]:scale-110 group-data-[state=open]:rotate-12 transition-transform duration-300">
                    {faq.icon}
                  </span>
                  <span className="flex-1">{faq.question}</span>
                </div>
                {/* Custom Chevron */}
                <ChevronDown className="w-5 h-5 text-brand-primary transition-transform duration-300 group-data-[state=open]:rotate-180 ml-2 flex-shrink-0" />
              </AccordionTrigger>
              <AccordionContent className="text-gray-700 text-sm sm:text-base pb-5 pl-11">
                <div className="border-l-2 border-brand-tertiary pl-4">
                  {faq.answer}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="text-center mt-12 opacity-0 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <a 
            href="/faq" 
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary/10 hover:bg-brand-primary hover:text-white text-brand-primary rounded-lg font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg group"
          >
            View Full FAQ Page
            <ChevronDown className="w-4 h-4 rotate-[-90deg] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
