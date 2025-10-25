import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Shield, Users, Target } from "lucide-react";

const AboutPage = () => {
  const values = [
    {
      icon: <Heart className="w-8 h-8" />,
      title: "Dignity First",
      description: "We believe every life story deserves to be preserved with dignity, truth, and compassion."
    },
    {
      icon: <Shield className="w-8 h-8" />,
      title: "Privacy by Design",
      description: "Your data is yours. We build systems where you maintain complete control and ownership."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Human-Centered AI",
      description: "Technology should serve humanity, not replace it. Our AI amplifies human memory, not artificial content."
    },
    {
      icon: <Target className="w-8 h-8" />,
      title: "Long-Term Thinking",
      description: "We're building for generations, not quarters. Sustainability and continuity guide every decision."
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
              Preserve Truth with Dignity
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're building a future where your life's story, voice, and wisdom live on—
              not as content for platforms, but as verifiable, private legacy for the people you love.
            </p>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20 bg-white">
          <div className="section-container max-w-4xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
                Our Mission
              </h2>
              <p className="text-lg text-muted-foreground leading-relaxed">
                Eternima exists to help people capture, understand, and preserve their life experiences 
                in a way that's <strong>private, verifiable, and truly their own</strong>. We believe the 
                most important stories in life shouldn't be lost to time, platforms, or corporate control.
              </p>
            </div>

            <div className="prose prose-lg max-w-none">
              <p className="text-muted-foreground mb-6">
                In an age where our digital lives are scattered across platforms we don't control, 
                and where AI can fabricate voices and memories, we're creating something different: 
                a <strong>truthful, private reflection system</strong> that helps you understand yourself 
                better today and preserve what matters for tomorrow.
              </p>

              <p className="text-muted-foreground">
                Whether you're capturing daily thoughts for self-reflection, preserving family stories 
                for future generations, or creating a verifiable archive for legal or therapeutic purposes—
                Eternima puts you in control.
              </p>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-display font-bold mb-4">
                What Guides Us
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Four principles shape every decision we make
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {values.map((value, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-tertiary p-8 hover:shadow-elegant transition-shadow"
                >
                  <div className="w-16 h-16 rounded-2xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {value.title}
                  </h3>
                  <p className="text-muted-foreground">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-white">
          <div className="section-container max-w-4xl">
            <h2 className="text-3xl font-display font-bold mb-8 text-center">
              Why We Started
            </h2>
            
            <div className="prose prose-lg max-w-none text-muted-foreground space-y-6">
              <p>
                Eternima was born from a simple realization: <strong>most of us will be forgotten</strong>, 
                not because our lives weren't meaningful, but because our stories, voices, and wisdom 
                get lost in the noise of digital platforms or buried in devices no one can access.
              </p>

              <p>
                We watched loved ones pass away, leaving behind fragmented digital traces—photos on old phones, 
                voice messages that disappeared with expired accounts, memories scattered across platforms that 
                no longer exist or had changed their terms of service.
              </p>

              <p>
                At the same time, we saw the rise of powerful AI that could clone voices and generate text 
                so realistic it became hard to tell what was real and what was synthetic. This created a paradox: 
                technology that could preserve memory was the same technology that could fabricate it.
              </p>

              <p>
                <strong>We decided to build something different.</strong> A system where:
              </p>

              <ul className="space-y-2">
                <li>Your data stays private and under your control</li>
                <li>Everything is verifiable and tamper-evident</li>
                <li>AI serves memory, not invention</li>
                <li>You decide who gets access, when, and how</li>
              </ul>

              <p>
                Eternima isn't about creating synthetic versions of ourselves for platforms to monetize. 
                It's about <strong>preserving truth</strong>—the messy, human, authentic truth of who we are.
              </p>
            </div>
          </div>
        </section>

        {/* Team Section (Optional - can be removed or kept minimal) */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container max-w-4xl text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Building for Humanity
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              We're a small team of engineers, psychologists, and privacy advocates 
              building technology that respects human dignity. We're hiring mission-driven 
              people who believe memory and legacy shouldn't be controlled by platforms.
            </p>
            <a 
              href="/contact"
              className="inline-block px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-colors"
            >
              Join Our Mission
            </a>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-3xl sm:text-4xl font-display font-bold mb-6">
              Start Preserving Your Story
            </h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join thousands of families, creators, and organizations preserving what matters most.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="/pricing"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-lg font-semibold transition-colors"
              >
                Get Started Free
              </a>
              <a 
                href="/contact"
                className="px-8 py-4 border-2 border-brand-primary text-brand-primary hover:bg-brand-primary/10 rounded-lg font-semibold transition-colors"
              >
                Talk to Our Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default AboutPage;
