
import React from "react";

const Footer = () => {
  return (
    <footer className="w-full bg-gray-50 py-12 border-t border-pulse-200">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-pulse-600">Quick Links</h3>
            <ul className="space-y-2">
              <li><a href="#features" className="text-gray-600 hover:text-pulse-600 transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-gray-600 hover:text-pulse-600 transition-colors">How It Works</a></li>
              <li><a href="#products" className="text-gray-600 hover:text-pulse-600 transition-colors">Devices</a></li>
              <li><a href="#faq" className="text-gray-600 hover:text-pulse-600 transition-colors">FAQ</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-pulse-600">Products</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">ETI.AI™</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">LuxVault Capsule™</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Lumirec™</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">SoulNFT™</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-pulse-600">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Data Deletion Guide</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Inheritance Guide</a></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-display font-semibold text-lg mb-4 text-pulse-600">Contact</h3>
            <ul className="space-y-2">
              <li><a href="mailto:team@eternima.io" className="text-gray-600 hover:text-pulse-600 transition-colors">team@eternima.io</a></li>
              <li><a href="#" className="text-gray-600 hover:text-pulse-600 transition-colors">Partner with us</a></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-pulse-200 pt-8">
          <p className="text-center text-gray-600 text-sm">
            © 2024 Eternima. All rights reserved. Private by design — your data stays with you.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
