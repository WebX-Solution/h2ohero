'use client';

import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  BookOpen,
  Users,
  Target,
  LineChart,
  Brain,
  Presentation,
  Wrench,
  Umbrella,
  School,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Gauge,
  Settings
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Praxisorientiert',
    description: 'Direkt anwendbares Wissen für den Bäderbetrieb und technische Optimierung.',
    icon: Target
  },
  {
    title: 'Individualisiert',
    description: 'Maßgeschneiderte Inhalte für Ihre spezifischen Anforderungen und Ziele.',
    icon: Settings
  },
  {
    title: 'Expertenwissen',
    description: 'Fundierte Fachkenntnisse aus langjähriger praktischer Erfahrung.',
    icon: Brain
  },
  {
    title: 'Messbare Erfolge',
    description: 'Konkrete Verbesserungen durch praxisnahe Umsetzungsstrategien.',
    icon: LineChart
  }
];

const SEMINAR_TYPES = [
  {
    title: 'Fachvorträge',
    description: 'Spezialisierte Fachvorträge für die Schwimmbadbranche',
    features: [
      'Aktuelle Branchentrends',
      'Technische Innovationen',
      'Best-Practice-Beispiele',
      'Interaktive Diskussionen'
    ],
    icon: Presentation
  },
  {
    title: 'Workshops',
    description: 'Praxisorientierte Workshops für effektive Lösungen',
    features: [
      'Hands-on Übungen',
      'Fallstudienanalysen',
      'Gruppenarbeiten',
      'Erfahrungsaustausch'
    ],
    icon: Users
  },
  {
    title: 'Seminare',
    description: 'Intensive Seminare für vertiefte Fachkenntnisse',
    features: [
      'Umfassende Schulungen',
      'Praxisnahe Beispiele',
      'Individuelle Betreuung',
      'Zertifizierte Abschlüsse'
    ],
    icon: BookOpen
  }
];

const EXPERTISE_AREAS = [
  {
    title: 'Betriebsoptimierung',
    description: 'Strategien zur Verbesserung der Betriebsabläufe',
    icon: Gauge,
    points: [
      'Prozessanalyse und -optimierung',
      'Kostenmanagement',
      'Qualitätssicherung',
      'Effizienzsteigerung'
    ]
  },
  {
    title: 'Technische Kompetenz',
    description: 'Fundiertes technisches Know-how für Bäderanlagen',
    icon: Wrench,
    points: [
      'Anlagentechnik',
      'Wartungsoptimierung',
      'Energieeffizienz',
      'Störungsmanagement'
    ]
  },
  {
    title: 'Innovationsmanagement',
    description: 'Zukunftsorientierte Lösungen für moderne Bäderbetriebe',
    icon: Lightbulb,
    points: [
      'Digitalisierung',
      'Automatisierung',
      'Nachhaltige Technologien',
      'Trends und Entwicklungen'
    ]
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

export default function SeminarsPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1524178232363-1fb2b075b655"
            alt="Seminars and Lectures"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Maßgeschneiderte Vorträge und Seminare für optimierte Betriebsabläufe
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Profitieren Sie von unserem Expertenwissen für technische Kompetenz und effiziente Prozesse in öffentlichen Bädern und Unternehmen.
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
              Ihre Vorteile
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Profitieren Sie von unseren maßgeschneiderten Weiterbildungsangeboten
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit) => {
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
              Als Experte in Schwimmbädern biete ich speziell auf öffentliche Bäder und Unternehmen zugeschnittene Vorträge und Seminare an. Meine Veranstaltungen liefern praxisnahes Wissen und gezielte Fähigkeiten zur Optimierung von Betriebsabläufen und zur Stärkung der technischen Kompetenz in Badeeinrichtungen. Durch interaktive Lernmethoden und fundierte Inhalte werden Ihre Teams in die Lage versetzt, Herausforderungen zu meistern und innovative Lösungsansätze umzusetzen.
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

      {/* Seminar Types Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere Angebote
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Entdecken Sie unsere verschiedenen Veranstaltungsformate
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {SEMINAR_TYPES.map((type) => {
              const Icon = type.icon;
              return (
                <Card key={type.title} className="p-8 bg-white border-[#002b56]/10">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{type.title}</h3>
                  <p className="text-[#002b56]/70 mb-6">{type.description}</p>
                  <div className="space-y-3">
                    {type.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#002b56]" />
                        <span className="text-[#002b56]">{feature}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Expertise Areas Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere Themenschwerpunkte
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Profitieren Sie von unserem umfassenden Fachwissen
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {EXPERTISE_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <Card key={area.title} className="p-8 bg-[#002b56]/5 border-none">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{area.title}</h3>
                  <p className="text-[#002b56]/70 mb-6">{area.description}</p>
                  <div className="space-y-3">
                    {area.points.map((point, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="w-5 h-5 text-[#002b56]" />
                        <span className="text-[#002b56]">{point}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              H2oHero – Vorträge und Seminare
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
  );
}