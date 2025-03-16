import { useEffect, useRef } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import type { RealtimeChannel, RealtimePostgresChangesPayload } from '@supabase/supabase-js';

type SubscriptionCallback<T> = (payload: {
  new: T;
  old: T;
  eventType: 'INSERT' | 'UPDATE' | 'DELETE';
}) => void;

interface SubscriptionConfig<T> {
  event?: 'INSERT' | 'UPDATE' | 'DELETE' | '*';
  table: string;
  schema?: string;
  filter?: string;
  onSubscriptionChange: SubscriptionCallback<T>;
}

export function useSupabaseSubscription<T extends Record<string, any>>({
  event = '*',
  table,
  schema = 'public',
  filter,
  onSubscriptionChange
}: SubscriptionConfig<T>) {
  const supabase = createClientComponentClient<Database>();
  const channelRef = useRef<RealtimeChannel | null>(null);

  useEffect(() => {
    if (channelRef.current) {
      supabase.removeChannel(channelRef.current);
    }

    const channel = supabase
      .channel(`${table}_changes`)
      .on<RealtimePostgresChangesPayload<T>>(
        'postgres_changes' as any,
        { 
          event: event === '*' ? undefined : event,
          schema,
          table,
          filter
        },
        (payload) => {
          onSubscriptionChange({
            new: payload.new as T,
            old: payload.old as T,
            eventType: payload.eventType as 'INSERT' | 'UPDATE' | 'DELETE'
          });
        }
      )
      .subscribe((status) => {
        if (status === 'SUBSCRIBED') {
          console.debug(`Subscribed to ${table} changes`);
        }
        if (status === 'CLOSED') {
          console.debug(`Unsubscribed from ${table} changes`);
        }
        if (status === 'CHANNEL_ERROR') {
          console.error(`Error in ${table} subscription`);
        }
      });

    channelRef.current = channel;

    return () => {
      if (channelRef.current) {
        supabase.removeChannel(channelRef.current);
      }
    };
  }, [supabase, table, schema, event, filter, onSubscriptionChange]);
}