import { useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import type { Database } from '@/types/supabase';
import { useDebounce } from './use-debounce';
import { useSupabaseSubscription } from './use-supabase-subscription';
import { toast } from 'sonner';

type Course = Database['public']['Tables']['courses']['Row'];

export function useCourses(query: string = '') {
  const debouncedQuery = useDebounce(query, 300);
  const supabase = createClientComponentClient<Database>();
  const queryClient = useQueryClient();

  // Fetch courses with debounced search
  const fetchCourses = useCallback(async () => {
    let query = supabase
      .from('courses')
      .select('*')
      .order('created_at', { ascending: false });

    if (debouncedQuery) {
      query = query.ilike('title', `%${debouncedQuery}%`);
    }

    const { data, error } = await query;

    if (error) throw error;
    return data || [];
  }, [debouncedQuery, supabase]);

  const { data: courses = [], isLoading: loading, error } = useQuery({
    queryKey: ['courses', debouncedQuery],
    queryFn: fetchCourses,
    staleTime: 30 * 1000, // 30 seconds
  });

  // Real-time subscription
  useSupabaseSubscription<Course>({
    table: 'courses',
    onSubscriptionChange: ({ new: newCourse, old: oldCourse, eventType }) => {
      if (eventType === 'INSERT') {
        queryClient.setQueryData(['courses', debouncedQuery], 
          (old: Course[] = []) => [newCourse, ...old]
        );
        toast.success('Neuer Kurs wurde hinzugefügt');
      } else if (eventType === 'UPDATE') {
        queryClient.setQueryData(['courses', debouncedQuery],
          (old: Course[] = []) => old.map(course => 
            course.id === newCourse.id ? newCourse : course
          )
        );
        toast.success('Kurs wurde aktualisiert');
      } else if (eventType === 'DELETE') {
        queryClient.setQueryData(['courses', debouncedQuery],
          (old: Course[] = []) => old.filter(course => 
            course.id !== oldCourse.id
          )
        );
        toast.success('Kurs wurde gelöscht');
      }
    }
  });

  return { 
    courses, 
    loading, 
    error: error ? (error as Error).message : null 
  };
}