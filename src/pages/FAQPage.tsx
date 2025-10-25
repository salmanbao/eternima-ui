import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_FAQ_PAGE, ENABLE_FX_GRID, ENABLE_FX_PARTICLES } from "@/lib/featureFlags";
import { ChevronDown, Search, HelpCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
  category: string;
}

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const categories = [
    { id: "all", label: "All Questions" },
    { id: "general", label: "General" },
    { id: "privacy", label: "Privacy & Security" },
    { id: "products", label: "Products" },
    { id: "pricing", label: "Pricing & Billing" },
    { id: "inheritance", label: "Digital Inheritance" },
    { id: "technical", label: "Technical" }
  ];

  const faqs: FAQItem[] = [
    // General
    {
      category: "general",
      question: "What is Eternima?",
      answer: "Eternima is a private, verifiable digital life preservation platform. We help you capture, reflect on, and preserve your memories, voice, and knowledge using AI-powered tools—then pass them on to future generations with dignity and control."
    },
    {
      category: "general",
      question: "Who is Eternima for?",
      answer: "Eternima serves anyone who values their memories and wants to preserve their legacy: families documenting life stories, individuals with health concerns planning for the future, creators archiving their work, therapists tracking client progress (with consent), and heritage organizations preserving cultural knowledge."
    },
    {
      category: "general",
      question: "How is Eternima different from journaling apps or cloud storage?",
      answer: "Unlike simple note apps, Eternima uses ETI.AI™—reflective intelligence that learns how you think and speak. Unlike cloud storage, your data stays on your device or LuxVault Capsule™ (offline hardware). We're designed for long-term preservation and inheritance, not just temporary storage."
    },
    {
      category: "general",
      question: "Do I need special hardware to use Eternima?",
      answer: "No. The core app works on any device (iOS, Android, desktop). Optional hardware like LuxVault Capsule™ (offline vault) and Lumirec™ (wearable recorder) enhance privacy and convenience but aren't required."
    },

    // Privacy & Security
    {
      category: "privacy",
      question: "Where is my data stored?",
      answer: "Most data lives on your device or in your LuxVault Capsule™ (offline). Cloud backup is optional and always encrypted before upload. We use AES-256 encryption—the same standard used by governments and militaries. We never have access to your decryption keys."
    },
    {
      category: "privacy",
      question: "Can Eternima read my memories or voice recordings?",
      answer: "No. We use zero-knowledge encryption, meaning your data is encrypted on your device before it reaches our servers. Only you (and your designated inheritors, after proper verification) can decrypt it."
    },
    {
      category: "privacy",
      question: "What happens to my data if I cancel my subscription?",
      answer: "You keep full access to all downloaded data in your LuxVault Capsule™ or device. Cloud backups are retained for 90 days after cancellation, then permanently deleted. You can export everything before canceling."
    },
    {
      category: "privacy",
      question: "Is my data used to train AI models?",
      answer: "Never. Your personal data is not used to train public AI models. ETI.AI™ learns from your data locally, for your benefit alone. This is a core privacy principle—your memories stay yours."
    },
    {
      category: "privacy",
      question: "How do you protect against data breaches?",
      answer: "Multi-layered security: end-to-end encryption, biometric authentication, regular third-party audits, zero-knowledge architecture (we can't decrypt your data even if servers are compromised), and tamper-evident SoulNFT™ timestamps."
    },

    // Products
    {
      category: "products",
      question: "What is ETI.AI™?",
      answer: "ETI.AI™ (Eternal Intelligence) is our reflective AI system. It learns your speech patterns, values, and thought processes to help you reflect on memories, generate life summaries, and create voice-based continuity for loved ones. It runs locally on your device for privacy."
    },
    {
      category: "products",
      question: "What is LuxVault Capsule™?",
      answer: "LuxVault Capsule™ is an offline data vault—a physical hardware device that stores encrypted memories without internet access. It's tamper-evident, biometric-protected, and designed to last decades. Think of it as a digital time capsule for your life."
    },
    {
      category: "products",
      question: "What is Lumirec™?",
      answer: "Lumirec™ is a wearable voice recorder that captures daily conversations, thoughts, and moments hands-free. It syncs with the Eternima app and uses automatic speech recognition (ASR) to transcribe and organize recordings—perfect for busy lives."
    },
    {
      category: "products",
      question: "What is SoulNFT™?",
      answer: "SoulNFT™ is a verifiable digital identity token. It creates immutable proof-of-existence timestamps for your memories and allows secure, blockchain-based inheritance transfer. It's not a cryptocurrency—it's a continuity tool tied to your real-world identity."
    },
    {
      category: "products",
      question: "Can I use Eternima without buying hardware?",
      answer: "Yes! The core app (free or paid subscription) works on any device. Hardware like LuxVault™ and Lumirec™ are optional add-ons for enhanced privacy and convenience."
    },

    // Pricing & Billing
    {
      category: "pricing",
      question: "Is there a free plan?",
      answer: "Yes. The Free Reflection plan includes basic journaling, voice memos, and 5GB storage. Paid plans add ETI.AI™ reflections, unlimited storage, voice synthesis, and inheritance controls."
    },
    {
      category: "pricing",
      question: "What's the difference between Identity ($19/mo) and Eternal ($49/mo) plans?",
      answer: "Identity includes ETI.AI™ reflections, 100GB storage, and basic inheritance. Eternal adds unlimited storage, advanced voice synthesis, SoulNFT™ minting, priority support, and multi-key inheritance controls."
    },
    {
      category: "pricing",
      question: "Do you offer annual billing?",
      answer: "Yes! Annual plans save 20% compared to monthly. For example, Eternal costs $470/year (vs. $588/year if paid monthly)."
    },
    {
      category: "pricing",
      question: "Can I upgrade or downgrade my plan?",
      answer: "Absolutely. Upgrade anytime to unlock features. Downgrade at the end of your billing cycle—you'll keep data but lose premium features like ETI.AI™ and advanced inheritance."
    },
    {
      category: "pricing",
      question: "What payment methods do you accept?",
      answer: "Credit/debit cards (Visa, Mastercard, Amex), PayPal, and Apple/Google Pay. For enterprise plans, we accept bank transfers and purchase orders."
    },
    {
      category: "pricing",
      question: "Do you offer refunds?",
      answer: "Yes. 30-day money-back guarantee on subscriptions. Hardware (LuxVault™, Lumirec™) can be returned within 30 days if unused, minus shipping."
    },

    // Inheritance
    {
      category: "inheritance",
      question: "How does digital inheritance work?",
      answer: "Set up periodic check-ins (weekly, monthly, quarterly). If you don't respond after multiple attempts, a countdown begins. Your designated inheritors receive encrypted key fragments. Using Shamir's Secret Sharing, they combine keys (e.g., 2 of 3 people) to access your data."
    },
    {
      category: "inheritance",
      question: "Can I control what each inheritor receives?",
      answer: "Yes! Create collections (e.g., 'Family Memories,' 'Professional Archive') and assign granular permissions. Your daughter might get voice messages, while a colleague gets work reflections only."
    },
    {
      category: "inheritance",
      question: "What if I accidentally miss a check-in?",
      answer: "We send multiple reminders via email and app notifications. You can also set up a 'grace period' (e.g., 30 days) before the inheritance process begins."
    },
    {
      category: "inheritance",
      question: "Can I change inheritors later?",
      answer: "Absolutely. Update inheritors, key splits, and permissions anytime in your account settings."
    },
    {
      category: "inheritance",
      question: "What happens if an inheritor loses their key fragment?",
      answer: "With multi-key inheritance (e.g., 2 of 3 keys required), one lost key doesn't block access—other inheritors can still unlock your data together. You can also store a backup key in a secure location (safe deposit box, lawyer)."
    },

    // Technical
    {
      category: "technical",
      question: "What devices does Eternima work on?",
      answer: "iOS 14+, Android 10+, macOS, Windows, and Linux. Web app coming soon."
    },
    {
      category: "technical",
      question: "Does Eternima work offline?",
      answer: "Yes! Voice recording, journaling, and local ETI.AI™ processing work without internet. Cloud sync happens when you reconnect."
    },
    {
      category: "technical",
      question: "How much storage space do I need?",
      answer: "Plan depends on usage. Text entries use ~1KB each. Voice memos average 1-2MB per minute. Photos/videos vary. Free plan includes 5GB; paid plans offer 100GB to unlimited."
    },
    {
      category: "technical",
      question: "Can I export my data?",
      answer: "Yes! Export everything (memories, voice recordings, transcripts) as encrypted archives or plain text/audio files. You own your data—we'll never lock you in."
    },
    {
      category: "technical",
      question: "What voice formats does Eternima support?",
      answer: "We accept MP3, WAV, M4A, OGG, and FLAC. Lumirec™ records in high-quality AAC for optimal compression."
    },
    {
      category: "technical",
      question: "Is there an API for developers?",
      answer: "Yes! Enterprise plans include REST API access for integrations (EMR systems for healthcare, CMS platforms for creators). Public API coming in 2025."
    },
    {
      category: "technical",
      question: "How accurate is the voice transcription?",
      answer: "95%+ accuracy for clear speech in supported languages (English, Spanish, French, German, Mandarin, Japanese). Whisper ASR model runs locally for privacy."
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesCategory = activeCategory === "all" || faq.category === activeCategory;
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_FAQ_PAGE ? (
          <PageFX showGrid={ENABLE_FX_GRID} showHex={false} showParticles={ENABLE_FX_PARTICLES} intensity="low" showStreams={false} showScanline={false} showCursorTrail={false}>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
          <div className="section-container text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <HelpCircle className="w-8 h-8 text-white" />
            </div>
            <h1 className="section-title text-white mb-6">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
              Everything you need to know about Eternima—privacy, products, pricing, and digital inheritance.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl border border-brand-tertiary bg-white focus:outline-none focus:ring-2 focus:ring-brand-primary"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Filter */}
        <section className="py-8 bg-white border-b border-brand-tertiary">
          <div className="section-container">
            <div className="flex flex-wrap gap-3 justify-center">
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => setActiveCategory(category.id)}
                  className={`px-6 py-2 rounded-full font-medium transition-colors ${
                    activeCategory === category.id
                      ? "bg-brand-primary text-white"
                      : "bg-brand-tertiary/30 hover:bg-brand-tertiary/50"
                  }`}
                >
                  {category.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ List */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container max-w-4xl">
            {filteredFAQs.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-xl text-muted-foreground">
                  No questions found matching "{searchQuery}"
                </p>
                <button
                  onClick={() => {
                    setSearchQuery("");
                    setActiveCategory("all");
                  }}
                  className="mt-4 text-brand-primary hover:text-brand-primary/80 font-medium"
                >
                  Clear search and show all
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFAQs.map((faq, index) => (
                  <div
                    key={index}
                    className="bg-white rounded-2xl border border-brand-tertiary overflow-hidden hover:shadow-elegant transition-shadow"
                  >
                    <button
                      onClick={() => toggleFAQ(index)}
                      className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-brand-tertiary/10 transition-colors"
                    >
                      <span className="font-display font-bold text-lg pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={`w-5 h-5 text-brand-primary flex-shrink-0 transition-transform ${
                          openIndex === index ? "rotate-180" : ""
                        }`}
                      />
                    </button>
                    
                    {openIndex === index && (
                      <div className="px-6 pb-5 pt-2">
                        <p className="text-muted-foreground leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Results Count */}
            {filteredFAQs.length > 0 && (
              <p className="text-center mt-8 text-muted-foreground">
                Showing {filteredFAQs.length} of {faqs.length} questions
              </p>
            )}
          </div>
        </section>

        {/* Still Have Questions */}
        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Still Have Questions?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              Can't find what you're looking for? Our support team is here to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/contact"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-colors inline-block"
              >
                Contact Support
              </a>
              <a
                href="/privacy"
                className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-brand-primary text-brand-primary rounded-xl font-semibold transition-colors inline-block"
              >
                Read Privacy Policy
              </a>
            </div>
          </div>
        </section>
          </PageFX>
        ) : (
          <>
        {/* Hero Section - Fallback */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
          <div className="section-container text-center">
            <h1 className="section-title text-white mb-6">Frequently Asked Questions</h1>
          </div>
        </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default FAQPage;
