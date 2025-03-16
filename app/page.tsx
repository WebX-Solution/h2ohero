'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { HeroSection } from '@/components/sections/HeroSection';
import { ExperienceSection } from '@/components/sections/ExperienceSection';
import { ServicesSection } from '@/components/sections/DivingTypesSection';
import { SwimmingCoursesSection } from '@/components/sections/LocationsSection';
import { WhyChooseUsSection } from '@/components/sections/WhyChooseUsSection';
import FAQSection from '@/components/sections/FAQSection';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      <main>
        <HeroSection />
        <ExperienceSection />
        <ServicesSection />
        <SwimmingCoursesSection />
        <WhyChooseUsSection />
        <FAQSection />
      </main>
      <Footer />
    </div>
  );
}