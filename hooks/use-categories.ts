import { useEffect, useState, useCallback } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { useSupabaseSubscription } from './use-supabase-subscription';
import { toast } from 'sonner';

type Category = Database['public']['Tables']['categories']['Row'];

export function useCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient<Database>();

  // Fetch categories
  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const { data, error } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (mounted) {
          setCategories(data || []);
        }
      } catch (err: any) {
        if (mounted) {
          setError(err.message);
        }
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    if (mounted) {
      fetchCategories();
    }

    return () => {
      mounted = false;
    };
  }, [supabase]);

  // Real-time subscription
  useSupabaseSubscription<Category>({
    table: 'categories',
    onSubscriptionChange: ({ new: newCategory, old: oldCategory, eventType }) => {
      if (eventType === 'INSERT') {
        setCategories(prev => [newCategory, ...prev]);
        toast.success('Neue Kategorie wurde hinzugefügt');
      } else if (eventType === 'UPDATE') {
        setCategories(prev => prev.map(category => 
          category.id === newCategory.id ? newCategory : category
        ));
        toast.success('Kategorie wurde aktualisiert');
      } else if (eventType === 'DELETE') {
        setCategories(prev => prev.filter(category => category.id !== oldCategory.id));
        toast.success('Kategorie wurde gelöscht');
      }
    }
  });

  return { categories, loading, error };
}