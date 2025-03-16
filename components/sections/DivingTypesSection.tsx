'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Presentation, Brain, Wrench, Umbrella, School, Users, BookOpen, ArrowRight } from 'lucide-react';

const SERVICES = [
  {
    title: 'Mentoring',
    description: 'Individuelle Begleitung und Unterstützung für Ihre berufliche Entwicklung',
    icon: Brain,
    image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80',
    href: '/mentoring'
  },
  {
    title: 'Coaching',
    description: 'Professionelle Beratung zur Optimierung Ihrer Leistung',
    icon: Presentation,
    image: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=800&q=80',
    href: '/coaching'
  },
  {
    title: 'Technische Bäderbetreuung Gersthofen',
    description: 'Umfassende technische Wartung und Betreuung Ihrer Bäderanlage',
    icon: Wrench,
    image: '/Technische-Betreuung.png',
    href: '/technische-betreuung'
  },
  {
    title: 'Ein- und Auswinterung',
    description: 'Professionelle Saisonvorbereitung und -abschluss für öffentliche Schwimmbäder',
    icon: Umbrella,
    image: '/auswinterung.avif',
    href: '/ein-auswinterung'
  },
  {
    title: 'Schwimmkurse Gersthofen',
    description: 'Qualifizierte Schwimmausbildung für alle Altersgruppen',
    icon: School,
    image: '/Schwimmkurse.png',
    href: '/kurse/2026-2-12'
  },
  {
    title: 'Aufsichtspersonal für Schwimmbäder',
    description: 'Geschultes Personal für die sichere Betreuung Ihrer Badeeinrichtung',
    icon: Users,
    image: '/Aufsichtspersonal_Schwimmbad.avif',
    href: '/aufsichtspersonal'
  },
  {
    title: 'Vorträge und Seminare',
    description: 'Informative Veranstaltungen zu verschiedenen Aspekten des Bäderbetriebs',
    icon: BookOpen,
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=800&q=80',
    href: '/vortraege-seminare'
  }
];

export function ServicesSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-[#002b56]">Unsere Dienstleistungen</h2>
        <p className="text-[#002b56]/80 text-center mb-12 max-w-3xl mx-auto">
          Professionelle Lösungen für Ihren Bäderbetrieb - von technischer Betreuung bis hin zu Schulungen
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {SERVICES.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                key={index}
                href={service.href}
                className="block bg-[#002b56] rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 card-hover-effect text-white group cursor-pointer"
              >
                <div className="relative h-48">
                  <Image
                    src={service.image}
                    alt={service.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#003366] to-transparent" />
                </div>
                
                <div className="p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-xl font-semibold text-white">{service.title}</h3>
                  </div>
                  
                  <p className="text-white/80 leading-relaxed">
                    {service.description}
                  </p>
                  <div className="mt-6 pt-4 border-t border-white/5 flex items-center">
                    <span className="text-white font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all opacity-80 group-hover:opacity-100">
                      Mehr erfahren
                      <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}