'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo';
import { Menu, X, ChevronDown, ChevronRight, Mail, Phone } from 'lucide-react';
import { cn } from '@/lib/utils';

const NAVIGATION_ITEMS = [
  { name: 'Start', href: '/' },
  { name: 'Über uns', href: '/about' },
  { name: 'Schwimmkurse', href: '/kurse/2026-2-12' },
  { name: 'Blog', href: '/blog' },
  { name: 'Karriere', href: '/karriere' }
];

const SERVICES = [
  {
    title: 'Coaching',
    description: 'Persönliche Entwicklung und Wachstum',
    href: '/coaching',
    category: 'Beratung'
  },
  {
    title: 'Mentoring',
    description: 'Karrierebegleitung und Expertise',
    href: '/mentoring',
    category: 'Beratung'
  },
  {
    title: 'Technische Betreuung',
    description: 'Optimierung von Bäderanlagen',
    href: '/technische-betreuung',
    category: 'Technisch'
  },
  {
    title: 'Ein- und Auswinterung',
    description: 'Saisonale Anlagenpflege',
    href: '/ein-auswinterung',
    category: 'Technisch'
  },
  {
    title: 'Aufsichtspersonal',
    description: 'Qualifizierte Bäderaufsicht',
    href: '/aufsichtspersonal',
    category: 'Personal'
  },
  {
    title: 'Vorträge & Seminare',
    description: 'Weiterbildung und Wissenstransfer',
    href: '/vortraege-seminare',
    category: 'Beratung'
  }
];

const CATEGORIES = ['Technisch', 'Beratung', 'Personal'];

