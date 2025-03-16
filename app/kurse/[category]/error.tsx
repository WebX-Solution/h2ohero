'use client';

import { useEffect } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-white">
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-bold text-[#002b56] mb-4">
          Ein Fehler ist aufgetreten
        </h2>
        <p className="text-[#002b56]/80 max-w-md mx-auto">
          Beim Laden der Kurse ist ein Fehler aufgetreten. 
          Bitte versuchen Sie es später erneut oder kontaktieren Sie unseren Support.
        </p>
      </div>
      <div className="flex gap-4">
        <Button
          onClick={reset}
          className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
        >
          Erneut versuchen
        </Button>
        <Button
          asChild
          variant="outline"
          className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
        >
          <Link href="/">
            Zurück zur Startseite
          </Link>
        </Button>
      </div>
    </div>
  );
}