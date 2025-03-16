import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ_ITEMS = [
  {
    q: 'Wie melde ich mein Kind zu einem Schwimmkurs an?',
    a: 'Die Anmeldung erfolgt bequem über unsere Website. Wählen Sie den gewünschten Kurs aus und folgen Sie dem Buchungsprozess. Nach erfolgreicher Zahlung erhalten Sie eine Bestätigungs-E-Mail mit allen wichtigen Informationen.'
  },
  {
    q: 'Was muss mein Kind zum Schwimmkurs mitbringen?',
    a: 'Ihr Kind benötigt: Badebekleidung, ein Handtuch, ggf. Badeschuhe, eine Schwimmbrille (optional) und bei langen Haaren eine Badekappe. Bitte kommen Sie 15 Minuten vor Kursbeginn, damit genug Zeit zum Umziehen bleibt.'
  },
  {
    q: 'Wie lange dauert ein Schwimmkurs?',
    a: 'Unsere regulären Schwimmkurse erstrecken sich über 10-12 Einheiten, wobei jede Einheit 45 Minuten dauert. Die Kurse finden in der Regel einmal wöchentlich statt. Die genauen Termine und Zeiten finden Sie bei der jeweiligen Kursbeschreibung.'
  },
  {
    q: 'Was passiert bei Krankheit oder Verhinderung?',
    a: 'Bei krankheitsbedingtem Ausfall bitten wir um rechtzeitige Benachrichtigung. Versäumte Einheiten können in Absprache nachgeholt werden. Bei längerer Krankheit mit ärztlichem Attest finden wir eine individuelle Lösung.'
  },
  {
    q: 'Gibt es eine Mindestteilnehmerzahl für die Kurse?',
    a: 'Ja, für einen optimalen Lernerfolg und die Wirtschaftlichkeit der Kurse benötigen wir eine Mindestteilnehmerzahl von 5 Kindern. Sollte diese nicht erreicht werden, informieren wir Sie rechtzeitig und bieten alternative Termine an.'
  },
  {
    q: 'Wie sind die Zahlungsbedingungen?',
    a: 'Die Kursgebühr ist vor Kursbeginn in voller Höhe zu entrichten. Wir akzeptieren Kreditkarte, PayPal und Überweisung. Bei Stornierung bis 14 Tage vor Kursbeginn erstatten wir die volle Gebühr, danach 50%. Bei Krankheit mit Attest finden wir eine kulante Lösung.'
  },
  {
    q: 'Werden die Schwimmlehrer regelmäßig geschult?',
    a: 'Ja, alle unsere Schwimmlehrer sind ausgebildete Fachkräfte und nehmen regelmäßig an Fortbildungen teil. Sie verfügen über aktuelle Rettungsschwimmer- und Erste-Hilfe-Qualifikationen sowie pädagogische Schulungen.'
  },
  {
    q: 'Gibt es spezielle Anfängerkurse für ängstliche Kinder?',
    a: 'Ja, wir bieten spezielle Wassergewöhnungskurse mit kleinen Gruppen für wasserscheue Kinder an. Hier liegt der Fokus besonders auf spielerischer Heranführung ans Wasser und Aufbau von Vertrauen.'
  },
  {
    q: 'Wie groß sind die Kursgruppen?',
    a: 'Die Gruppengröße variiert je nach Kursart. In Anfängerkursen unterrichten wir maximal 8 Kinder, in Fortgeschrittenenkursen bis zu 10 Kinder. So gewährleisten wir eine optimale individuelle Betreuung.'
  },
  {
    q: 'Was passiert bei Ausfall eines Kurstermins?',
    a: 'Bei Ausfall eines Termins durch uns (z.B. technische Gründe) wird der Termin nachgeholt oder die Kursgebühr anteilig erstattet. Wir informieren Sie in solchen Fällen schnellstmöglich per E-Mail oder Telefon.'
  }
];

export default function FAQSection() {
  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-4xl font-bold mb-4 text-center text-[#002b56]">Häufig gestellte Fragen</h2>
        <p className="text-[#002b56]/60 text-center mb-12">
          Hier finden Sie Antworten auf die häufigsten Fragen zu unseren Schwimmkursen und Dienstleistungen
        </p>
        
        <Accordion type="single" collapsible className="space-y-4">
          {FAQ_ITEMS.map((faq, index) => (
            <AccordionItem 
              key={index} 
              value={`item-${index}`} 
              className="bg-[#002b56]/5 rounded-lg border-none"
            >
              <AccordionTrigger 
                className="text-left px-6 py-4 hover:no-underline hover:bg-[#002b56]/10 transition-colors rounded-lg text-[#002b56] font-medium"
              >
                {faq.q}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 text-[#002b56]/80 leading-relaxed">
                {faq.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        <div className="mt-12 text-center">
          <p className="text-[#002b56]/60">
            Haben Sie weitere Fragen? Kontaktieren Sie uns gerne!
          </p>
        </div>
      </div>
    </section>
  );
}