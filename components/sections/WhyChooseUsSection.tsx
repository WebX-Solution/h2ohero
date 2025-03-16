'use client';

import { Anchor, Waves, Shield, Fish } from 'lucide-react';
import { Button } from '@/components/ui/button';

const FEATURES = [
  { icon: Shield, text: 'Spezialisiertes Team', description: 'Team mit Expertise und gezieltem Fachwissen.' },
  { icon: Waves, text: 'Individuallösungen', description: 'Maßgeschneiderte Lösungen für Ihre Anforderungen.' },
  { icon: Anchor, text: 'Langjährige Erfahrung', description: 'Umfassende Fachkenntnisse aus langjähriger Tätigkeit.' }
];

export function WhyChooseUsSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#002b56]">Erfolg hat 3 Buchstaben: TUN</h2>
        <p className="text-[#002b56]/80 mb-12 max-w-3xl mx-auto text-center">
          Innovative Lösungen für individuelle Bedürfnisse. Wir sind bestrebt, innovative Lösungen anzubieten, die den individuellen Anforderungen unserer Kunden gerecht werden und ihre Betriebe auf ein neues Niveau heben.
        </p>
        <div className="grid md:grid-cols-3 gap-12">
          {FEATURES.map(({ icon: Icon, text, description }, index) => (
            <div key={index} className="glass-card p-8 rounded-2xl flex flex-col items-center text-center group">
              <div className="w-16 h-16 rounded-full bg-[#002b56]/10 flex items-center justify-center mb-6 transition-transform group-hover:scale-110">
                <Icon className="w-6 h-6 text-[#002b56]" />
              </div>
              <h3 className="font-semibold text-lg mb-2 text-[#002b56]">{text}</h3>
              <p className="text-[#002b56]/80">{description}</p>
            </div>
          ))}
        </div>
        <div className="mt-16 max-w-3xl mx-auto text-center">
          <p className="text-[#002b56]/80 mb-8">
            Mein Ziel ist es, Bäderbetriebe zu unterstützen, indem ich ihre Abläufe optimiere und Kosten senke. Während des laufenden Betriebs stehe ich als verlässlicher Partner zur Seite, biete maßgeschneiderte Lösungen und kontinuierliche Unterstützung. Ich strebe danach, dass Bäderbetriebe durch meine Dienstleistungen erfolgreich wachsen und florieren.
          </p>
        </div>
        <div className="text-center mt-12">
          <Button className="bg-[#002b56] hover:bg-[#002b56]/90 text-white">
            Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  );
}