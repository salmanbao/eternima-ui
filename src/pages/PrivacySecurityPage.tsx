import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Shield, Lock, Key, FileCheck, Eye, HardDrive, UserCheck, Clock } from "lucide-react";

const PrivacySecurityPage = () => {
  const securityFeatures = [
    {
      icon: <Lock className="w-6 h-6" />,
      title: "End-to-End Encryption",
      description: "Your data is encrypted on your device before it ever reaches our servers. We use AES-256 encryption—the same standard used by governments and militaries."
    },
    {
      icon: <HardDrive className="w-6 h-6" />,
      title: "Local-First Architecture",
      description: "Most of your data lives on your device or in your LuxVault Capsule™. Cloud backups are optional, encrypted, and you control the keys."
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Zero-Knowledge Design",
      description: "We can't read your memories, voice recordings, or reflections. Only you and your designated inheritors can decrypt your data."
    },
    {
      icon: <UserCheck className="w-6 h-6" />,
      title: "Biometric Safeguards",
      description: "Multi-factor authentication with biometric verification (fingerprint, face ID) ensures only authorized access to your digital legacy."
    },
    {
      icon: <FileCheck className="w-6 h-6" />,
      title: "Tamper-Evident Storage",
      description: "SoulNFT™ technology creates immutable proof-of-existence timestamps. Any unauthorized changes to your data are immediately detectable."
    },
    {
      icon: <Eye className="w-6 h-6" />,
      title: "Transparency by Default",
      description: "Open-source encryption libraries, regular security audits, and clear documentation of how your data is handled."
    }
  ];

  const privacyPrinciples = [
    {
      title: "You Own Your Data",
      description: "Every memory, voice note, and reflection belongs to you—not us. Export, delete, or transfer it anytime."
    },
    {
      title: "No Ads, No Tracking",
      description: "We don't sell your data or show ads. Our business model is simple: you pay for the service, we protect your privacy."
    },
    {
      title: "Minimal Data Collection",
      description: "We collect only what's necessary to provide the service: email, account info, and usage analytics (anonymous and opt-out)."
    },
    {
      title: "Consent-Based AI Training",
      description: "Your personal data is never used to train public AI models. ETI.AI™ learns from your data locally, for your benefit alone."
    }
  ];

  const inheritanceFeatures = [
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Automated Verification",
      description: "Set up periodic check-ins (monthly, quarterly). If you don't respond, a secure countdown begins before inheritors are notified."
    },
    {
      icon: <Key className="w-6 h-6" />,
      title: "Multi-Key Inheritance",
      description: "Use Shamir's Secret Sharing to split decryption keys among trusted individuals. No single person can access your data alone."
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Granular Permissions",
      description: "Control what each inheritor receives: voice messages for family, professional archive for colleagues, selected memories for friends."
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="py-20 bg-gradient-to-b from-brand-secondary to-brand-secondary/80">
          <div className="section-container text-center">
            <div className="w-16 h-16 bg-brand-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Shield className="w-8 h-8 text-white" />
            </div>
            <h1 className="section-title text-white mb-6">
              Privacy & Security
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              Your memories are sacred. We've built Eternima on a foundation of 
              zero-knowledge encryption, local-first storage, and user-controlled inheritance.
            </p>
          </div>
        </section>

        {/* Core Security Features */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Military-Grade Protection
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              We use the same encryption standards trusted by governments and financial institutions 
              to protect your most personal data.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {securityFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-tertiary p-6 hover:shadow-elegant transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Privacy Principles */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Our Privacy Commitments
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              These aren't just policies—they're promises.
            </p>

            <div className="max-w-4xl mx-auto space-y-6">
              {privacyPrinciples.map((principle, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-tertiary p-8 hover:shadow-elegant transition-shadow"
                >
                  <h3 className="text-2xl font-display font-bold mb-3">
                    {principle.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed text-lg">
                    {principle.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Digital Inheritance Controls */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Control Your Digital Afterlife
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              Plan who inherits your memories, how they access them, and when—all on your terms.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
              {inheritanceFeatures.map((feature, index) => (
                <div
                  key={index}
                  className="bg-brand-tertiary/20 rounded-2xl border border-brand-tertiary p-6"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary flex items-center justify-center text-white mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-display font-bold mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>

            {/* Inheritance Use Case */}
            <div className="max-w-4xl mx-auto bg-brand-secondary text-white rounded-3xl p-8 sm:p-12">
              <h3 className="text-2xl font-display font-bold mb-4">
                How Inheritance Works: An Example
              </h3>
              <div className="space-y-4 text-white/90">
                <p className="leading-relaxed">
                  <span className="font-bold text-brand-primary">Sarah</span> sets up a 
                  90-day check-in. She splits her decryption key among three people: 
                  her daughter Emma (40%), her brother Tom (30%), and her best friend Lisa (30%).
                </p>
                <p className="leading-relaxed">
                  Each quarter, Sarah confirms she's okay via biometric login. If she doesn't respond 
                  after 3 failed attempts, Emma, Tom, and Lisa receive encrypted key fragments.
                </p>
                <p className="leading-relaxed">
                  <span className="font-bold">No single person can access her data alone.</span> Emma's 
                  40% + Tom's 30% = 70% of the key (threshold met). Together, they decrypt Sarah's 
                  LuxVault Capsule™ and access her voice messages, photos, and final reflections.
                </p>
                <p className="leading-relaxed">
                  Lisa receives access only to Sarah's "Friends" collection—memories Sarah specifically 
                  chose to share with her close circle.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Technical Specifications */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container">
            <h2 className="text-4xl font-display font-bold text-center mb-4">
              Technical Details
            </h2>
            <p className="text-xl text-muted-foreground text-center max-w-3xl mx-auto mb-16">
              For the security-conscious: here's exactly how we protect your data.
            </p>

            <div className="max-w-4xl mx-auto bg-white rounded-3xl border border-brand-tertiary p-8 sm:p-12">
              <div className="space-y-8">
                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-brand-primary" />
                    Encryption Standards
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• <span className="font-semibold">AES-256-GCM</span> for data at rest</li>
                    <li>• <span className="font-semibold">TLS 1.3</span> for data in transit</li>
                    <li>• <span className="font-semibold">RSA-4096</span> for key exchange</li>
                    <li>• <span className="font-semibold">PBKDF2</span> with 100,000 iterations for password hashing</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <HardDrive className="w-5 h-5 text-brand-primary" />
                    Data Storage
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Primary storage: Your device or LuxVault Capsule™ (offline)</li>
                    <li>• Optional cloud backup: Encrypted before upload (we never have the keys)</li>
                    <li>• Servers located in privacy-respecting jurisdictions (EU, Switzerland)</li>
                    <li>• Automatic data deletion 90 days after account cancellation (unless inherited)</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <FileCheck className="w-5 h-5 text-brand-primary" />
                    Compliance & Audits
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• <span className="font-semibold">GDPR</span> compliant (EU data protection)</li>
                    <li>• <span className="font-semibold">SOC 2 Type II</span> audited (in progress)</li>
                    <li>• <span className="font-semibold">Annual penetration testing</span> by third-party security firms</li>
                    <li>• <span className="font-semibold">Bug bounty program</span> for responsible disclosure</li>
                  </ul>
                </div>

                <div>
                  <h3 className="text-xl font-bold mb-3 flex items-center gap-2">
                    <Eye className="w-5 h-5 text-brand-primary" />
                    Open Source Components
                  </h3>
                  <ul className="space-y-2 text-muted-foreground ml-7">
                    <li>• Encryption libraries: <span className="font-mono text-sm">libsodium</span>, <span className="font-mono text-sm">OpenSSL</span></li>
                    <li>• Voice processing: <span className="font-mono text-sm">Whisper ASR</span> (runs locally)</li>
                    <li>• Security audit reports published annually</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-white">
          <div className="section-container text-center">
            <h2 className="text-4xl font-display font-bold mb-6">
              Questions About Privacy?
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto mb-8">
              We're transparent by design. Read our full privacy policy or contact 
              our security team with specific concerns.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/terms"
                className="px-8 py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-colors inline-block"
              >
                Read Full Privacy Policy
              </a>
              <a
                href="/contact"
                className="px-8 py-4 bg-white hover:bg-gray-50 border-2 border-brand-primary text-brand-primary rounded-xl font-semibold transition-colors inline-block"
              >
                Contact Security Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default PrivacySecurityPage;
