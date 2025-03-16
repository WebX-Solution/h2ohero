'use client';

import { usePathname } from 'next/navigation';
import { Suspense, useEffect } from 'react';
import { Loader2 } from 'lucide-react';
import { CookieConsent } from '@/components/ui/cookie-consent';

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  useEffect(() => {
    // Clear any stale analytics debug messages from console
    if (process.env.NODE_ENV === 'development') {
      console.clear();
    }
  }, [pathname]);
  
  return (
    <>
      <Suspense key={pathname} fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
        </div>
      }>
        <div suppressHydrationWarning>
          {children}
        </div>
        <CookieConsent />
      </Suspense>
    </>
  );
}