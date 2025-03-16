'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Users, Baby, ArrowRight, Info, Loader2 } from 'lucide-react';

type Category = Database['public']['Tables']['categories']['Row'];

export function SwimmingCoursesSection() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClientComponentClient<Database>();

  useEffect(() => {
    let mounted = true;

    const fetchCategories = async () => {
      try {
        const { data } = await supabase
          .from('categories')
          .select('*')
          .order('created_at', { ascending: false });

        if (mounted && data) {
          setCategories(data);
        }
      } catch (error) {
        console.error('Error fetching categories:', error);
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchCategories();

    // Subscribe to categories changes
    const categoriesSubscription = supabase
      .channel('public_categories')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'categories'
        },
        (payload) => {
          if (!mounted) return;

          if (payload.eventType === 'INSERT') {
            setCategories(prev => [payload.new as Category, ...prev]);
          } else if (payload.eventType === 'UPDATE') {
            setCategories(prev =>
              prev.map(cat =>
                cat.id === payload.new.id ? payload.new as Category : cat
              )
            );
          } else if (payload.eventType === 'DELETE') {
            setCategories(prev =>
              prev.filter(cat => cat.id !== payload.old.id)
            );
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(categoriesSubscription);
    };
  }, [supabase]);

  return (
    <section className="py-20 px-4 md:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold mb-6 text-center text-[#002b56]">Schwimmkurs-Kategorien</h2>
        <p className="text-[#002b56]/80 text-center mb-12 max-w-3xl mx-auto">
          Wählen Sie die passende Kategorie für Ihr Kind und entdecken Sie unsere verschiedenen Kursangebote.
        </p>
        
        <div className="mb-12 p-6 bg-[#002b56]/5 rounded-2xl relative z-10">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-full bg-[#002b56]/10 flex-shrink-0 flex items-center justify-center mt-1">
              <Info className="w-6 h-6 text-[#002b56]" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-[#002b56] mb-4">Hinweise zu Kursbuchungen und Absagen ab Herbst 2025</h3>
              <div className="space-y-4 text-[#002b56]/80">
                <p>
                  • Sollte die Mindestteilnehmerzahl eines Kurses nicht erreicht werden, behalten wir uns vor, den Kurs abzusagen. 
                  In diesem Fall wird der gesamte Kursbetrag erstattet.
                </p>
                <div>
                  <p className="font-medium text-[#002b56]">• Gutscheine: „Mach mit – Tauch auf!"</p>
                  <p className="mt-2">
                    Wir akzeptieren die Schwimmförderungsgutscheine „Mach mit – Tauch auf!". Der Kursbetrag muss vorab vollständig 
                    bezahlt werden. Nach Auszahlung des Gutscheins auf unser Konto erstatten wir Ihnen den Betrag zurück.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-[#002b56]/60">Keine Kategorien verfügbar</p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-8">
            {categories.map((category) => {
              const Icon = category.title.toLowerCase().includes('2-12') ? Users : Baby;
              const href = category.title.toLowerCase().includes('2026') ? '/kurse/2026-2-12' : '/kurse/2025-5-12';
              
              return (
                <Link href={href} key={category.id} className="block h-full">
                  <Card className="bg-[#002b56] rounded-2xl card-hover-effect group cursor-pointer overflow-hidden relative z-10">
                    <div className="relative h-48 w-full">
                      <Image
                        src={category.image_url || 'https://images.unsplash.com/photo-1600965962361-9035dbfd1c50'}
                        alt={category.title}
                        fill
                        className="object-cover transition-all duration-300 group-hover:scale-105 z-0 opacity-80"
                      />
                    </div>
                    <div className="p-8 flex flex-col min-h-[280px]">
                      <div className="flex items-center gap-4 mb-6">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center group-hover:bg-white/30 transition-colors">
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-bold text-white">{category.title}</h3>
                          <p className="text-white/80">Altersgruppe: {category.age_range}</p>
                        </div>
                      </div>
                      
                      <p className="text-white/80 mb-6 relative z-20 transition-opacity duration-300 flex-grow">
                        {category.description}
                      </p>
                      
                      <div className="flex items-center justify-between text-white mt-auto relative z-20">
                        <span>Zu den Kursen</span>
                        <ArrowRight className="w-5 h-5 transform group-hover:translate-x-2 transition-transform" />
                      </div>
                    </div>
                  </Card>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}