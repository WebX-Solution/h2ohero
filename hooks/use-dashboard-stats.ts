import { useEffect, useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'; 
import type { Database } from '@/types/supabase'; 

interface DashboardStats {
  activeCourses: number;
  openBookings: number;
  totalParticipants: number;
  loading: boolean;
  error: string | null;
}

export function useDashboardStats() {
  const [stats, setStats] = useState<DashboardStats>({
    activeCourses: 0,
    openBookings: 0,
    totalParticipants: 0,
    loading: true,
    error: null
  });
  
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    let mounted = true;

    const fetchStats = async () => {
      try {
        // Get active courses count
        const { count: activeCourses, error: coursesError } = await supabase
          .from('courses')
          .select('*', { count: 'exact', head: true })
          .eq('is_active', true);

        if (coursesError) throw coursesError;

        // Get open bookings count
        const { count: openBookings, error: bookingsError } = await supabase
          .from('bookings')
          .select('*', { count: 'exact', head: true })
          .eq('status', 'pending');

        if (bookingsError) throw bookingsError;

        // Get total participants
        const { data: bookings, error: participantsError } = await supabase
          .from('bookings')
          .select('num_participants');

        if (participantsError) throw participantsError;

        const totalParticipants = bookings?.reduce((sum, booking) => sum + (booking.num_participants || 0), 0) || 0;

        if (mounted) { 
          setStats({
            activeCourses: activeCourses ?? 0,
            openBookings: openBookings ?? 0,
            totalParticipants,
            loading: false,
            error: null
          });
        }
      } catch (error: any) {
        console.error('Error fetching dashboard stats:', error);
        if (mounted) {
          setStats(prev => ({
            ...prev,
            loading: false,
            error: error.message
          }));
        }
      }
    };

    fetchStats(); 
    
    return () => {
      mounted = false;
    };
  }, [supabase]);
  return stats;
}