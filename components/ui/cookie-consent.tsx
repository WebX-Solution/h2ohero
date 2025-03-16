'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { Shield } from 'lucide-react';

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false);

  useEffect(() => {
    // Check if user has already consented
    const hasConsented = localStorage.getItem('cookieConsent');
    if (!hasConsented) {
      setShowConsent(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem('cookieConsent', 'true');
    setShowConsent(false);
  };

  if (!showConsent) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-[#002b56]/10 p-4 shadow-lg z-50 animate-fade-up">
      <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-[#002b56]/10 flex items-center justify-center flex-shrink-0">
            <Shield className="w-5 h-5 text-[#002b56]" />
          </div>
          <p className="text-sm text-[#002b56]/70">
            Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung auf unserer Website zu bieten.{' '}
            <Link 
              href="/datenschutz" 
              className="text-[#002b56] hover:underline font-medium"
            >
              Mehr erfahren
            </Link>
          </p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
            onClick={() => setShowConsent(false)}
          >
            Ablehnen
          </Button>
          <Button
            className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
            onClick={handleAccept}
          >
            Akzeptieren
          </Button>
        </div>
      </div>
    </div>
  );
}