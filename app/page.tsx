import React from 'react';
import { Herosection, Statsection, Features, Testimonial, Ctasection } from '@/components/sections';
import Navbar from '@/components/ui/Navbar';
import Footer from '@/components/ui/Footer';

export default function Home() {
  return (
    <main>
      <Navbar />
      <Herosection />
      <Statsection />
      <Features />
      <Testimonial />
      <Ctasection />
      <Footer />
    </main>
  );
}

