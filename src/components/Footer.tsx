
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-12 border-t border-brand-tertiary">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="/features" className="text-gray-600 hover:text-brand-primary transition-colors">Features</a></li>
              <li><a href="/pricing" className="text-gray-600 hover:text-brand-primary transition-colors">Pricing</a></li>
              <li><a href="/about" className="text-gray-600 hover:text-brand-primary transition-colors">About</a></li>
              <li><a href="/contact" className="text-gray-600 hover:text-brand-primary transition-colors">Contact</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary">Products</h3>
            <ul className="space-y-2">
              <li><a href="/features#eti-ai" className="text-gray-600 hover:text-brand-primary transition-colors">ETI.AI™</a></li>
              <li><a href="/features#luxvault" className="text-gray-600 hover:text-brand-primary transition-colors">LuxVault Capsule™</a></li>
              <li><a href="/features#lumirec" className="text-gray-600 hover:text-brand-primary transition-colors">Lumirec™</a></li>
              <li><a href="/features#soulnft" className="text-gray-600 hover:text-brand-primary transition-colors">SoulNFT™</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary">Resources</h3>
            <ul className="space-y-2">
              <li><a href="/faq" className="text-gray-600 hover:text-brand-primary transition-colors">FAQ</a></li>
              <li><a href="/privacy" className="text-gray-600 hover:text-brand-primary transition-colors">Privacy & Security</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-brand-primary transition-colors">Data Deletion</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-brand-primary">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:team@eternima.io" className="text-gray-600 hover:text-brand-primary transition-colors">team@eternima.io</a></li>
              <li><a href="mailto:support@eternima.io" className="text-gray-600 hover:text-brand-primary transition-colors">support@eternima.io</a></li>
              <li><a href="mailto:partners@eternima.io" className="text-gray-600 hover:text-brand-primary transition-colors">Partnerships</a></li>
              <li><a href="mailto:press@eternima.io" className="text-gray-600 hover:text-brand-primary transition-colors">Press & Media</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-brand-tertiary pt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Eternima. All rights reserved. Private by design — your data stays with you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
