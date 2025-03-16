'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Brain, 
  Target, 
  Users, 
  Lightbulb,
  ArrowUpRight,
  Rocket,
  RefreshCcw,
  Shield,
  CheckCircle2,
  Presentation,
  Wrench,
  Umbrella,
  School,
  BookOpen
} from 'lucide-react';

const COACHING_BENEFITS = [
  {
    title: 'Zielgerichtete Unterstützung',
    description: 'Entwickeln Sie klare und realistische Ziele mit strukturierter Herangehensweise zur effizienten Zielerreichung.',
    icon: Target
  },
  {
    title: 'Potenzialentwicklung',
    description: 'Erkennen und entwickeln Sie Ihre individuellen Stärken und Fähigkeiten durch gezielte Übungen und Feedback.',
    icon: Rocket
  },
  {
    title: 'Lösungsorientierung',
    description: 'Fokussieren Sie sich auf konstruktive Lösungsansätze statt auf Probleme und bewältigen Sie Herausforderungen effektiv.',
    icon: Lightbulb
  },
  {
    title: 'Veränderungsmanagement',
    description: 'Meistern Sie berufliche und persönliche Veränderungen mit effektiven Strategien und professioneller Unterstützung.',
    icon: RefreshCcw
  }
];

const COACHING_AREAS = [
  {
    title: 'Selbstreflexion',
    description: 'Gezielte Fragen und Übungen fördern Ihre Selbstreflexion und helfen Ihnen, neue Perspektiven zu gewinnen.',
    icon: Brain
  },
  {
    title: 'Teamentwicklung',
    description: 'Stärken Sie die Zusammenarbeit und Kommunikation in Ihrem Team für bessere Ergebnisse.',
    icon: Users
  },
  {
    title: 'Vertraulichkeit',
    description: 'Ein geschützter Raum für offenen Austausch über Ihre Ziele, Ängste und Herausforderungen.',
    icon: Shield
  }
];

const SERVICES = [
  {
    title: 'Mentoring',
    description: 'Wir bieten nicht nur fundiertes Fachwissen, sondern auch inspirierende Einblicke und individuelle Strategien für Ihre Karriere.',
    icon: Presentation,
    href: '/mentoring'
  },
  {
    title: 'Technische Betreuung',
    description: 'Unsere betriebsrechnerische Betreuung optimiert Ihre Abläufe, senkt Kosten und minimiert Risiken.',
    icon: Wrench,
    href: '/technische-betreuung'
  },
  {
    title: 'Ein- und Auswinterung',
    description: 'Ihre öffentlichen Bäder verdienen die beste Pflege. Wir bereiten Ihr Bad optimal vor und pflegen es.',
    icon: Umbrella,
    href: '/ein-auswinterung'
  },
  {
    title: 'Schwimmkurse',
    description: 'Hochwertiges Training, das Vertrauen, Kompetenz und Sicherheit im Wasser für alle Teilnehmer fördert.',
    icon: School,
    href: '/kurse/2026-2-12'
  },
  {
    title: 'Aufsichtspersonal',
    description: 'Professionelles Personal für höchste Sicherheit und herausragende Schwimmerlebnisse.',
    icon: Users,
    href: '/aufsichtspersonal'
  }
];

export default function CoachingPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3"
            alt="Coaching"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Zielgerichtetes Coaching für persönliche und berufliche Entwicklung
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Erfolgsorientiertes Coaching für individuelle Entfaltung und strukturierte Unterstützung auf dem Weg zu persönlichem Wachstum.
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

      {/* Benefits Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Ihr Weg zur persönlichen Entwicklung
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Unser Coaching-Programm bietet Ihnen eine strukturierte und individuelle Herangehensweise zur Erreichung Ihrer Ziele.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {COACHING_BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="p-8 bg-[#002b56]/5 border-none hover:bg-[#002b56]/10 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{benefit.title}</h3>
                  <p className="text-[#002b56]/70">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 bg-[#002b56]">
        <div className="max-w-4xl mx-auto px-8">
          <div className="relative">
            <div className="absolute -top-6 -left-8 text-[120px] text-white/10">"</div>
            <blockquote className="relative z-10 text-xl text-white leading-relaxed">
              Als Coach bin ich überzeugt, dass Coaching eine transformative Reise ist, die Ihre Motivation steigert, Sie zur Neuausrichtung anregt und den klaren Fokus auf Ihre Ziele lenkt. Meine maßgeschneiderte Unterstützung konzentriert sich darauf, Ihre Persönlichkeit zu entwickeln, Ihre vorhandenen Fähigkeiten zu stärken und neue Fertigkeiten zu erlernen. Gemeinsam setzen wir klare und erreichbare Schritte, um die gewünschten Veränderungen in Ihrem Leben zu realisieren. Dieser Prozess soll Sie ermutigen, inspirieren und befähigen, Ihr volles Potenzial zu entfalten und Ihr Leben auf eine erfüllende Weise zu gestalten.
            </blockquote>
            <div className="mt-8 flex items-center gap-4">
              <div className="w-16 h-16 rounded-full overflow-hidden">
                <Image
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e"
                  alt="Ralf Großmann"
                  width={64}
                  height={64}
                  className="object-cover"
                />
              </div>
              <div>
                <p className="font-semibold text-white">Ralf Großmann</p>
                <p className="text-white/60">H2oHero - Geschäftsführer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Coaching Areas Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere Coaching-Schwerpunkte
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Profitieren Sie von unserem ganzheitlichen Coaching-Ansatz
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {COACHING_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <div key={area.title} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{area.title}</h3>
                  <p className="text-[#002b56]/70">{area.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              H2oHero – Coaching Gersthofen
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Weitere Dienstleistungen aus dem Hause H2oHero
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
                    <p className="text-[#002b56]/70">{service.description}</p>
                  </Card>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}