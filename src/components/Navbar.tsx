
import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Menu, X, ChevronDown } from "lucide-react";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    // Prevent background scrolling when menu is open
    document.body.style.overflow = !isMenuOpen ? 'hidden' : '';
  };

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
    
    // Close mobile menu if open
    if (isMenuOpen) {
      setIsMenuOpen(false);
      document.body.style.overflow = '';
    }
  };

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 py-2 sm:py-3 md:py-4 transition-all duration-300",
        isScrolled 
          ? "bg-white/80 backdrop-blur-md shadow-sm" 
          : "bg-transparent"
      )}
    >
      <div className="container flex items-center justify-between px-4 sm:px-6 lg:px-8">
        <a 
          href="/" 
          className="flex items-center space-x-2"
          aria-label="Eternima"
        >
          <span className="text-2xl sm:text-3xl font-display font-bold text-gray-900 tracking-tight">
            Eternima
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <a href="/features" className="nav-link">Features</a>
          <a href="/pricing" className="nav-link">Pricing</a>
          
          {/* Company Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('company')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="nav-link flex items-center gap-1">
              Company <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === 'company' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-elegant border border-brand-tertiary py-2">
                <a href="/about" className="block px-4 py-2 hover:bg-brand-tertiary/20 transition-colors">About</a>
                <a href="/contact" className="block px-4 py-2 hover:bg-brand-tertiary/20 transition-colors">Contact</a>
              </div>
            )}
          </div>

          {/* Resources Dropdown */}
          <div 
            className="relative"
            onMouseEnter={() => setOpenDropdown('resources')}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            <button className="nav-link flex items-center gap-1">
              Resources <ChevronDown className="w-4 h-4" />
            </button>
            {openDropdown === 'resources' && (
              <div className="absolute top-full left-0 mt-2 w-48 bg-white rounded-xl shadow-elegant border border-brand-tertiary py-2">
                <a href="/faq" className="block px-4 py-2 hover:bg-brand-tertiary/20 transition-colors">FAQ</a>
                <a href="/privacy" className="block px-4 py-2 hover:bg-brand-tertiary/20 transition-colors">Privacy & Security</a>
              </div>
            )}
          </div>

          <a 
            href="/pricing" 
            className="px-6 py-2 bg-brand-primary hover:bg-brand-primary/90 text-white rounded-xl font-semibold transition-colors"
          >
            Get Started
          </a>
        </nav>

        {/* Mobile menu button - increased touch target */}
        <button 
          className="md:hidden text-gray-700 p-3 focus:outline-none" 
          onClick={toggleMenu}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation - improved for better touch experience */}
      <div className={cn(
        "fixed inset-0 z-40 bg-white flex flex-col pt-16 px-6 md:hidden transition-all duration-300 ease-in-out overflow-y-auto",
        isMenuOpen ? "opacity-100 translate-x-0" : "opacity-0 translate-x-full pointer-events-none"
      )}>
        <nav className="flex flex-col space-y-4 items-start mt-8 pb-8">
          <a 
            href="/features" 
            className="text-xl font-medium py-3 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Features
          </a>
          <a 
            href="/pricing" 
            className="text-xl font-medium py-3 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Pricing
          </a>

          <div className="w-full border-t border-brand-tertiary my-2"></div>

          <div className="text-sm font-bold text-muted-foreground px-4 pt-2">Company</div>
          <a 
            href="/about" 
            className="text-lg font-medium py-2 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            About
          </a>
          <a 
            href="/contact" 
            className="text-lg font-medium py-2 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Contact
          </a>

          <div className="w-full border-t border-brand-tertiary my-2"></div>

          <div className="text-sm font-bold text-muted-foreground px-4 pt-2">Resources</div>
          <a 
            href="/faq" 
            className="text-lg font-medium py-2 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            FAQ
          </a>
          <a 
            href="/privacy" 
            className="text-lg font-medium py-2 px-4 w-full rounded-lg hover:bg-brand-tertiary/20" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Privacy & Security
          </a>

          <div className="w-full border-t border-brand-tertiary my-2"></div>

          <a 
            href="/pricing" 
            className="text-xl font-bold py-4 px-6 w-full text-center rounded-xl bg-brand-primary text-white hover:bg-brand-primary/90 mt-4" 
            onClick={() => {
              setIsMenuOpen(false);
              document.body.style.overflow = '';
            }}
          >
            Get Started
          </a>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
