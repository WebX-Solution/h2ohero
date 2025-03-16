'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Users,
  Shield,
  LineChart,
  Target,
  Brain,
  Presentation,
  Wrench,
  Umbrella,
  School,
  ArrowRight,
  CheckCircle2,
  Eye,
  BookOpen,
  Award
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Sicherheitsoptimierung',
    description: 'Maximale Sicherheit durch effiziente Aufsicht und Risikominimierung.',
    icon: Shield
  },
  {
    title: 'Betriebsverbesserung',
    description: 'Kontinuierliche Optimierung der Betriebsabläufe für beste Besuchererfahrung.',
    icon: LineChart
  },
  {
    title: 'Qualifiziertes Personal',
    description: 'Hochqualifizierte Fachkräfte mit regelmäßigen Schulungen.',
    icon: Users
  },
  {
    title: 'Kostenoptimierung',
    description: 'Effizientes Kostenmanagement bei gleichbleibender Qualität.',
    icon: Target
  }
];

const EXPERTISE_AREAS = [
  {
    title: 'Sicherheitsüberwachung',
    description: 'Professionelle Überwachung aller Beckenbereiche und Anlagen.',
    icon: Eye,
    features: [
      'Kontinuierliche Beckenaufsicht',
      'Regelmäßige Sicherheitsrundgänge',
      'Präventive Gefahrenerkennung',
      'Schnelle Reaktion in Notfällen'
    ]
  },
  {
    title: 'Qualitätssicherung',
    description: 'Gewährleistung höchster Standards in allen Bereichen.',
    icon: Award,
    features: [
      'Regelmäßige Wasserqualitätsprüfung',
      'Hygiene-Monitoring',
      'Dokumentation aller Maßnahmen',
      'Kontinuierliche Prozessoptimierung'
    ]
  },
  {
    title: 'Besucherbetreuung',
    description: 'Kompetente und freundliche Betreuung aller Badegäste.',
    icon: Users,
    features: [
      'Professionelle Gästebetreuung',
      'Hilfestellung für alle Altersgruppen',
      'Klare Kommunikation der Baderegeln',
      'Konfliktmanagement'
    ]
  },
  {
    title: 'Personalentwicklung',
    description: 'Kontinuierliche Weiterbildung und Schulung des Teams.',
    icon: BookOpen,
    features: [
      'Regelmäßige Schulungen',
      'Erste-Hilfe-Training',
      'Notfallmanagement',
      'Teambuilding-Maßnahmen'
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

export default function LifeguardPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1581578731548-c64695cc6952"
            alt="Lifeguard Services"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Aufsichtspersonal für Schwimmbäder in Gersthofen
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Maximale Sicherheit und erstklassiges Schwimmbadvergnügen mit unserem qualifizierten Aufsichtspersonal.
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
              Profitieren Sie von unserem professionellen Aufsichtspersonal
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
              Ich bin davon überzeugt, dass eine angemessene Aufsicht nicht nur das Vertrauen der Besucher stärkt, sondern auch zu einer verbesserten Gesamterfahrung beiträgt. Mein Bestreben ist es, durch eine ausgewogene Mischung aus fachkundiger Betreuung und erstklassigen Sicherheitsmaßnahmen das Schwimmbaderlebnis zu optimieren.
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

      {/* Expertise Areas Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere Expertise-Bereiche
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Professionelle Betreuung in allen Bereichen des Badebetriebs
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {EXPERTISE_AREAS.map((area) => {
              const Icon = area.icon;
              return (
                <Card key={area.title} className="p-8 bg-white border-[#002b56]/10">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center flex-shrink-0">
                      <Icon className="w-6 h-6 text-[#002b56]" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-[#002b56] mb-2">{area.title}</h3>
                      <p className="text-[#002b56]/70 mb-6">{area.description}</p>
                      <div className="space-y-3">
                        {area.features.map((feature, index) => (
                          <div key={index} className="flex items-center gap-3">
                            <CheckCircle2 className="w-5 h-5 text-[#002b56]" />
                            <span className="text-[#002b56]">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </Card>
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
              H2oHero – Aufsichtspersonal Gersthofen
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