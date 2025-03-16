'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Logo } from '@/components/ui/logo'; 
import { Loader2, AlertCircle, Lock, Mail } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import type { Database } from '@/types/supabase';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const supabase = createClientComponentClient<Database>();
  
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      if (!data.session) throw new Error('No session');

      router.push('/admin/dashboard');
    } catch (error: unknown) {
      const authError = error as { message: string };
      setError(
        authError.message === 'Invalid login credentials'
          ? 'Die eingegebenen Anmeldedaten sind ungültig.'
          : 'Ein Fehler ist aufgetreten. Bitte versuchen Sie es später erneut.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block relative w-1/2">
        <Image
          src="https://images.unsplash.com/photo-1682687982501-1e58ab814714"
          alt="Swimming Pool"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#002b56]/90 to-[#002b56]/60" />
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="max-w-md">
            <h2 className="text-3xl font-bold text-white mb-4">
              Willkommen im Administrationsbereich
            </h2>
            <p className="text-white/80 text-lg">
              Verwalten Sie Ihre Schwimmkurse, Buchungen und mehr in einem
              zentralen Dashboard.
            </p>
          </div>
        </div>
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          <div className="text-center mb-8">
            <Logo size="lg" className="mx-auto mb-6" />
            <h1 className="text-2xl font-bold text-[#002b56] mb-2">
              Admin Login
            </h1>
            <p className="text-[#002b56]/60">
              Bitte melden Sie sich mit Ihren Zugangsdaten an
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-[#002b56]/40 w-5 h-5" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="E-Mail Adresse"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-[#002b56]/5 border-[#002b56]/10 text-[#002b56] placeholder:text-[#002b56]/40"
                    required
                  />
                </div>
              </div>

              <div>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-[#002b56]/40 w-5 h-5" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Passwort"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-[#002b56]/5 border-[#002b56]/10 text-[#002b56] placeholder:text-[#002b56]/40"
                    required
                  />
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 text-red-500 p-4 rounded-lg flex items-start gap-3">
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            <Button
              type="submit"
              className="w-full bg-[#002b56] hover:bg-[#002b56]/90 text-white py-6"
              disabled={isLoading}
            >
              {isLoading && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isLoading ? 'Anmeldung...' : 'Anmelden'}
            </Button>
          </form>

          <div className="mt-6 text-center">
            <Link
              href="/"
              className="text-[#002b56]/60 hover:text-[#002b56] text-sm transition-colors"
            >
              Zurück zur Website
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}