'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center gap-6 px-4 bg-white">
      <div className="text-center max-w-lg">
        <h2 className="text-2xl font-bold text-[#002b56] mb-4">
          Blogbeitrag nicht gefunden
        </h2>
        <p className="text-[#002b56]/80 max-w-md mx-auto">
          Der gesuchte Blogbeitrag wurde nicht gefunden oder wurde möglicherweise entfernt.
        </p>
      </div>
      <Button
        asChild
        className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
      >
        <Link href="/blog">
          Zurück zum Blog
        </Link>
      </Button>
    </div>
  );
}