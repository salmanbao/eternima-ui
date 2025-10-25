import React, { useState } from "react";
import { HelpCircle } from "lucide-react";

interface GlossaryTermProps {
  term: string;
  definition: string;
  inline?: boolean;
  className?: string;
}

const GlossaryTerm: React.FC<GlossaryTermProps> = ({ 
  term, 
  definition, 
  inline = true,
  className = "" 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <span 
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <span className="inline-flex items-center gap-1 border-b border-dashed border-brand-primary cursor-help text-brand-primary font-medium">
        {term}
        <HelpCircle className="w-3 h-3 opacity-60" />
      </span>
      
      {isHovered && (
        <span 
          className="tooltip-enter absolute left-1/2 -translate-x-1/2 bottom-full mb-2 z-50 px-3 py-2 text-sm text-white bg-gray-900 rounded-lg shadow-lg w-64 pointer-events-none"
          style={{ 
            animation: 'tooltip-in 0.2s ease-out',
          }}
        >
          <span className="block">{definition}</span>
          <span 
            className="absolute top-full left-1/2 -translate-x-1/2 -mt-1 border-4 border-transparent border-t-gray-900"
            style={{ borderTopColor: '#1f2937' }}
          />
        </span>
      )}
    </span>
  );
};

// Predefined glossary entries for common Eternima terms
export const glossaryTerms = {
  "ETI.AI": "Eternima Temporal Intelligence - A reflective AI system that learns your patterns, values, and voice to create a personal digital mirror",
  "LuxVault Capsule": "Offline data vault hardware device that stores your memories locally with military-grade encryption, never touching the cloud",
  "Lumirec": "Wearable voice recorder designed for hands-free memory capture throughout your day",
  "SoulNFT": "Verifiable digital identity token that ensures continuity and authenticity of your digital legacy across generations",
  "AI": "Artificial Intelligence - Computer systems that can perform tasks requiring human-like intelligence such as learning and reasoning",
  "LLM": "Large Language Model - AI trained on vast text data to understand and generate human-like text",
  "RAG": "Retrieval-Augmented Generation - AI technique that combines information retrieval with text generation for more accurate responses",
  "LoRA": "Low-Rank Adaptation - Efficient method for fine-tuning AI models with your personal data without retraining the entire system",
  "ASR": "Automatic Speech Recognition - Technology that converts spoken words into text",
  "NFT": "Non-Fungible Token - Unique digital certificate of authenticity stored on blockchain",
  "RWA": "Real-World Asset - Physical or tangible asset represented digitally on blockchain",
};

// Convenience wrapper for quick glossary terms
export const G: React.FC<{ term: keyof typeof glossaryTerms; className?: string }> = ({ 
  term, 
  className 
}) => {
  return (
    <GlossaryTerm 
      term={term} 
      definition={glossaryTerms[term]} 
      className={className}
    />
  );
};

export default GlossaryTerm;
