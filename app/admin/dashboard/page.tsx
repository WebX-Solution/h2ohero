'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Calendar, Users, Clock, Loader2 } from 'lucide-react';
import { useDashboardStats } from '@/hooks/use-dashboard-stats';
import { Skeleton } from '@/components/ui/skeleton';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';

function StatCard({ 
  title, 
  value, 
  icon: Icon,
  loading,
  error 
}: { 
  title: string;
  value: number;
  icon: React.ElementType;
  loading: boolean;
  error: string | null;
}) {
  return (
    <div className="bg-[#0D1526] p-6 rounded-xl border border-[#00A3FF]/20">
      <div className="flex items-center gap-4 mb-4">
        <div className="w-12 h-12 rounded-full bg-[#00A3FF]/20 flex items-center justify-center">
          <Icon className="w-6 h-6 text-[#00A3FF]" />
        </div>
        <h3 className="text-lg font-semibold">{title}</h3>
      </div>
      
      {loading ? (
        <Skeleton className="h-10 w-20 bg-[#0B1121]" />
      ) : error ? (
        <p className="text-red-500 text-sm">Fehler beim Laden</p>
      ) : (
        <p className="text-3xl font-bold text-[#00A3FF]">{value}</p>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const [initialized, setInitialized] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { activeCourses, openBookings, totalParticipants, loading, error } = useDashboardStats();
  const router = useRouter();

    const supabase = createClientComponentClient<Database>();
  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;

    const checkSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        router.replace('/admin/login');
        return;
      }
      setInitialized(true);
    };

    if (!initialized && mounted) {
      checkSession().catch(console.error);
    }
  }, [initialized, mounted, router, supabase.auth]);

  if (!mounted || !initialized) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
      </div>
    );
  }

  return (
    <div className="text-[#002b56]">
      <div className="mb-8 text-[#002b56]">
        <h1 className="text-2xl font-bold mb-2 text-[#002b56]">Dashboard</h1>
        <p className="text-[#002b56]/60">Willkommen im Admin-Bereich.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <StatCard
          title="Aktive Kurse"
          value={activeCourses}
          icon={Calendar}
          loading={loading}
          error={error}
        />
        
        <StatCard
          title="Offene Buchungen"
          value={openBookings}
          icon={Clock}
          loading={loading}
          error={error}
        />
        
        <StatCard
          title="Teilnehmer Gesamt"
          value={totalParticipants}
          icon={Users}
          loading={loading}
          error={error}
        />
      </div>
    </div>
  );
}