'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users,
  Target,
  Shield,
  Award,
  CheckCircle2,
  ArrowRight,
  Brain,
  Presentation,
  Wrench,
  Umbrella,
  School
} from 'lucide-react';

const CORE_VALUES = [
  {
    title: 'Expertise',
    description: 'Fundiertes Fachwissen und langjährige Erfahrung im Bäderbetrieb.',
    icon: Award
  },
  {
    title: 'Qualität',
    description: 'Höchste Standards in allen Dienstleistungsbereichen.',
    icon: Shield
  },
  {
    title: 'Kundenorientierung',
    description: 'Maßgeschneiderte Lösungen für individuelle Anforderungen.',
    icon: Target
  },
  {
    title: 'Teamwork',
    description: 'Starke Partnerschaften für optimale Ergebnisse.',
    icon: Users
  }
];

const SERVICES = [
  {
    title: 'Coaching',
    description: 'Durch gezielte Fragen und Reflexionsübungen fördern wir die Selbstreflexion und persönliches Wachstum.',
    icon: Brain,
    href: '/coaching'
  },
  {
    title: 'Mentoring',
    description: 'Fundiertes Fachwissen und inspirierende Einblicke für Ihre Karriere und persönliche Entwicklung.',
    icon: Presentation,
    href: '/mentoring'
  },
  {
    title: 'Technische Betreuung',
    description: 'Professionelle technische Betreuung für optimalen und effizienten Betrieb.',
    icon: Wrench,
    href: '/technische-betreuung'
  },
  {
    title: 'Ein- und Auswinterung',
    description: 'Professionelle Vorbereitung und Pflege Ihrer Bäder für die jeweilige Saison.',
    icon: Umbrella,
    href: '/ein-auswinterung'
  },
  {
    title: 'Schwimmkurse',
    description: 'Hochwertiges Training für Vertrauen, Kompetenz und Sicherheit im Wasser.',
    icon: School,
    href: '/kurse/2026-2-12'
  }
];

const MILESTONES = [
  {
    year: '1992-1995',
    title: 'Beruflicher Start',
    description: 'Ausbildung zum Offsetdrucker - Grundstein für präzises Arbeiten und Qualitätsbewusstsein.'
  },
  {
    year: '1995-2000',
    title: 'Erste Schritte im Bäderbetrieb',
    description: 'Nebenberufliche Tätigkeit als Rettungsschwimmer, parallel Dienst als Zeitsoldat.'
  },
  {
    year: '2000-2010',
    title: 'Fachliche Spezialisierung',
    description: 'Ausbildung und Tätigkeit als Fachangestellter für Bäderbetriebe, Abschluss als Geprüfter technischer Betriebswirt IHK.'
  },
  {
    year: '2010-2023',
    title: 'Führungspositionen',
    description: 'Abteilungsleiter Therme/Reinigung Königstherme, anschließend Betriebsleiter Freibad Sunsplash.'
  }
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
            alt="About H2oHero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Bäder sind meine Leidenschaft
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Aufgewachsen in einer Familie, in der das Schwimmbad nicht nur ein Arbeitsplatz, sondern auch ein Zuhause war – 
              mein Vater als Schwimmmeister prägte meine Beziehung zu diesem Umfeld. Bereits im Alter von 14 Jahren begann ich, 
              Schwimmkurse zu geben, eine Tätigkeit, die bis heute meine Leidenschaft ist.
            </p>
            <p className="text-xl text-white/90 mb-8">
              Als ehemaliger Leistungsschwimmer entwickelte ich früh eine tiefe Verbundenheit zu diesem Bereich. 
              Mein fortwährendes Streben nach Wissen und Fortschritt motivierte mich, mich in sämtlichen Aspekten 
              rund um Schwimmbäder fortzubilden.
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#002b56] hover:bg-white/90"
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Meine Kernwerte
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Diese Werte prägen meine tägliche Arbeit und meinen Umgang mit Kunden
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {CORE_VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <Card key={value.title} className="p-8 bg-[#002b56]/5 border-none hover:bg-[#002b56]/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{value.title}</h3>
                  <p className="text-[#002b56]/70">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Milestones Section */}
      <section className="py-24 px-8 bg-[#002b56]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Mein beruflicher Werdegang
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Ein Rückblick auf meine wichtigsten Entwicklungsschritte und Erfahrungen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {MILESTONES.map((milestone) => (
              <div 
                key={milestone.year}
                className="bg-white/10 p-8 rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-[#00A3FF] text-3xl font-bold mb-4">
                  {milestone.year}
                </div>
                <h3 className="text-xl font-semibold text-white mb-2">
                  {milestone.title}
                </h3>
                <p className="text-white/80">
                  {milestone.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Meine Dienstleistungen
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Entdecken Sie mein umfassendes Leistungsangebot, geprägt von jahrelanger Erfahrung
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <Link key={service.title} href={service.href}>
                  <Card className="p-8 h-full bg-white hover:bg-[#002b56]/5 transition-colors border-[#002b56]/10 group">
                    <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6 group-hover:bg-[#002b56]/20 transition-colors">
                      <Icon className="w-6 h-6 text-[#002b56]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#002b56] mb-4">{service.title}</h3>
                    <p className="text-[#002b56]/70 mb-6">{service.description}</p>
                    <div className="flex items-center text-[#002b56] group-hover:text-[#002b56]/70">
                      <span>Mehr erfahren</span>
                      <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-2" />
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}