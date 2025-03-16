'use client';

import Navbar from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { Mail, Phone, MapPin, Shield } from 'lucide-react';

const PRIVACY_SECTIONS = [
  {
    title: '1. Datenschutz auf einen Blick',
    content: `Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.`
  },
  {
    title: '2. Hosting',
    content: `Wir hosten die Inhalte unserer Website bei folgendem Anbieter:

Strato
Anbieter ist die Strato AG, Otto-Ostrowski-Straße 7, 10249 Berlin (nachfolgend „Strato"). Wenn Sie unsere Website besuchen, erfasst Strato verschiedene Logfiles inklusive Ihrer IP-Adressen.

Weitere Informationen entnehmen Sie der Datenschutzerklärung von Strato: https://www.strato.de/datenschutz/.

Die Verwendung von Strato erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Wir haben ein berechtigtes Interesse an einer möglichst zuverlässigen Darstellung unserer Website. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO und § 25 Abs. 1 TTDSG, soweit die Einwilligung die Speicherung von Cookies oder den Zugriff auf Informationen im Endgerät des Nutzers (z. B. Device-Fingerprinting) im Sinne des TTDSG umfasst. Die Einwilligung ist jederzeit widerrufbar.`
  }
];

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      <main className="py-32 px-4 sm:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="mb-12">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#002b56]" />
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#002b56]">Datenschutzerklärung</h1>
            </div>
            <p className="text-[#002b56]/70 text-base sm:text-lg">
              Der Schutz Ihrer persönlichen Daten ist uns ein besonderes Anliegen. Wir verarbeiten Ihre Daten daher ausschließlich auf Grundlage der gesetzlichen Bestimmungen (DSGVO, TKG 2003).
            </p>
          </div>

          <div className="space-y-12 text-[#002b56]">
            {PRIVACY_SECTIONS.map((section, index) => (
              <section key={index} className="prose prose-lg max-w-none">
                <h2 className="text-xl sm:text-2xl font-bold mb-4">{section.title}</h2>
                <div className="text-[#002b56]/70 space-y-4">
                  {section.content.split('\n\n').map((paragraph, pIndex) => (
                    <p key={pIndex}>{paragraph}</p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">1. Verantwortlicher</h2>
              <div className="bg-[#002b56]/5 p-4 sm:p-6 rounded-xl space-y-4">
                <div className="font-medium text-[#002b56]">H2oHero</div>
                <div className="space-y-2 text-[#002b56]/70">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-[#002b56]" />
                    <span>Wilhelm-Busch-Straße 4a, 86405 Meitingen</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-[#002b56]" />
                    <span>+49 (0) 123 456 7890</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-[#002b56]" />
                    <span>info@h2ohero.de</span>
                  </div>
                </div>
              </div>
            </section>
            
            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">2. Allgemeine Informationen</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>
                  Diese Datenschutzerklärung klärt Sie über die Art, den Umfang und Zweck der Verarbeitung von personenbezogenen Daten innerhalb unseres Onlineangebotes und der mit ihm verbundenen Webseiten, Funktionen und Inhalte auf.
                </p>
                <p>
                  Im Hinblick auf die verwendeten Begrifflichkeiten, wie z.B. „Verarbeitung" oder „Verantwortlicher", verweisen wir auf die Definitionen im Art. 4 der Datenschutzgrundverordnung (DSGVO).
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">3. Arten der verarbeiteten Daten</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>Zu den verarbeiteten Daten gehören:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Bestandsdaten (z.B. Namen, Adressen)</li>
                  <li>Kontaktdaten (z.B. E-Mail, Telefonnummern)</li>
                  <li>Inhaltsdaten (z.B. Texteingaben, Fotografien, Videos)</li>
                  <li>Nutzungsdaten (z.B. besuchte Webseiten, Interesse an Inhalten)</li>
                  <li>Meta-/Kommunikationsdaten (z.B. Geräte-Informationen, IP-Adressen)</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">4. Zweck der Verarbeitung</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>Wir verarbeiten personenbezogene Daten zu folgenden Zwecken:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Zurverfügungstellung des Onlineangebotes, seiner Funktionen und Inhalte</li>
                  <li>Beantwortung von Kontaktanfragen und Kommunikation mit Nutzern</li>
                  <li>Sicherheitsmaßnahmen</li>
                  <li>Reichweitenmessung/Marketing</li>
                  <li>Durchführung von Kursbuchungen und Vertragsabwicklung</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">5. Rechtsgrundlagen</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>
                  Nach Art. 13 DSGVO teilen wir Ihnen die Rechtsgrundlagen unserer Datenverarbeitungen mit:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Art. 6 Abs. 1 lit. a DSGVO: Einwilligung</li>
                  <li>Art. 6 Abs. 1 lit. b DSGVO: Vertragserfüllung und vorvertragliche Anfragen</li>
                  <li>Art. 6 Abs. 1 lit. f DSGVO: Berechtigte Interessen</li>
                  <li>Art. 6 Abs. 1 lit. c DSGVO: Rechtliche Verpflichtung</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">6. Cookies</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>
                  Unsere Website verwendet Cookies. Dabei handelt es sich um kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Ihr Browser greift auf diese Dateien zu.
                </p>
                <p>Wir verwenden folgende Arten von Cookies:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Technisch notwendige Cookies für grundlegende Funktionen der Website</li>
                  <li>Funktionale Cookies für die Verbesserung der Benutzerfreundlichkeit</li>
                  <li>Performance-Cookies für die Analyse der Websitenutzung</li>
                </ul>
                <p>
                  Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und einzeln über deren Annahme entscheiden oder die Annahme von Cookies für bestimmte Fälle oder generell ausschließen.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">7. Ihre Rechte</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>Sie haben folgende Rechte gegenüber uns in Bezug auf die Sie betreffenden personenbezogenen Daten:</p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Recht auf Auskunft (Art. 15 DSGVO)</li>
                  <li>Recht auf Berichtigung (Art. 16 DSGVO)</li>
                  <li>Recht auf Löschung (Art. 17 DSGVO)</li>
                  <li>Recht auf Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
                  <li>Recht auf Datenübertragbarkeit (Art. 20 DSGVO)</li>
                  <li>Recht auf Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
                  <li>Recht auf Widerruf der datenschutzrechtlichen Einwilligungserklärung</li>
                  <li>Recht auf Beschwerde bei einer Aufsichtsbehörde</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">8. Datensicherheit</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>
                  Wir treffen nach Maßgabe des Art. 32 DSGVO unter Berücksichtigung des Stands der Technik, der Implementierungskosten und der Art, des Umfangs, der Umstände und der Zwecke der Verarbeitung sowie der unterschiedlichen Eintrittswahrscheinlichkeit und Schwere des Risikos für die Rechte und Freiheiten natürlicher Personen, geeignete technische und organisatorische Maßnahmen, um ein dem Risiko angemessenes Schutzniveau zu gewährleisten.
                </p>
                <p>
                  Zu den Maßnahmen gehören insbesondere:
                </p>
                <ul className="list-disc pl-6 space-y-2">
                  <li>Die Verschlüsselung personenbezogener Daten</li>
                  <li>Die Fähigkeit, die Vertraulichkeit, Integrität, Verfügbarkeit und Belastbarkeit der Systeme und Dienste zu gewährleisten</li>
                  <li>Die Fähigkeit, die Verfügbarkeit der personenbezogenen Daten und den Zugang zu ihnen bei einem physischen oder technischen Zwischenfall rasch wiederherzustellen</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-xl sm:text-2xl font-bold mb-4">9. Aktualität und Änderung dieser Datenschutzerklärung</h2>
              <div className="space-y-4 text-[#002b56]/70">
                <p>
                  Diese Datenschutzerklärung ist aktuell gültig und hat den Stand Februar 2024.
                </p>
                <p>
                  Durch die Weiterentwicklung unserer Website und Angebote oder aufgrund geänderter gesetzlicher beziehungsweise behördlicher Vorgaben kann es notwendig werden, diese Datenschutzerklärung zu ändern. Die jeweils aktuelle Datenschutzerklärung kann jederzeit auf dieser Website von Ihnen abgerufen und ausgedruckt werden.
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}