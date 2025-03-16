'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white">
      <div className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0">
          <Image
            src="https://images.unsplash.com/photo-1600965962361-9035dbfd1c50"
            alt="404 Background"
            fill
            className="object-cover opacity-20"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-white via-white/95 to-white" />
        </div>
        
        <div className="relative max-w-2xl mx-auto px-8 text-center">
          <h1 className="text-9xl font-bold text-[#002b56] mb-8">404</h1>
          <h2 className="text-3xl font-bold text-[#002b56] mb-4">
            Seite nicht gefunden
          </h2>
          <p className="text-[#002b56]/60 text-lg mb-8 max-w-md mx-auto">
            Die von Ihnen gesuchte Seite existiert leider nicht oder wurde möglicherweise entfernt.
          </p>
          <Button
            asChild
            className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
          >
            <Link href="/">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Zurück zur Startseite
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}