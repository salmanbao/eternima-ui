import React, { useState } from "react";
import { toast } from "@/components/ui/use-toast";
import { Mail, CheckCircle2, Sparkles } from "lucide-react";
import Confetti from "./Confetti";

const Newsletter = () => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      toast({
        title: "Please enter your email address",
        variant: "destructive"
      });
      return;
    }
    setIsSubmitting(true);

    // Simulate API call
    setTimeout(() => {
      setIsSuccess(true);
      setShowConfetti(true);
      toast({
        title: "Thank you for subscribing!",
        description: "You'll receive updates about Eternima soon."
      });
      
      // Reset after showing success animation
      setTimeout(() => {
        setEmail("");
        setIsSubmitting(false);
        setIsSuccess(false);
        setShowConfetti(false);
      }, 3000);
    }, 1000);
  };

  return (
    <section id="newsletter" className="bg-gradient-to-b from-brand-tertiary/10 to-white py-12 sm:py-20">
      <Confetti active={showConfetti} duration={3000} particleCount={60} />
      <div className="section-container">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center gap-4 mb-6 opacity-0 animate-fade-in">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-brand-primary/10 border border-brand-primary/20">
              <Mail className="w-5 h-5 text-brand-primary mr-2 animate-float" />
              <span className="text-brand-secondary font-medium">Newsletter</span>
            </div>
          </div>
          
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-display font-bold mb-4 text-left opacity-0 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            Subscribe to the newsletter
          </h2>
          <p className="text-lg sm:text-xl text-gray-700 mb-10 text-left opacity-0 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Be first to hear about breakthroughs, partnerships, and deployment opportunities
          </p>
          
          {isSuccess ? (
            <div className="flex flex-col items-center justify-center py-12 animate-scale-in-bounce">
              <div className="relative">
                <CheckCircle2 className="w-20 h-20 text-green-500 mb-4" />
                <Sparkles className="w-6 h-6 text-brand-primary absolute -top-2 -right-2 animate-ping" />
                <Sparkles className="w-6 h-6 text-brand-primary absolute -bottom-2 -left-2 animate-ping" style={{ animationDelay: '0.2s' }} />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Successfully Subscribed!</h3>
              <p className="text-gray-600">Check your inbox for confirmation</p>
            </div>
          ) : (
            <form 
              onSubmit={handleSubmit} 
              className="flex flex-col md:flex-row gap-4 items-start md:items-center opacity-0 animate-fade-in"
              style={{ animationDelay: '0.3s' }}
            >
              <div className="relative flex-grow w-full">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-r from-brand-primary to-brand-secondary opacity-0 blur-xl transition-opacity duration-300 ${isFocused ? 'opacity-20' : ''}`}></div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setIsFocused(true)}
                  onBlur={() => setIsFocused(false)}
                  placeholder="Enter your email address"
                  className={`relative w-full px-6 py-4 rounded-full border-2 transition-all duration-300 text-gray-700 ${
                    isFocused 
                      ? 'border-brand-primary shadow-lg ring-4 ring-brand-primary/20' 
                      : 'border-brand-tertiary hover:border-brand-primary/50'
                  }`}
                  required
                />
                <Mail className={`absolute right-6 top-1/2 -translate-y-1/2 w-5 h-5 transition-colors duration-300 ${
                  isFocused ? 'text-brand-primary' : 'text-gray-400'
                }`} />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-brand-primary hover:bg-brand-primary/90 text-white font-semibold py-4 px-10 rounded-full transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 md:ml-4 w-full md:w-auto relative overflow-hidden group"
              >
                <span className={`inline-flex items-center gap-2 ${isSubmitting ? 'opacity-0' : 'opacity-100'} transition-opacity`}>
                  Submit
                </span>
                {isSubmitting && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  </div>
                )}
                {/* Shimmer effect on hover */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
              </button>
            </form>
          )}

          {/* Privacy note */}
          <p className="text-sm text-gray-500 mt-6 text-center opacity-0 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            We respect your privacy. Unsubscribe at any time.
          </p>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;