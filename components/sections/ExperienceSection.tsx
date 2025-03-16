'use client';

import Image from 'next/image';
import { Button } from '@/components/ui/button';

export function ExperienceSection() {
  return (
    <section className="relative py-16 sm:py-24 md:py-32 px-4 sm:px-8 md:px-16 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="relative flex flex-col md:flex-row justify-between items-start md:items-center mb-8 sm:mb-12 md:mb-16" suppressHydrationWarning>
          <div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4 text-[#002b56] leading-tight">
              Innovative Lösungen für individuelle Bedürfnisse
            </h2>
            <p className="text-[#002b56]/80 text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed">
              Wir sind bestrebt, innovative Lösungen anzubieten, die den individuellen Anforderungen 
              unserer Kunden gerecht werden und ihre Betriebe auf ein neues Niveau heben.
            </p>
          </div>
          <div className="mt-6 md:mt-0 md:ml-8">
            <div className="border-2 border-[#002b56] rounded-full px-8 sm:px-12 md:px-16 py-3 sm:py-4 whitespace-nowrap">
              <span className="text-[#002b56] text-base sm:text-lg md:text-xl font-medium">10+ Jahre</span>
            </div>
          </div>
        </div>
        
        <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 md:gap-12 mb-8 sm:mb-12">
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl">
            <Image
              src="/Aufsichtspersonal.png"
              alt="Schwimmbadaufsicht Gersthofen"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002b56]/60 via-[#002b56]/20 to-transparent"></div>
          </div>
          <div className="relative h-[300px] sm:h-[400px] md:h-[500px] rounded-2xl overflow-hidden group transform hover:-translate-y-2 transition-all duration-500 shadow-md hover:shadow-xl">
            <Image
              src="/Schwimmkurse.png"
              alt="Schwimmkurse"
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#002b56]/60 via-[#002b56]/20 to-transparent"></div>
          </div>
        </div>
        <div className="flex justify-center mt-8 sm:mt-12">
          <Button 
            className="relative bg-[#002b56] text-white hover:bg-[#002b56]/90 transition-all duration-300 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-4 sm:py-6 hover:scale-105"
          >
            Erfahre mehr
          </Button>
        </div>
      </div>
    </section>
  );
}