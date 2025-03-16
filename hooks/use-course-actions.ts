import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { toast } from 'sonner';
import { useCallback } from 'react';

type Course = Database['public']['Tables']['courses']['Row'];
type CourseInsert = Database['public']['Tables']['courses']['Insert'];
type CourseUpdate = Database['public']['Tables']['courses']['Update'];

export function useCourseActions() {
  const supabase = createClientComponentClient<Database>();

  const createCourse = useCallback(async (course: CourseInsert) => {
    try {
      const { data, error } = await supabase
        .from('courses').insert({
          ...course,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        }).select().single();

      if (error) throw error;
      toast.success('Kurs erfolgreich erstellt');
      return data;
    } catch (error: any) {
      toast.error('Fehler beim Erstellen des Kurses');
      throw error;
    }
  }, [supabase]);

  const updateCourse = useCallback(async (id: string, updates: CourseUpdate) => {
    try {
      // Add updated_at timestamp
      const updatedCourse = {
        ...updates,
        updated_at: new Date().toISOString()
      };

      const { data, error } = await supabase
        .from('courses')
        .update(updatedCourse)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      toast.success('Kurs erfolgreich aktualisiert');
      return data;
    } catch (error: any) {
      toast.error('Fehler beim Aktualisieren des Kurses');
      throw error;
    }
  }, [supabase]);

  const deleteCourse = useCallback(async (id: string) => {
    try {
      // Check if course exists first
      const { data: course, error: fetchError } = await supabase
        .from('courses')
        .select()
        .eq('id', id)
        .single();

      if (fetchError) throw fetchError;
      if (!course) throw new Error('Kurs nicht gefunden');

      const { error } = await supabase
        .from('courses')
        .delete()
        .eq('id', id);

      if (error) throw error;
    } catch (error: any) {
      throw error;
    }
  }, [supabase]);

  const getCourse = useCallback(async (id: string) => {
    try {
      const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error: any) {
      toast.error('Fehler beim Laden des Kurses');
      throw error;
    }
  }, [supabase]);

  return {
    createCourse,
    updateCourse,
    deleteCourse,
    getCourse
  };
}