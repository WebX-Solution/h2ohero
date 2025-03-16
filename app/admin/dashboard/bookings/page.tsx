'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Users,
  Search,
  Filter,
  Eye,
  Download,
  Mail,
  Clock,
  Calendar,
  User,
  Phone,
  CreditCard
} from 'lucide-react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Input } from '@/components/ui/input';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { toast } from 'sonner';
import type { RealtimePostgresChangesPayload } from '@supabase/supabase-js';
import { Loader2, AlertCircle } from 'lucide-react';

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

type Booking = Database['public']['Tables']['bookings']['Row'] & {
  course: {
    title: string;
  } | null;
  booking_participants: {
    first_name: string;
    last_name: string;
    experience_level: string;
    notes: string | null;
  }[];
};

export default function BookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [showPayPalDetails, setShowPayPalDetails] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const supabase = createClientComponentClient<Database>();

  type BookingPayload = RealtimePostgresChangesPayload<{
    [key: string]: any;
  }>;

  useEffect(() => {
    let mounted = true;

    const fetchBookings = async () => {
      try {
        setError(null);
        const { data, error } = await supabase
          .from('bookings') 
          .select(`
            *,
            course:courses(title),
            booking_participants(
              first_name,
              last_name,
              experience_level,
              notes,
              created_at
            )
          `)
          .order('created_at', { ascending: false });

        if (error) throw error;
        if (mounted && data) {
          setBookings(data as Booking[]);
        }
      } catch (error) {
        console.error('Error fetching bookings:', error);
        setError('Fehler beim Laden der Buchungen');
        toast.error('Fehler beim Laden der Buchungen');
      } finally {
        if (mounted) {
          setLoading(false);
        }
      }
    };

    fetchBookings();

    // Subscribe to booking changes
    const bookingsSubscription = supabase
      .channel('bookings_changes')
      .on('postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings'
        },
        async (payload) => {
          if (!mounted) return;
          const oldId = (payload.old as any)?.id;
          const newId = (payload.new as any)?.id;
          
          if (payload.eventType === 'DELETE' && !oldId) return;
          if ((payload.eventType === 'INSERT' || payload.eventType === 'UPDATE') && !newId) return;

          // Fetch complete booking data with relations
          const { data } = await supabase
            .from('bookings')
            .select(`
              *,
              course:courses(title),
              booking_participants(
                first_name,
                last_name,
                experience_level,
                notes
              )
            `)
            .eq('id', payload.eventType === 'DELETE' ? payload.old.id : payload.new.id)
            .single();

          if (payload.eventType === 'INSERT' && data) {
            setBookings(prev => [data as Booking, ...prev]);
            toast.success('Neue Buchung eingegangen');
          } else if (payload.eventType === 'UPDATE' && data) {
            setBookings(prev =>
              prev.map(booking =>
                booking.id === payload.new.id ? (data as Booking) : booking
              )
            );
            toast.success('Buchung wurde aktualisiert');
          } else if (payload.eventType === 'DELETE' && payload.old?.id) {
            setBookings(prev => 
              prev.filter(booking => booking.id !== payload.old.id)
            );
            toast.success('Buchung wurde gelöscht');
          }
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      supabase.removeChannel(bookingsSubscription);
    };
  }, [supabase]);

  const filteredBookings = bookings.filter(booking => 
    booking.course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.user_email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    booking.id?.toString().includes(searchTerm)
  );

  const getStatusBadgeColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return 'bg-green-500/20 text-green-500';
      case 'pending':
        return 'bg-yellow-500/20 text-yellow-500';
      case 'cancelled':
        return 'bg-red-500/20 text-red-500';
      default:
        return 'bg-gray-500/20 text-gray-500';
    }
  };

  const formatPaymentStatus = (status: string) => {
    switch (status.toLowerCase()) {
      case 'paid':
        return 'Bezahlt';
      case 'pending':
        return 'Ausstehend';
      case 'failed':
        return 'Fehlgeschlagen';
      default:
        return status;
    }
  };
  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Buchungen</h1>
        <p className="text-gray-400">Verwalten Sie alle Kursbuchungen an einem Ort.</p>
      </div>

      <div className="mb-6 flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            placeholder="Suche nach Buchungs-ID, Kurs oder E-Mail..."
            className="pl-10 bg-[#0D1526] border-[#00A3FF]/20 text-white placeholder:text-gray-400"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Button className="bg-[#00A3FF] hover:bg-[#0088FF]">
          <Download className="w-4 h-4 mr-2" />
          Export
        </Button>
      </div>

      <div className="rounded-lg border border-[#00A3FF]/20 overflow-hidden">
        <Table>
          <TableHeader className="bg-[#0D1526]">
            <TableRow>
              <TableHead className="text-white">Buchungs-ID</TableHead>
              <TableHead className="text-white">Kurs</TableHead>
              <TableHead className="text-white">E-Mail</TableHead>
              <TableHead className="text-white">Buchungsdatum</TableHead>
              <TableHead className="text-white">Teilnehmer</TableHead>
              <TableHead className="text-white">Status</TableHead>
              <TableHead className="text-white">Zahlungsstatus</TableHead>
              <TableHead className="text-white">Aktionen</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <Loader2 className="w-6 h-6 text-[#002b56] animate-spin mx-auto" />
                </TableCell>
              </TableRow>
            ) : error ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center py-8">
                  <div className="flex items-center justify-center gap-2 text-red-500">
                    <AlertCircle className="w-5 h-5" />
                    <span>{error}</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : filteredBookings.length === 0 ? (
              <TableRow>
                <TableCell colSpan={8} className="text-center text-[#002b56]/60 py-8">
                  {searchTerm ? 'Keine Ergebnisse gefunden' : 'Keine Buchungen vorhanden'}
                </TableCell>
              </TableRow>
            ) : (
              filteredBookings.map((booking) => (
              <TableRow key={booking.id} className="border-[#00A3FF]/20">
                <TableCell className="text-[#002b56]">#{booking.id}</TableCell>
                <TableCell className="text-[#002b56] max-w-[200px] truncate">{booking.course?.title}</TableCell>
                <TableCell className="text-[#002b56]">{booking.user_email}</TableCell>
                <TableCell className="text-[#002b56]">{new Date(booking.created_at).toLocaleDateString()}</TableCell>
                <TableCell className="text-[#002b56]">{booking.num_participants}</TableCell>
                <TableCell className="text-white">
                  <span className={`px-2 py-1 rounded-full ${getStatusBadgeColor(booking.status)} text-sm`}>
                    {booking.status}
                  </span>
                </TableCell>
                <TableCell className="text-[#002b56]">{formatPaymentStatus(booking.payment_status)}</TableCell>
                <TableCell className="text-[#002b56]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="hover:bg-[#00A3FF]/10 text-[#002b56]"
                    onClick={() => setSelectedBooking(booking)}
                  >
                    <Eye className="w-4 h-4" />
                  </Button>
                </TableCell>
              </TableRow>
            )))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedBooking} onOpenChange={() => setSelectedBooking(null)}>
        <DialogContent className="bg-[#0D1526] text-white border-[#00A3FF]/20 max-w-2xl">
          <DialogHeader>
            <DialogTitle>Buchung #{selectedBooking?.id}</DialogTitle>
          </DialogHeader>
          
          {selectedBooking && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <User className="w-4 h-4 text-[#00A3FF]" />
                    Kundendetails
                  </h3>
                  <div className="space-y-2">
                    <p>Name: {selectedBooking.user_name}</p>
                    <p>Email: {selectedBooking.user_email}</p>
                    <p>Telefon: {selectedBooking.user_phone}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-[#00A3FF]" />
                    Buchungsdetails
                  </h3>
                  <div className="space-y-2">
                    <p>Kurs: {selectedBooking.course?.title}</p>
                    <p>Datum: {new Date(selectedBooking.created_at).toLocaleString()}</p>
                    <p>Status: {selectedBooking.status}</p>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <Users className="w-4 h-4 text-[#00A3FF]" />
                  Teilnehmer
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {selectedBooking.booking_participants.map((participant, index) => (
                    <div
                      key={index}
                      className="p-4 rounded-lg bg-[#0B1121] border border-[#00A3FF]/20"
                    >
                      <p className="text-sm text-gray-400 mb-2">Teilnehmer {index + 1}</p>
                      <p>{participant.first_name} {participant.last_name}</p>
                      <p className="text-sm text-gray-400 mt-2">Erfahrung: {participant.experience_level}</p>
                      {participant.notes && (
                        <p className="text-sm text-gray-400 mt-2">Notizen: {participant.notes}</p>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-semibold flex items-center gap-2">
                  <CreditCard className="w-4 h-4 text-[#00A3FF]" />
                  Zahlungsdetails
                </h3>
                <div className="p-4 rounded-lg bg-[#0B1121] border border-[#00A3FF]/20">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-400">Zahlungsmethode</p>
                      <div className="flex items-center gap-2">
                        <p>{selectedBooking.payment_method}</p>
                        {selectedBooking.payment_data && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-[#00A3FF] hover:bg-[#00A3FF]/10 h-6 px-2"
                            onClick={() => setShowPayPalDetails(!showPayPalDetails)}
                          >
                            {showPayPalDetails ? 'Details ausblenden' : 'Details anzeigen'}
                          </Button>
                        )}
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Status</p>
                      <p>{selectedBooking.payment_status}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-400">Gesamtbetrag</p>
                      <p>{selectedBooking.total_amount.toFixed(2)}€</p>
                    </div>
                    {selectedBooking.payment_id && (
                      <div>
                        <p className="text-sm text-gray-400">Transaktions-ID</p>
                        <p className="font-mono text-sm">{selectedBooking.payment_id}</p>
                      </div>
                    )}
                  </div>
                  
                  {showPayPalDetails && selectedBooking.payment_data && (
                    <div className="mt-4 pt-4 border-t border-[#00A3FF]/20">
                      <h4 className="text-sm font-medium mb-3">PayPal Transaktionsdetails</h4>
                      <div className="bg-[#0D1526] rounded-lg p-4 font-mono text-sm overflow-x-auto">
                        <pre className="whitespace-pre-wrap text-[#00A3FF]">
                          {JSON.stringify(selectedBooking.payment_data, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div className="flex gap-4">
                <Button className="bg-[#00A3FF] hover:bg-[#0088FF]">
                  <Mail className="w-4 h-4 mr-2" />
                  E-Mail senden
                </Button>
                <Button variant="outline" className="border-[#00A3FF]/20 text-white hover:bg-[#00A3FF]/10">
                  <Download className="w-4 h-4 mr-2" />
                  PDF exportieren
                </Button>
                {selectedBooking.payment_method === 'PayPal' && (
                  <Button
                    variant="outline"
                    className="border-[#00A3FF]/20 text-white hover:bg-[#00A3FF]/10 ml-auto"
                    onClick={() => window.open(`https://www.paypal.com/activity/payment/${selectedBooking.payment_id}`, '_blank')}
                  >
                    PayPal Transaktion öffnen
                  </Button>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}