export default function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState<boolean>(false);
  const [scrolled, setScrolled] = useState<boolean>(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    if (typeof window !== 'undefined') {
      setMounted(true);
      window.addEventListener('scroll', handleScroll, { passive: true });
      handleScroll();

      return () => {
        window.removeEventListener('scroll', handleScroll);
      };
    }
  }, []);

  if (!mounted) {
    return null;
  }
  return (
    <nav 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-sm border-b border-[#002b56]/10"
          : "bg-white/50 backdrop-blur-sm",
        scrolled ? "py-2" : "py-3"
      )}
      suppressHydrationWarning
    > 
      {/* Top Bar - Only visible when not scrolled */}
      <div 
        className={cn(
          "hidden lg:block bg-[#002b56] text-white transition-all duration-500 overflow-hidden",
          scrolled ? "h-0" : "h-10"
        )}
      > 
        <div className="max-w-7xl mx-auto px-8 h-full">
          <div className="flex items-center justify-end gap-8 h-full text-sm">
            <a href="tel:+491234567890" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Phone className="w-4 h-4" />
              +49 (0) 123 456 7890
            </a>
            <a href="mailto:info@h2ohero.de" className="flex items-center gap-2 hover:text-white/80 transition-colors">
              <Mail className="w-4 h-4" />
              info@h2ohero.de
            </a>
          </div>
        </div>
      </div>

      {/* Main Navigation */}
      <div className="max-w-7xl mx-auto px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link 
            href="/" 
            className="relative z-50 group"
            onClick={() => setMobileMenuOpen(false)}
          >
            <div className={cn(
              "relative overflow-hidden rounded-lg transition-all duration-300",
              scrolled ? "w-20 h-20" : "w-16 h-16"
            )}>
              <Image
                src="/h2ohero_Logo.png"
                alt="H2oHero Logo"
                fill
                className="object-cover"
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center justify-center relative ml-12">
            <div className="flex items-center gap-8">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "relative py-2 text-sm font-medium transition-colors",
                    "group",
                    scrolled
                      ? pathname === item.href
                        ? "text-[#002b56]"
                        : "text-[#002b56]/70 hover:text-[#002b56]"
                      : pathname === item.href
                        ? "text-[#002b56]"
                        : "text-[#002b56]/70 hover:text-[#002b56]"
                  )}
                >
                  {item.name}
                  <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                    "bg-[#002b56]",
                    pathname === item.href && "scale-x-100" 
                  )} />
                </Link>
              ))}
              
              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setServicesOpen(true)}
                onMouseLeave={() => setServicesOpen(false)}
              >
                <button
                  className={cn(
                    "flex items-center gap-1 py-2 text-sm font-medium transition-colors",
                    "group",
                    scrolled
                      ? servicesOpen
                        ? "text-[#002b56]"
                        : "text-[#002b56]/70 hover:text-[#002b56]"
                      : servicesOpen
                        ? "text-[#002b56]"
                        : "text-[#002b56]/70 hover:text-[#002b56]"
                  )}
                >
                  <span>Leistungen</span>
                  <ChevronDown className={cn(
                    "w-4 h-4 transition-transform duration-300",
                    servicesOpen && "rotate-180"
                  )} />
                  <span className={cn(
                    "absolute inset-x-0 bottom-0 h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-300",
                    "bg-[#002b56]",
                    servicesOpen && "scale-x-100"
                  )} />
                </button>

                {/* Mega Menu */}
                <div className={cn(
                  "absolute top-full left-1/2 -translate-x-1/2 pt-4 opacity-0 pointer-events-none transition-all duration-300 transform translate-y-2",
                  servicesOpen && "opacity-100 pointer-events-auto translate-y-0"
                )}>
                  <div className="w-[900px] bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl border border-[#002b56]/10 overflow-hidden">
                    <div className="p-8">
                      {/* Categorized Services */}
                      <div className="grid grid-cols-4 gap-12">
                        {CATEGORIES.map((category) => (
                          <div key={category}>
                            <h3 className="font-semibold text-[#002b56] mb-6 pb-3 border-b border-[#002b56]/10">
                              {category}
                            </h3>
                            <ul className="space-y-2">
                              {SERVICES.filter(s => s.category === category).map((service) => (
                                <li key={service.title}>
                                  <Link
                                    href={service.href}
                                    className={cn(
                                      "block px-4 py-3 rounded-xl text-sm transition-all duration-300 group",
                                      "hover:bg-[#002b56]/5 hover:text-[#002b56] hover:translate-x-1",
                                      pathname === service.href
                                        ? "text-[#002b56] font-medium"
                                        : "text-[#002b56]/70"
                                    )}
                                  > 
                                    {service.title}
                                    <p className="mt-1 text-sm text-[#002b56]/50 group-hover:text-[#002b56]/70">
                                      {service.description}
                                    </p>
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-4">
            <Button
              className={cn(
                "hidden lg:flex",
                scrolled
                  ? "bg-[#002b56] hover:bg-[#002b56]/90 text-white"
                  : "bg-[#002b56] hover:bg-[#002b56]/90 text-white"
              )}
              onClick={() => {
                window.location.href = 'mailto:info@h2ohero.de';
              }}
            >
              <Mail className="w-4 h-4 mr-2" />
              Kontakt
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className={cn(
                "lg:hidden",
                "text-[#002b56]"
              )}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div 
        className={cn(
          "fixed inset-0 z-40 lg:hidden transition-all duration-300",
          mobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div 
          className={cn(
            "absolute inset-0 bg-[#002b56]/10 backdrop-blur-sm transition-opacity duration-300",
            mobileMenuOpen ? "opacity-100" : "opacity-0"
          )}
          onClick={() => setMobileMenuOpen(false)}
        />

        {/* Menu Content */}
        <div 
          className={cn(
            "absolute right-0 top-0 h-full w-full max-w-sm bg-white shadow-xl transition-transform duration-300",
            mobileMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="h-full pt-24 pb-6 px-6 overflow-y-auto">
            <div className="space-y-2">
              {NAVIGATION_ITEMS.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={cn(
                    "flex items-center px-4 py-3 rounded-lg text-[#002b56] transition-colors",
                    pathname === item.href
                      ? "bg-[#002b56]/5 font-medium"
                      : "hover:bg-[#002b56]/5"
                  )}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                  {pathname === item.href && (
                    <span className="ml-auto w-1.5 h-1.5 rounded-full bg-[#002b56]" />
                  )}
                </Link>
              ))}
            </div>

            <div className="mt-6 pt-6 border-t border-[#002b56]/10">
              <div className="px-4 mb-4">
                <h3 className="text-sm font-medium text-[#002b56]/60">Leistungen</h3>
              </div>
              <div className="space-y-2">
                {SERVICES.map((service) => (
                  <Link
                    key={service.title}
                    href={service.href}
                    className={cn(
                      "block px-4 py-3 rounded-lg transition-colors",
                      pathname === service.href
                        ? "bg-[#002b56]/5"
                        : "hover:bg-[#002b56]/5"
                    )}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="text-[#002b56] font-medium">{service.title}</div>
                      {pathname === service.href && (
                        <span className="w-1.5 h-1.5 rounded-full bg-[#002b56]" />
                      )}
                    </div>
                    <p className="mt-1 text-sm text-[#002b56]/60">{service.description}</p>
                  </Link>
                ))}
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#002b56]/10">
              <div className="space-y-4">
                <a 
                  href="tel:+491234567890"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#002b56] hover:bg-[#002b56]/5 transition-colors"
                >
                  <Phone className="w-5 h-5" />
                  <div>
                    <div className="font-medium">Telefon</div>
                    <div className="text-sm text-[#002b56]/60">+49 (0) 123 456 7890</div>
                  </div>
                </a>
                <a 
                  href="mailto:info@h2ohero.de"
                  className="flex items-center gap-3 px-4 py-3 rounded-lg text-[#002b56] hover:bg-[#002b56]/5 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <div>
                    <div className="font-medium">E-Mail</div>
                    <div className="text-sm text-[#002b56]/60">info@h2ohero.de</div>
                  </div>
                </a>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-[#002b56]/10">
              <div className="px-4">
                <Button
                  className="w-full bg-[#002b56] hover:bg-[#002b56]/90 text-white"
                  onClick={() => {
                    window.location.href = 'mailto:info@h2ohero.de';
                    setMobileMenuOpen(false);
                  }}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  Kontakt aufnehmen
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export { Navbar }