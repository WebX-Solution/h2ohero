'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin } from 'lucide-react';

export default function ImpressumPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-32 px-4 sm:px-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-4xl font-bold text-[#002b56] mb-12">Impressum</h1>
          
          <section className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold text-[#002b56] mb-4">Diensteanbieter</h2>
              <div className="space-y-2 text-[#002b56]/80">
                <p>Ralf Großmann</p>
                <p>Wilhelm-Busch-Straße 4a</p>
                <p>86405 Meitingen</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#002b56] mb-4">Kontaktmöglichkeiten</h2>
              <div className="space-y-4">
                <div className="flex items-center gap-3 text-[#002b56]/80">
                  <Mail className="w-5 h-5 text-[#002b56]" />
                  <a 
                    href="mailto:info@h2ohero.de"
                    className="hover:text-[#002b56] transition-colors"
                  >
                    info@h2ohero.de
                  </a>
                </div>
                <div className="flex items-start gap-3 text-[#002b56]/80">
                  <MapPin className="w-5 h-5 text-[#002b56] mt-1" />
                  <div>
                    <p>Wilhelm-Busch-Straße 4a</p>
                    <p>86405 Meitingen</p>
                    <p>Deutschland</p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#002b56] mb-4">Angaben zum Unternehmen</h2>
              <div className="space-y-2 text-[#002b56]/80">
                <p>Unternehmensform: Einzelunternehmen</p>
                <p>Geschäftsführer: Ralf Großmann</p>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#002b56] mb-4">Online-Streitbeilegung (OS)</h2>
              <p className="text-[#002b56]/80">
                Online-Streitbeilegung: Die Europäische Kommission stellt eine Plattform zur 
                Online-Streitbeilegung (OS) bereit, die Sie unter{' '}
                <a 
                  href="https://ec.europa.eu/consumers/odr/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-[#002b56] hover:underline"
                >
                  https://ec.europa.eu/consumers/odr/
                </a>
                {' '}finden. Verbraucher haben die Möglichkeit, diese Plattform für die Beilegung ihrer 
                Streitigkeiten zu nutzen.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-semibold text-[#002b56] mb-4">Haftungsausschluss</h2>
              <div className="space-y-4 text-[#002b56]/80">
                <p>
                  Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung für die 
                  Inhalte externer Links. Für den Inhalt der verlinkten Seiten sind ausschließlich 
                  deren Betreiber verantwortlich.
                </p>
                <p>
                  Die Inhalte unserer Seiten wurden mit größter Sorgfalt erstellt. Für die 
                  Richtigkeit, Vollständigkeit und Aktualität der Inhalte können wir jedoch keine 
                  Gewähr übernehmen.
                </p>
              </div>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </div>
  );
}