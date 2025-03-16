'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Mail, Phone, MapPin } from 'lucide-react';

const FOOTER_SECTIONS = [
  {
    title: 'H2oHero',
    links: [
      { label: 'Startseite', href: '/' },
      { label: 'Unternehmen', href: '/about' },
      { label: 'Karriere', href: '/karriere' },
      { label: 'Blog', href: '/blog' },
      { label: 'Kontakt', href: 'mailto:info@h2ohero.de' },
    ]
  },
  {
    title: 'Dienstleistungen',
    links: [
      { label: 'Mentoring', href: '/mentoring' },
      { label: 'Coaching', href: '/coaching' },
      { label: 'Technische Bäderbetreuung Gersthofen', href: '/technische-betreuung' },
      { label: 'Ein- und Auswinterung', href: '/ein-auswinterung' },
      { label: 'Schwimmkurse Gersthofen', href: '/kurse/2026-2-12' },
      { label: 'Aufsichtspersonal für Schwimmbäder', href: '/aufsichtspersonal' },
      { label: 'Vorträge und Seminare', href: '/vortraege-seminare' },
    ]
  },
  {
    title: 'Rechtliches',
    links: [
      { label: 'Impressum', href: '/impressum' },
      { label: 'Datenschutzerklärung', href: '/datenschutz' },
      { label: 'Cookie-Richtlinie (EU)', href: '/datenschutz#cookies' },
    ]
  }
];

export function Footer() {
  return (
    <footer className="bg-[#002b56] text-white">
      <div className="max-w-7xl mx-auto px-8 pt-16 pb-8">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Logo and Description */}
          <div>
            <div className="w-36 h-36 rounded-lg overflow-hidden mb-6">
              <Image
                src="/h2ohero_Logo.png"
                alt="H2oHero Logo"
                width={420}
                height={420}
                className="object-cover"
              />
            </div>
            <p className="text-white/80 mb-6">
              Ihr Partner für professionelle Bäderbetriebsleistungen in Gersthofen und Umgebung.
            </p>
            <div className="space-y-3">
              <a href="mailto:info@h2ohero.de" className="flex items-center gap-2 text-white/80 hover:text-white">
                <Mail className="w-4 h-4" />
                <span>info@h2ohero.de</span>
              </a>
              <a href="tel:+491234567890" className="flex items-center gap-2 text-white/80 hover:text-white">
                <Phone className="w-4 h-4" />
                <span>+49 (0) 123 456 7890</span>
              </a>
            </div>
          </div>

          {/* Navigation Sections */}
          {FOOTER_SECTIONS.map((section) => (
            <div key={section.title}>
              <h3 className="font-semibold mb-6">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <Link 
                      href={link.href}
                      className="text-white/80 hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-white/60 text-sm">
              © {new Date().getFullYear()} All rights reserved. • H2oHero
            </div>
          <div className="text-white/60 text-sm flex items-center gap-2">
            Made with <span className="text-red-500">❤</span> by WebX-Solution.de
          </div>
          </div>
        </div>
      </div>
    </footer>
  );
}