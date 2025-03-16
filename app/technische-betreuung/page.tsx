// Add use client directive at the top
'use client';

// Organize imports
import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// UI Components
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

// Icons
import { 
  Wrench,
  LineChart,
  ShieldCheck,
  Database,
  Brain,
  Presentation,
  Umbrella,
  School,
  Users,
  Settings,
  Gauge,
  Droplets,
  Zap,
  ClipboardCheck,
  CheckCircle2,
  ArrowRight
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Ressourcenoptimierung',
    description: 'Maximieren Sie die Effizienz Ihrer Ressourcennutzung durch professionelle Analyse und Optimierung.',
    icon: LineChart
  },
  {
    title: 'Kosteneffizienz',
    description: 'Identifizieren und reduzieren Sie überflüssige Ausgaben durch effizientere Arbeitsmethoden.',
    icon: Database
  },
  {
    title: 'Risikomanagement',
    description: 'Minimieren Sie Risiken und gewährleisten Sie die Einhaltung aller Vorschriften.',
    icon: ShieldCheck
  },
  {
    title: 'Prozessoptimierung',
    description: 'Verbessern Sie Betriebsabläufe für eine reibungslose und effiziente Arbeitsweise.',
    icon: Settings
  }
];

const TECHNICAL_SERVICES = [
  {
    title: 'Wartung & Inspektion',
    description: 'Regelmäßige Wartung und Inspektion aller technischen Anlagen zur Vermeidung von Ausfällen.',
    details: [
      'Regelmäßige Sicherheitsüberprüfungen aller Anlagenkomponenten',
      'Vorbeugende Wartungsarbeiten zur Vermeidung von Störungen',
      'Dokumentation aller Wartungsarbeiten und Prüfungen',
      'Erstellung individueller Wartungspläne',
      'Schnelle Reaktionszeiten bei technischen Problemen'
    ],
    icon: Wrench
  },
  {
    title: 'Wasseraufbereitung',
    description: 'Professionelle Wasseraufbereitung für optimale Wasserqualität und Hygiene.',
    details: [
      'Kontinuierliche Überwachung der Wasserqualität',
      'Optimierung der Filteranlagen und Wasseraufbereitungssysteme',
      'Regelmäßige Kontrolle der chemischen Parameter',
      'Einhaltung aller hygienischen Vorschriften',
      'Beratung zur Verbesserung der Wasserqualität'
    ],
    icon: Droplets
  },
  {
    title: 'Energiemanagement',
    description: 'Effizientes Energiemanagement zur Kostensenkung und Nachhaltigkeit.',
    details: [
      'Analyse des Energieverbrauchs und Optimierungspotenzials',
      'Implementierung energieeffizienter Lösungen',
      'Regelmäßiges Monitoring des Energieverbrauchs',
      'Entwicklung von Energiesparkonzepten',
      'Beratung zu erneuerbaren Energien'
    ],
    icon: Zap
  },
  {
    title: 'Qualitätskontrolle',
    description: 'Regelmäßige Kontrollen zur Sicherstellung höchster Qualitätsstandards.',
    details: [
      'Durchführung regelmäßiger Qualitätskontrollen',
      'Dokumentation aller Prüfergebnisse',
      'Entwicklung von Qualitätssicherungsmaßnahmen',
      'Schulung des Personals in Qualitätsstandards',
      'Kontinuierliche Verbesserung der Prozesse'
    ],
    icon: ClipboardCheck
  },
  {
    title: 'Anlagenüberwachung',
    description: 'Kontinuierliche Überwachung aller technischen Systeme für maximale Betriebssicherheit.',
    details: [
      '24/7 Monitoring aller kritischen Systeme',
      'Automatische Alarmierung bei Störungen',
      'Präventive Fehlererkennung',
      'Regelmäßige Systemchecks',
      'Detaillierte Betriebsprotokolle'
    ],
    icon: Gauge
  }
];

function ServiceModal({ 
  service, 
  isOpen, 
  onClose 
}: { 
  service: typeof TECHNICAL_SERVICES[0], 
  isOpen: boolean, 
  onClose: () => void 
}) {
  const Icon = service.icon;
  
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-3 text-[#002b56]">
            <div className="w-10 h-10 rounded-full bg-[#002b56]/10 flex items-center justify-center">
              <Icon className="w-5 h-5 text-[#002b56]" />
            </div>
            {service.title}
          </DialogTitle>
        </DialogHeader>
        
        <div className="mt-6">
          <p className="text-[#002b56]/70 mb-6">{service.description}</p>
          
          <div className="space-y-4">
            {service.details.map((detail, index) => (
              <div 
                key={index}
                className="flex items-start gap-3 p-4 bg-[#002b56]/5 rounded-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-[#002b56] flex-shrink-0 mt-0.5" />
                <p className="text-[#002b56]">{detail}</p>
              </div>
            ))}
          </div>
          
          <div className="mt-8 pt-6 border-t border-[#002b56]/10">
            <Button 
              className="w-full bg-[#002b56] hover:bg-[#002b56]/90 text-white"
              onClick={() => onClose()}
            >
              Kontakt aufnehmen
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
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
  },
  {
    title: 'Aufsichtspersonal',
    description: 'Qualifiziertes Personal für maximale Sicherheit und optimales Badeerlebnis.',
    icon: Users,
    href: '/aufsichtspersonal'
  }
];

export default function TechnicalSupportPage() {
  const [selectedService, setSelectedService] = useState<typeof TECHNICAL_SERVICES[0] | null>(null);

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1571902943202-507ec2618e8f"
            alt="Technical Pool Management"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              Technische Bäderbetreuung Gersthofen – Ihre Experten für Schwimmbäder
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Optimale Technische Bäderbetreuung für Effizienz, Kostenoptimierung und langfristige Strategien.
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
              Profitieren Sie von unserer professionellen technischen Bäderbetreuung
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
              Die Technische Bäderbetreuung Gersthofen – da ich fest daran glaube, dass optimierte Abläufe und strategische Entscheidungen Unternehmen dabei unterstützen, ihr volles Potenzial zu entfalten. Meine Leidenschaft liegt darin, Unternehmen zu helfen, ihre Prozesse zu verbessern, Kosten zu senken und langfristige Wachstumsstrategien zu entwickeln. Darüber hinaus ist es mir wichtig, das passende Personal gezielt einzulernen und zu befähigen, damit sie die erforderlichen Fähigkeiten erwerben, um diese Optimierungen erfolgreich umzusetzen.
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

      {/* Technical Services Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Unsere technischen Leistungen
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Professionelle Betreuung für den optimalen Betrieb Ihrer Bäderanlage
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {TECHNICAL_SERVICES.map((service) => {
              const Icon = service.icon;
              return (
                <div key={service.title} className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-[#002b56]" />
                  </div>
                  <h3 className="text-xl font-semibold text-[#002b56] mb-4">{service.title}</h3>
                  <p className="text-[#002b56]/70">{service.description}</p>
                  <Button 
                    variant="ghost" 
                    className="mt-6 p-0 hover:bg-transparent text-[#002b56] hover:text-[#002b56]/70"
                    onClick={() => setSelectedService(service)}
                  >
                    Mehr erfahren
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
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
              H2oHero – Technische Bäderbetreuung Gersthofen
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
      
      {selectedService && (
        <ServiceModal
          service={selectedService}
          isOpen={!!selectedService}
          onClose={() => setSelectedService(null)}
        />
      )}

      <Footer />
    </div>
  );
}