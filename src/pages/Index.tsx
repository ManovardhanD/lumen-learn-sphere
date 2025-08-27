import React from 'react';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Features from '@/components/Features';
import Courses from '@/components/Courses';
import Testimonials from '@/components/Testimonials';
import Pricing from '@/components/Pricing';
import CTA from '@/components/CTA';
import Footer from '@/components/Footer';
import SmoothScroll from '@/components/SmoothScroll';

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <SmoothScroll />
      <Header />
      <main>
        <Hero />
        <Features />
        <Courses />
        <Testimonials />
        <Pricing />
        <CTA />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
