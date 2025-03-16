'use client';

import { useState } from 'react';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  School,
  Users,
  Shield,
  Clock,
  Target,
  Heart,
  Brain,
  Presentation,
  Wrench,
  Umbrella,
  ArrowRight,
  CheckCircle2,
  Award,
  Smile
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Individuelle Betreuung',
    description: 'Persönliche Betreuung und maßgeschneiderte Lernmethoden für optimalen Lernerfolg.',
    icon: Users
  },
  {
    title: 'Sicherheit',
    description: 'Höchste Sicherheitsstandards und professionelle Aufsicht während des Unterrichts.',
    icon: Shield
  },
  {
    title: 'Flexible Zeiten',
    description: 'Verschiedene Kurszeiten für optimale Vereinbarkeit mit Ihrem Alltag.',
    icon: Clock
  },
  {
    title: 'Klare Lernziele',
    description: 'Strukturierte Kurspläne mit definierten Lernzielen für messbaren Fortschritt.',
    icon: Target
  }
];

const COURSE_TYPES = [
  {
    title: 'Einzelunterricht',
    description: 'Individuelle Betreuung, die schnelle Fortschritte garantiert – ideal für Kinder und Erwachsene.',
    features: [
      'Persönliche 1:1 Betreuung',
      'Flexibel wählbare Termine',
      'Individuelles Lerntempo',
      'Fokus auf spezifische Bedürfnisse'
    ],
    icon: Heart
  },
  {
    title: 'Anfängerkurse',
    description: 'Spielerisch und sicher Schwimmen lernen – perfekt zur Wassergewöhnung.',
    features: [
      'Grundlegende Schwimmtechniken',
      'Wassergewöhnung',
      'Kleine Gruppengrößen',
      'Altersgerechte Methodik'
    ],
    icon: Smile
  },
  {
    title: 'Fortgeschrittenen-Kurse',
    description: 'Technik verbessern und sicherer im Wasser werden.',
    features: [
      'Technikverfeinerung',
      'Ausdauertraining',
      'Verschiedene Schwimmstile',
      'Leistungsorientiertes Training'
    ],
    icon: Award
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
    title: 'Aufsichtspersonal',
    description: 'Qualifiziertes Personal für maximale Sicherheit und optimales Badeerlebnis.',
    icon: Users,
    href: '/aufsichtspersonal'
  }
];

const CourseCard = ({ 
  course, 
  expanded, 
  onToggle 
}: { 
  course: typeof COURSE_TYPES[0],
  expanded: boolean,
  onToggle: () => void
}) => {
  const Icon = course.icon;
  const [isFlipped, setIsFlipped] = useState(false);
  
  return (
    <Card 
      className="relative h-[400px] perspective-1000"
      onClick={() => setIsFlipped(!isFlipped)}
    >
      <div 
        className={`absolute inset-0 w-full h-full transition-transform duration-500 transform-style-3d ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
      >
        {/* Front of card */}
        <div className="absolute inset-0 p-8 bg-white border border-[#002b56]/10 rounded-lg backface-hidden">
          <div className="flex flex-col h-full">
            <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
              <Icon className="w-6 h-6 text-[#002b56]" />
            </div>
            <h3 className="text-xl font-semibold text-[#002b56] mb-4">{course.title}</h3>
            <p className="text-[#002b56]/70 mb-6 flex-grow">{course.description}</p>
            <Button 
              className="w-full bg-[#002b56] hover:bg-[#002b56]/90 text-white mt-auto"
            >
              Mehr erfahren
            </Button>
          </div>
        </div>

        {/* Back of card */}
        <div className="absolute inset-0 p-8 bg-white border border-[#002b56]/10 rounded-lg backface-hidden rotate-y-180">
          <div className="flex flex-col h-full">
            <h3 className="text-xl font-semibold text-[#002b56] mb-6">{course.title}</h3>
            <div className="space-y-3 flex-grow">
          {course.features.map((feature, index) => (
            <div key={index} className="flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-[#002b56]" />
              <span className="text-[#002b56]">{feature}</span>
            </div>
          ))}
            </div>
            <Button 
              className="w-full bg-[#002b56] hover:bg-[#002b56]/90 text-white mt-auto"
            >
              Zurück
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default function SwimmingCoursesPage() {
  // Remove expandedCard state since we're using individual flip states

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1560089000-7433a4ebbd64"
            alt="Swimming Courses"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Schwimmkurse Gersthofen – Schwimmen lernen leicht gemacht!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Wir bieten professionelle Schwimmkurse für alle Altersgruppen, individuell abgestimmt auf deine Bedürfnisse. 
              Egal ob Anfänger, Fortgeschrittene oder Wiedereinsteiger – bei uns bist du in besten Händen!
            </p>
            <div className="flex gap-4">
              <Button 
                size="lg"
                className="bg-white text-[#002b56] hover:bg-white/90"
              >
                Jetzt Kurs buchen
              </Button>
              <Link href="/kurse/2026-2-12">
                <Button 
                  size="lg"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10"
                >
                  Kurse ansehen
                </Button>
              </Link>
            </div>
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
              Profitieren Sie von unserer langjährigen Erfahrung im Schwimmunterricht
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
              Meine Leidenschaft liegt in der Durchführung sicherheitsorientierter Schwimmkurse, die das Vertrauen im Wasser stärken und kontinuierliche Fortschritte ermöglichen. Individuelle Betreuung und bewährte Lehrmethoden sind die Basis, um meinen Kursteilnehmern schnelle Entwicklungen zu ermöglichen und gleichzeitig ein starkes Vertrauen zum Wasser aufzubauen.
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

      {/* Course Types Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere Kursangebote
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Entdecken Sie unsere verschiedenen Schwimmkurse für jeden Bedarf
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 items-stretch">
            {COURSE_TYPES.map((course) => {
              return (
                <CourseCard
                  key={course.title}
                  course={course}
                  expanded={false}
                  onToggle={() => {}}
                />
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
              H2oHero – Schwimmkurse Gersthofen
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