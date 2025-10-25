
import React from "react";
import { Twitter, Linkedin, Github, Mail, Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="w-full bg-gradient-to-b from-white to-brand-tertiary/30 py-12 border-t border-brand-tertiary">
      <div className="section-container">
        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary group">
              Quick Links
              <span className="block h-0.5 bg-brand-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "Features", href: "/features" },
                { label: "Pricing", href: "/pricing" },
                { label: "About", href: "/about" },
                { label: "Contact", href: "/contact" }
              ].map((link, index) => (
                <li key={`${link.href}-${link.label}`} className="animate-fade-in-left" style={{ animationDelay: `${0.2 + index * 0.05}s` }}>
                  <a 
                    href={link.href} 
                    className="group relative inline-block text-gray-600 hover:text-brand-primary transition-colors duration-300"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.15s' }}>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary group">
              Products
              <span className="block h-0.5 bg-brand-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "ETI.AI™", href: "/features#eti-ai" },
                { label: "LuxVault Capsule™", href: "/features#luxvault" },
                { label: "Lumirec™", href: "/features#lumirec" },
                { label: "SoulNFT™", href: "/features#soulnft" }
              ].map((link, index) => (
                <li key={`${link.href}-${link.label}`} className="animate-fade-in-left" style={{ animationDelay: `${0.25 + index * 0.05}s` }}>
                  <a 
                    href={link.href} 
                    className="group relative inline-block text-gray-600 hover:text-brand-primary transition-colors duration-300"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary group">
              Resources
              <span className="block h-0.5 bg-brand-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </h3>
            <ul className="space-y-3">
              {[
                { label: "FAQ", href: "/faq" },
                { label: "Privacy & Security", href: "/privacy" },
                { label: "Terms of Service", href: "#" },
                { label: "Data Deletion", href: "#" }
              ].map((link, index) => (
                <li key={`${link.href}-${link.label}`} className="animate-fade-in-left" style={{ animationDelay: `${0.3 + index * 0.05}s` }}>
                  <a 
                    href={link.href} 
                    className="group relative inline-block text-gray-600 hover:text-brand-primary transition-colors duration-300"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
          </div>
          
          <div className="animate-fade-in" style={{ animationDelay: '0.25s' }}>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary group">
              Contact
              <span className="block h-0.5 bg-brand-primary transform origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"></span>
            </h3>
            <ul className="space-y-3 mb-6">
              {[
                { label: "team@eternima.io", href: "mailto:team@eternima.io" },
                { label: "support@eternima.io", href: "mailto:support@eternima.io" },
                { label: "Partnerships", href: "mailto:partners@eternima.io" },
                { label: "Press & Media", href: "mailto:press@eternima.io" }
              ].map((link, index) => (
                <li key={`${link.href}-${link.label}`} className="animate-fade-in-left" style={{ animationDelay: `${0.35 + index * 0.05}s` }}>
                  <a 
                    href={link.href} 
                    className="group relative inline-block text-gray-600 hover:text-brand-primary transition-colors duration-300"
                  >
                    <span className="relative z-10">{link.label}</span>
                    <span className="absolute left-0 bottom-0 w-0 h-0.5 bg-brand-primary group-hover:w-full transition-all duration-300"></span>
                  </a>
                </li>
              ))}
            </ul>
            
            {/* Social Icons */}
            <div className="flex space-x-4 animate-fade-in" style={{ animationDelay: '0.5s' }}>
              {[
                { Icon: Twitter, href: "https://twitter.com/eternima", label: "Twitter" },
                { Icon: Linkedin, href: "https://linkedin.com/company/eternima", label: "LinkedIn" },
                { Icon: Github, href: "https://github.com/eternima", label: "GitHub" },
                { Icon: Mail, href: "mailto:team@eternima.io", label: "Email" }
              ].map(({ Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target={href.startsWith('http') ? '_blank' : undefined}
                  rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  aria-label={label}
                  className="group relative w-10 h-10 rounded-full border-2 border-brand-tertiary hover:border-brand-primary bg-white hover:bg-brand-primary flex items-center justify-center transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand-primary/30"
                >
                  <Icon className="w-5 h-5 text-gray-600 group-hover:text-white transition-colors duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
        
        {/* Bottom Copyright Section */}
        <div className="border-t border-brand-tertiary pt-8 animate-fade-in" style={{ animationDelay: '0.6s' }}>
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-center md:text-left text-gray-600 text-sm">
              © 2024 Eternima. All rights reserved. Private by design — your data stays with you.
            </p>
            <p className="flex items-center gap-2 text-sm text-gray-600">
              Made with <Heart className="w-4 h-4 text-red-500 animate-pulse" /> for humanity
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
