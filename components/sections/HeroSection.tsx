'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CARDS = [
  {
    id: '01',
    title: 'Spezialisiertes Team',
    description: 'Team mit Expertise und gezieltem Fachwissen.',
    image: 'https://images.unsplash.com/photo-1682687982501-1e58ab814714'
  },
  {
    id: '02',
    title: 'Individuallösungen',
    description: 'Maßgeschneiderte Lösungen für Ihre Anforderungen.',
    image: 'https://images.unsplash.com/photo-1571902943202-507ec2618e8f'
  },
  {
    id: '03',
    title: 'langjährige Erfahrung',
    description: 'Umfassende Fachkenntnisse aus langjähriger Tätigkeit.',
    image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5'
  }
];

export function HeroSection() {
  return (
    <section className="relative min-h-screen bg-[#0066CC] flex items-center overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
          alt="Diver"
          fill
          className="object-cover object-center"
          priority
          sizes="100vw"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#0066CC]/30 via-[#0066CC]/60 to-[#0066CC]"></div>
      </div>
      
      <div className="relative w-full pt-20 sm:pt-24 md:pt-32">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-32 items-center max-w-7xl mx-auto px-4 sm:px-8 md:px-16">
          <div>
            <div className="space-y-3 sm:space-y-4 md:space-y-6" suppressHydrationWarning>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-[1.1] sm:leading-[1.2]">
                Ihr Partner für Bäderbetriebsleistungen Gersthofen
              </h1>
              <div className="space-y-2 sm:space-y-3">
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
                Von Schwimmkurse über Einzelstunden bis hin zu Coaching, Mentoring
                </p>
                <p className="text-sm sm:text-base md:text-lg lg:text-xl text-white/90">
                Wir sind für Sie Deutschlandweit verfügbar
                </p>
                <div className="pt-6 sm:pt-8">
                  <Button 
                    size="lg"
                    className="bg-white text-[#002b56] hover:bg-white/90 text-sm sm:text-base"
                  >
                    Kontakt aufnehmen
                  </Button>
                </div>
              </div>
            </div>
          </div>
          
          <div className="hidden lg:block relative min-h-[400px]">
            <div className="absolute top-1/2 -translate-y-1/2 right-0 space-y-4 w-full max-w-[300px]">
              {CARDS.map((card) => (
                <div 
                  key={card.id}
                  className="bg-white/10 backdrop-blur-sm p-4 rounded-lg flex items-center gap-3 group hover:bg-white/20 transition-all duration-300 cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                    <Image
                      src={card.image}
                      alt={card.title}
                      width={40}
                      height={40}
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <div className="text-[10px] sm:text-xs text-white/60 mb-0.5">{card.id}</div>
                    <h3 className="text-xs sm:text-sm text-white font-medium mb-0.5">{card.title}</h3>
                    <p className="text-[10px] sm:text-xs text-white/80 leading-relaxed">
                      {card.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 sm:h-24 md:h-32 bg-gradient-to-t from-[#0066CC] to-transparent"></div>
    </section>
  );
}