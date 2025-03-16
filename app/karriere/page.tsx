'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import Image from 'next/image';
import { 
  GraduationCap,
  Users,
  Target,
  TrendingUp,
  Mail,
  ArrowRight,
  CheckCircle2,
  Award,
  Brain,
  Heart
} from 'lucide-react';

const BENEFITS = [
  {
    title: 'Persönliche Entwicklung',
    description: 'Individuelle Entwicklungspläne und regelmäßige Weiterbildungsmöglichkeiten.',
    icon: GraduationCap
  },
  {
    title: 'Starkes Team',
    description: 'Werde Teil eines motivierten Teams mit flachen Hierarchien.',
    icon: Users
  },
  {
    title: 'Karrierechancen',
    description: 'Vielfältige Aufstiegsmöglichkeiten und klare Entwicklungsperspektiven.',
    icon: TrendingUp
  },
  {
    title: 'Work-Life-Balance',
    description: 'Flexible Arbeitszeiten und eine ausgewogene Work-Life-Balance.',
    icon: Heart
  }
];

const VALUES = [
  {
    title: 'Expertise',
    description: 'Wir setzen auf kontinuierliche Weiterbildung und fachliche Exzellenz.',
    icon: Brain
  },
  {
    title: 'Qualität',
    description: 'Höchste Standards in allen Bereichen unserer Arbeit.',
    icon: Award
  },
  {
    title: 'Teamwork',
    description: 'Gemeinsam erreichen wir unsere Ziele und unterstützen uns gegenseitig.',
    icon: Users
  },
  {
    title: 'Zielorientierung',
    description: 'Klare Visionen und strukturierte Wege zur Zielerreichung.',
    icon: Target
  }
];

const REQUIREMENTS = [
  'Leidenschaft für den Bäderbetrieb und Schwimmsport',
  'Teamfähigkeit und Kommunikationsstärke',
  'Eigeninitiative und Verantwortungsbewusstsein',
  'Bereitschaft zur kontinuierlichen Weiterbildung',
  'Flexibilität und Kundenorientierung',
  'Qualitätsbewusstsein und Zuverlässigkeit'
];

export default function CareerPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d"
            alt="Careers at H2oHero"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/95 to-[#002b56]/80" />
        </div>
        
        <div className="relative max-w-7xl mx-auto px-8 py-32">
          <div className="max-w-3xl">
            <h1 className="text-5xl font-bold text-white mb-6">
              H2oHero gestaltet Karrieren!
            </h1>
            <p className="text-xl text-white/90 mb-8">
              Deine Erfolgsgeschichte beginnt hier: Werde Teil von H2oHero und gestalte deine berufliche Zukunft mit uns!
            </p>
            <Button 
              size="lg"
              className="bg-white text-[#002b56] hover:bg-white/90"
              onClick={() => {
                const mailtoLink = 'mailto:info@h2ohero.de?subject=Bewerbung bei H2oHero';
                window.location.href = mailtoLink;
              }}
            >
              <Mail className="w-5 h-5 mr-2" />
              Jetzt bewerben
            </Button>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-3xl font-bold text-[#002b56] mb-6">
                Entfalte dein Potenzial in einem Team voller Möglichkeiten
              </h2>
              <p className="text-[#002b56]/70 mb-6 text-lg leading-relaxed">
                Ich bin stets auf der Suche nach talentierten Individuen, die ihre beruflichen Ziele erreichen möchten. 
                Mein Ziel ist es, eine Umgebung zu schaffen, in der du deine Fähigkeiten entwickeln und erfolgreich sein kannst.
              </p>
              <p className="text-[#002b56]/70 mb-8 text-lg leading-relaxed">
                Mit meinem Team bei H2oHero bieten wir spannende Karrieremöglichkeiten und eine unterstützende Atmosphäre. 
                Ich setze auf individuelle Entwicklungspläne, umfassende Schulungen und ein inspirierendes Arbeitsumfeld, 
                das deine Stärken fördert.
              </p>
            </div>
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978"
                alt="Team Collaboration"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 px-8 bg-[#002b56]/5">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-[#002b56] mb-4">
              Deine Vorteile bei H2oHero
            </h2>
            <p className="text-[#002b56]/60 max-w-2xl mx-auto">
              Wir bieten dir mehr als nur einen Job
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {BENEFITS.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <Card key={benefit.title} className="p-8 bg-white border-[#002b56]/10 hover:shadow-lg transition-all duration-300">
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

      {/* Values Section */}
      <section className="py-24 px-8 bg-[#002b56]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">
              Unsere Werte
            </h2>
            <p className="text-white/80 max-w-2xl mx-auto">
              Diese Werte prägen unsere tägliche Arbeit und unseren Umgang miteinander
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {VALUES.map((value) => {
              const Icon = value.icon;
              return (
                <div 
                  key={value.title}
                  className="bg-white/10 p-8 rounded-xl hover:bg-white/20 transition-all duration-300"
                >
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-4">{value.title}</h3>
                  <p className="text-white/80">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Requirements Section */}
      <section className="py-24 px-8 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16 items-center">
            <div className="relative h-[500px] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf"
                alt="Team Meeting"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-[#002b56] mb-6">
                Was wir von dir erwarten
              </h2>
              <div className="space-y-4">
                {REQUIREMENTS.map((requirement, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#002b56] flex-shrink-0 mt-0.5" />
                    <p className="text-[#002b56]/70">{requirement}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-8 bg-[#002b56]">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">
            Deine Karriere beginnt hier
          </h2>
          <p className="text-white/90 text-lg mb-8">
            Werde Teil meines Teams und bewerbe dich jetzt. Ich freue mich darauf, dich kennenzulernen und 
            gemeinsam deine Karriereziele zu erreichen. Trete meinem Team bei und starte deine Zukunft mit mir!
          </p>
          <Button 
            size="lg"
            className="bg-white text-[#002b56] hover:bg-white/90"
            onClick={() => {
              const mailtoLink = 'mailto:info@h2ohero.de?subject=Bewerbung bei H2oHero';
              window.location.href = mailtoLink;
            }}
          >
            <Mail className="w-5 h-5 mr-2" />
            Jetzt bewerben
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}