import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, MessageSquare, Building2, HelpCircle } from "lucide-react";

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    category: "general",
    message: ""
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: "",
        email: "",
        subject: "",
        category: "general",
        message: ""
      });
    }, 1000);
  };

  const contactMethods = [
    {
      icon: <Mail className="w-6 h-6" />,
      title: "General Inquiries",
      description: "Questions about our platform",
      contact: "team@eternima.io"
    },
    {
      icon: <HelpCircle className="w-6 h-6" />,
      title: "Support",
      description: "Technical help and account issues",
      contact: "support@eternima.io"
    },
    {
      icon: <Building2 className="w-6 h-6" />,
      title: "Partnerships",
      description: "Collaborate with Eternima",
      contact: "partners@eternima.io"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Press & Media",
      description: "Media inquiries and press kit",
      contact: "press@eternima.io"
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
              Get in Touch
            </h1>
            <p className="text-xl text-white/90 max-w-3xl mx-auto">
              We're here to help. Whether you have questions about our platform, need support, 
              or want to explore partnerships—reach out.
            </p>
          </div>
        </section>

        {/* Contact Methods */}
        <section className="py-20 bg-white">
          <div className="section-container">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              {contactMethods.map((method, index) => (
                <div
                  key={index}
                  className="bg-white rounded-2xl border border-brand-tertiary p-6 hover:shadow-elegant transition-shadow"
                >
                  <div className="w-12 h-12 rounded-xl bg-brand-primary/10 flex items-center justify-center text-brand-primary mb-4">
                    {method.icon}
                  </div>
                  <h3 className="text-lg font-display font-bold mb-2">
                    {method.title}
                  </h3>
                  <p className="text-sm text-muted-foreground mb-3">
                    {method.description}
                  </p>
                  <a 
                    href={`mailto:${method.contact}`}
                    className="text-brand-primary hover:text-brand-primary/80 font-medium text-sm"
                  >
                    {method.contact}
                  </a>
                </div>
              ))}
            </div>

            {/* Contact Form */}
            <div className="max-w-3xl mx-auto">
              <div className="bg-brand-tertiary/20 rounded-3xl border border-brand-tertiary p-8 sm:p-12">
                <h2 className="text-3xl font-display font-bold mb-2 text-center">
                  Send Us a Message
                </h2>
                <p className="text-muted-foreground text-center mb-8">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>

                {submitted ? (
                  <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center">
                    <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <svg className="w-8 h-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Message Sent!</h3>
                    <p className="text-green-700">
                      Thank you for reaching out. We'll respond to your inquiry shortly.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-medium mb-2">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          id="name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-brand-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          placeholder="John Doe"
                        />
                      </div>

                      <div>
                        <label htmlFor="email" className="block text-sm font-medium mb-2">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                          required
                          className="w-full px-4 py-3 rounded-xl border border-brand-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                          placeholder="john@example.com"
                        />
                      </div>
                    </div>

                    <div>
                      <label htmlFor="category" className="block text-sm font-medium mb-2">
                        Category *
                      </label>
                      <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                      >
                        <option value="general">General Inquiry</option>
                        <option value="support">Technical Support</option>
                        <option value="partnerships">Partnership</option>
                        <option value="press">Press & Media</option>
                        <option value="feedback">Feedback</option>
                      </select>
                    </div>

                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium mb-2">
                        Subject *
                      </label>
                      <input
                        type="text"
                        id="subject"
                        name="subject"
                        value={formData.subject}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 rounded-xl border border-brand-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent"
                        placeholder="How can we help?"
                      />
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium mb-2">
                        Message *
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        required
                        rows={6}
                        className="w-full px-4 py-3 rounded-xl border border-brand-tertiary focus:outline-none focus:ring-2 focus:ring-brand-primary focus:border-transparent resize-none"
                        placeholder="Tell us more about your inquiry..."
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full py-4 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </button>

                    <p className="text-xs text-muted-foreground text-center">
                      By submitting this form, you agree to our privacy policy and terms of service.
                    </p>
                  </form>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* Additional Info */}
        <section className="py-20 bg-brand-tertiary/20">
          <div className="section-container max-w-4xl text-center">
            <h2 className="text-3xl font-display font-bold mb-6">
              Looking for Something Else?
            </h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <a 
                href="/faq"
                className="bg-white rounded-2xl border border-brand-tertiary p-6 hover:shadow-elegant transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">Visit FAQ</h3>
                <p className="text-sm text-muted-foreground">
                  Common questions answered
                </p>
              </a>

              <a 
                href="/privacy"
                className="bg-white rounded-2xl border border-brand-tertiary p-6 hover:shadow-elegant transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">Privacy & Security</h3>
                <p className="text-sm text-muted-foreground">
                  Learn how we protect your data
                </p>
              </a>

              <a 
                href="/features"
                className="bg-white rounded-2xl border border-brand-tertiary p-6 hover:shadow-elegant transition-shadow"
              >
                <h3 className="text-lg font-bold mb-2">Product Features</h3>
                <p className="text-sm text-muted-foreground">
                  Explore what we offer
                </p>
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default ContactPage;
