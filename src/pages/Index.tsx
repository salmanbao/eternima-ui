
import React, { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ProductSpotlight from "@/components/ProductSpotlight";
import WhyEternima from "@/components/WhyEternima";
import PrivacySecurity from "@/components/PrivacySecurity";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Newsletter from "@/components/Newsletter";
import Footer from "@/components/Footer";
import BackToTop from "@/components/BackToTop";
import PageFX from "@/components/PageFX";
import { ENABLE_ANIME_GLOBAL, ENABLE_ANIME_INDEX_PAGE, ENABLE_FX_GRID, ENABLE_FX_PARTICLES, ENABLE_FX_STREAMS, ENABLE_FX_CURSORTRAIL } from "@/lib/featureFlags";

const Index = () => {
  // Initialize intersection observer to detect when elements enter viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );
    
    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));
    
    return () => {
      elements.forEach((el) => observer.unobserve(el));
    };
  }, []);

  useEffect(() => {
    // This helps ensure smooth scrolling for the anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href')?.substring(1);
        if (!targetId) return;
        
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        // Increased offset to account for mobile nav
        const offset = window.innerWidth < 768 ? 100 : 80;
        
        window.scrollTo({
          top: targetElement.offsetTop - offset,
          behavior: 'smooth'
        });
      });
    });
  }, []);

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="space-y-4 sm:space-y-8">
        {ENABLE_ANIME_GLOBAL && ENABLE_ANIME_INDEX_PAGE ? (
          <PageFX 
            showGrid={ENABLE_FX_GRID}
            showHex={false}
            showParticles={ENABLE_FX_PARTICLES}
            intensity="med"
            showStreams={ENABLE_FX_STREAMS}
            showScanline={false}
            showCursorTrail={ENABLE_FX_CURSORTRAIL}
          >
            <Hero />
            <Features />
            <HowItWorks />
            <ProductSpotlight />
            <WhyEternima />
            <PrivacySecurity />
            <Testimonials />
            <FAQ />
            <Newsletter />
          </PageFX>
        ) : (
          <>
            <Hero />
            <Features />
            <HowItWorks />
            <ProductSpotlight />
            <WhyEternima />
            <PrivacySecurity />
            <Testimonials />
            <FAQ />
            <Newsletter />
          </>
        )}
      </main>
      <Footer />
      <BackToTop />
    </div>
  );
};

export default Index;
