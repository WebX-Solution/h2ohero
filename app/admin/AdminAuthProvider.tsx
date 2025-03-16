'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { authService } from '@/lib/auth';
import { Loader2, AlertCircle } from 'lucide-react';
const INITIAL_RETRY_DELAY = 2000; // 2 seconds base delay

export function AdminAuthProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);
  const [sessionError, setSessionError] = useState<string | null>(null);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    let timer: NodeJS.Timeout;

    const checkAuth = async () => {
      try {
        const { data: { session } } = await authService.getSession() || {};
        const pathname = window.location.pathname;
        const isLoginPage = pathname === '/admin/login';
        const isDashboardPage = pathname.startsWith('/admin/dashboard');

        if (!session && isDashboardPage) {
          await router.replace('/admin/login');
        } else if (session && isLoginPage) {
          await router.replace('/admin/dashboard');
        }
      } catch (error) {
        console.error('Auth check error:', error);
        setSessionError('Ein Fehler ist aufgetreten');
      } finally {
        setIsLoading(false);
        setIsInitialized(true);
      }
    };

    // Initial check
    checkAuth();

    // Set up periodic checks
    timer = setInterval(checkAuth, 30000);

    // Set up auth state change listener
    const { data: { subscription } } = authService.onAuthStateChange(
      async (event, session) => {
        if (event === 'SIGNED_IN') {
          await router.replace('/admin/dashboard');
        } else if (event === 'SIGNED_OUT') {
          await router.replace('/admin/login');
        }
      }
    );

    return () => {
      clearInterval(timer);
      subscription.unsubscribe();
    };
  }, [mounted, router]);

  if (!mounted || !isInitialized) return null;

  if (isLoading && isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white">
        <div className="flex flex-col items-center gap-4 text-center">
          <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
          {sessionError && (
            <div className="flex items-center gap-2 text-red-500">
              <AlertCircle className="w-4 h-4" />
              <span>{sessionError}</span>
            </div>
          )}
        </div>
      </div>
    );
  }

  return <div suppressHydrationWarning>{children}</div>;
}