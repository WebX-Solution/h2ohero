'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Umbrella,
  CheckCircle2, 
  Calendar,
  Shield,
  Droplets,
  Wrench,
  Brain,
  School,
  Users,
  Presentation,
  ArrowRight,
  Gauge,
  LineChart
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Professionelle Vorbereitung',
    description: 'Sorgfältige und fachgerechte Vorbereitung Ihrer Bäder für die jeweilige Saison.',
    icon: Calendar
  },
  {
    title: 'Maximale Sicherheit',
    description: 'Umfassende Sicherheitsmaßnahmen und Prüfungen für einen sorgenfreien Betrieb.',
    icon: Shield
  },
  {
    title: 'Optimale Wasserqualität',
    description: 'Gewährleistung höchster Wasserqualität durch professionelle Aufbereitung.',
    icon: Droplets
  },
  {
    title: 'Technische Expertise',
    description: 'Fundiertes Fachwissen für die optimale Pflege und Wartung Ihrer Anlagen.',
    icon: Wrench
  }
];

const WINTERIZATION_STEPS = [
  {
    title: 'Anlageninspektion',
    description: 'Gründliche Überprüfung aller technischen Systeme und Komponenten.',
    icon: Gauge
  },
  {
    title: 'Wasseraufbereitung',
    description: 'Professionelle Wasserbehandlung und Konservierung für die Winterpause.',
    icon: Droplets
  },
  {
    title: 'Frostschutz',
    description: 'Umfassende Frostschutzmaßnahmen für alle wassertechnischen Anlagen.',
    icon: Shield
  },
  {
    title: 'Leistungsoptimierung',
    description: 'Analyse und Optimierung der Anlageneffizienz für die neue Saison.',
    icon: LineChart
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
    title: 'Schwimmkurse',
    description: 'Hochwertiges Training für Vertrauen, Kompetenz und Sicherheit im Wasser.',
    icon: School,
    href: '/kurse/2026-2-12'
  },
  {
    title: 'Aufsichtspersonal',
    description: 'Qualifiziertes Personal für maximale Sicherheit und optimales Badeerlebnis.',
    icon: Users,
    href: '/aufsichtspersonal'
  }
];

const CHECKLIST_ITEMS = [
  'Gründliche Inspektion aller technischen Anlagen',
  'Professionelle Wasseraufbereitung und -konservierung',
  'Umfassender Frostschutz für alle Systeme',
  'Sicherung und Abdeckung der Becken',
  'Dokumentation aller durchgeführten Maßnahmen',
  'Erstellung individueller Wartungspläne',
  'Beratung zu Optimierungsmöglichkeiten',
  'Schulung des Personals für die neue Saison'
];

export default function WinterizationPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7"
            alt="Pool Winterization"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Ein- und Auswinterung von öffentlichen Schwimmbädern
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Ihr Partner für sichere, qualitätsorientierte und effiziente Bäderbetreuung – Wir sorgen für einen reibungslosen Übergang in jede Saison.
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
              Profitieren Sie von unserer professionellen Ein- und Auswinterung
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
              Ich lege großen Wert auf Professionalität und maßgeschneiderte Lösungen. Meine Leidenschaft für Sicherheit, Qualität und langfristige Nutzungsfähigkeit spiegelt sich in meinem Service wider. Die präzisen Beschreibungen meiner Dienstleistungen unterstreichen deren Vielfalt und Wert. Ich bin fest davon überzeugt, dass meine Angebote die öffentlichen Bäder optimal unterstützen und ihnen die Pflege und Betreuung bieten, die sie benötigen.
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

      {/* Process Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unser Prozess
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Professionelle Ein- und Auswinterungs-dienstleistungen für öffentliche Bäder
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {WINTERIZATION_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="relative">
                  <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-[#002b56] text-white font-bold flex items-center justify-center">
                    {index + 1}
                  </div>
                  <Card className="p-8 bg-white border-[#002b56]/10 h-full hover:shadow-lg transition-all duration-300">
                    <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                      <Icon className="w-6 h-6 text-[#002b56]" />
                    </div>
                    <h3 className="text-xl font-semibold text-[#002b56] mb-4">{step.title}</h3>
                    <p className="text-[#002b56]/70">{step.description}</p>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Checklist Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#002b56] mb-6">
                Umfassende Arbeiten für saisonale Überführung
              </h2>
              <p className="text-[#002b56]/70 mb-8">
                Unser erfahrenes Team kümmert sich um Anlagenüberwinterung, Beckenreinigung und mehr, 
                um höchste Sicherheit und Qualität zu gewährleisten.
              </p>
              <div className="grid gap-4">
                {CHECKLIST_ITEMS.map((item, index) => (
                  <div 
                    key={index}
                    className="flex items-start gap-3 p-4 bg-[#002b56]/5 rounded-lg"
                  >
                    <CheckCircle2 className="w-5 h-5 text-[#002b56] flex-shrink-0 mt-0.5" />
                    <p className="text-[#002b56]">{item}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="relative h-[600px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
                alt="Pool Maintenance"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002b56] via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              H2oHero – Ein- und Auswinterung Gersthofen
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