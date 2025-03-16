'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { Brain, Wrench, Umbrella, School, Users, BookOpen, Target, ArrowRight, CheckCircle2, Rocket, Users2, LineChart } from 'lucide-react';

const BENEFITS = [
  {
    title: 'Strategische Entwicklung',
    description: 'Entwickeln Sie klare Ziele und effektive Strategien für Ihren beruflichen Werdegang.',
    icon: Target
  },
  {
    title: 'Erfahrungsaustausch',
    description: 'Profitieren Sie von jahrelanger Branchenerfahrung und bewährten Best Practices.',
    icon: Users2
  },
  {
    title: 'Persönliches Wachstum',
    description: 'Stärken Sie Ihre Führungskompetenzen und entwickeln Sie Ihren individuellen Führungsstil.',
    icon: Rocket
  },
  {
    title: 'Messbare Erfolge',
    description: 'Erreichen Sie nachhaltige Verbesserungen durch strukturierte Entwicklungspläne.',
    icon: LineChart
  }
];

const EXPERTISE_AREAS = [
  'Führungskräfteentwicklung',
  'Change Management',
  'Strategische Planung',
  'Konfliktmanagement',
  'Kommunikationstraining',
  'Teambuilding',
  'Prozessoptimierung',
  'Digitale Transformation'
];

const SERVICES = [
  {
    title: 'Coaching',
    description: 'Durch gezielte Fragen und Reflexionsübungen fördert ein Coach die Selbstreflexion. Kunden werden dazu angeregt, über ihre Denkweisen, Verhaltensmuster und Gewohnheiten nachzudenken.',
    icon: Brain,
    href: '/coaching'
  },
  {
    title: 'Technische Betreuung',
    description: 'Unsere betriebsrechnerische Betreuung bietet Unternehmen die Möglichkeit, ihre betrieblichen Abläufe zu optimieren, Kosten zu senken und Risiken zu minimieren.',
    icon: Wrench,
    href: '/technische-betreuung'
  },
  {
    title: 'Ein- und Auswinterung',
    description: 'Ihre öffentlichen Bäder verdienen die beste Pflege. Wir stehen bereit, um Ihr Bad optimal vorzubereiten und zu pflegen.',
    icon: Umbrella,
    href: '/ein-auswinterung'
  },
  {
    title: 'Schwimmkurse',
    description: 'Unsere Schwimmkurse bieten nicht nur hochwertiges Training, sondern fördern auch Vertrauen, Kompetenz und Sicherheit im Wasser für alle Teilnehmer*innen.',
    icon: School,
    href: '/kurse/2026-2-12'
  },
  {
    title: 'Aufsichtspersonal',
    description: 'Unser Aufsichtspersonal für öffentliche Schwimmbäder steht für höchste Sicherheit, kontinuierliche Betriebsverbesserungen und die Schaffung eines herausragenden Schwimmerlebnisses.',
    icon: Users,
    href: '/aufsichtspersonal'
  }
];

export default function MentoringPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4"
            alt="Mentoring"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Deutschlandweites Mentoring für berufliches und persönliches Wachstum
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Fundiertes Fachwissen, inspirierende Einblicke und individuelle Strategien für Karriere und Persönlichkeit.
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

      {/* Quote Section */}
      <section className="py-24 bg-[#002b56]/5">
        <div className="max-w-4xl mx-auto px-8">
          <div className="relative">
            <div className="absolute -top-6 -left-8 text-[120px] text-[#002b56]/10">"</div>
            <blockquote className="relative z-10 text-xl text-[#002b56] leading-relaxed">
              Für mich bedeutet Mentoring einen wertvollen Erfahrungsaustausch und die Möglichkeit, sowohl beruflich als auch persönlich zu wachsen. Als Mentor kann ich durch meine langjährige Berufserfahrung und mein spezifisches Wissen in der Branche oder im Unternehmen praktische Ratschläge und wertvolle Einblicke bieten. Es geht nicht nur um die fachliche Entwicklung, sondern auch um den Aufbau von Beziehungen und die Unterstützung bei der Entwicklung von Führungseigenschaften wie Kommunikation, Problemlösung und Entscheidungsfindung. Dies alles trägt dazu bei, aufstrebenden Führungskräften nicht nur beruflich, sondern auch persönlich dabei zu helfen, ihr volles Potenzial zu entfalten.
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
                <p className="font-semibold text-[#002b56]">Ralf Großmann</p>
                <p className="text-[#002b56]/60">H2oHero - Geschäftsführer</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Ihr Weg zum Erfolg
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Unser Mentoring-Programm bietet Ihnen maßgeschneiderte Unterstützung für Ihre persönliche und berufliche Entwicklung.
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

      {/* Process Section */}
      <section className="py-24 px-8 bg-[#002b56]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Unser Mentoring-Prozess
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Ein strukturierter Ansatz für Ihren Erfolg
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative p-8 bg-white/10 rounded-2xl group hover:bg-white/20 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white text-[#002b56] font-bold flex items-center justify-center">1</div>
              <h3 className="text-xl font-semibold text-white mb-4">Analyse & Zielsetzung</h3>
              <p className="text-white/80">
                Wir beginnen mit einer gründlichen Analyse Ihrer aktuellen Situation und definieren gemeinsam klare, erreichbare Ziele.
              </p>
            </div>
            
            <div className="relative p-8 bg-white/10 rounded-2xl group hover:bg-white/20 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white text-[#002b56] font-bold flex items-center justify-center">2</div>
              <h3 className="text-xl font-semibold text-white mb-4">Entwicklung & Umsetzung</h3>
              <p className="text-white/80">
                Durch regelmäßige Mentoring-Sessions arbeiten wir systematisch an der Erreichung Ihrer Ziele.
              </p>
            </div>
            
            <div className="relative p-8 bg-white/10 rounded-2xl group hover:bg-white/20 transition-all duration-300">
              <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-white text-[#002b56] font-bold flex items-center justify-center">3</div>
              <h3 className="text-xl font-semibold text-white mb-4">Evaluation & Anpassung</h3>
              <p className="text-white/80">
                Regelmäßige Fortschrittsbewertungen und Anpassungen sichern Ihren nachhaltigen Erfolg.
              </p>
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
              Profitieren Sie von unserer umfassenden Erfahrung in verschiedenen Bereichen
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERTISE_AREAS.map((area) => (
              <div key={area} className="flex items-center gap-3 p-4 bg-white rounded-lg border border-[#002b56]/10">
                <CheckCircle2 className="w-5 h-5 text-[#002b56]" />
                <span className="text-[#002b56]">{area}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              H2oHero – Mentoring Gersthofen
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