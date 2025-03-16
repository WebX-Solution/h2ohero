'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { toast } from 'sonner';
import type { Database } from '@/types/supabase';

type Course = Database['public']['Tables']['courses']['Row'];

interface BookingDialogProps {
  course: Course;
  isOpen: boolean;
  onClose: () => void;
  onBookingComplete: () => void;
}

export function BookingDialog({ course, isOpen, onClose, onBookingComplete }: BookingDialogProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    experienceLevel: 'none'
  });

  const supabase = createClientComponentClient<Database>();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Create booking
      const { data: booking, error: bookingError } = await supabase
        .from('bookings')
        .insert({
          course_id: course.id,
          user_email: formData.email,
          user_name: `${formData.firstName} ${formData.lastName}`,
          user_phone: formData.phone,
          num_participants: 1,
          status: 'pending',
          payment_method: 'paypal',
          payment_status: 'pending',
          total_amount: course.price
        })
        .select()
        .single();

      if (bookingError) throw bookingError;

      // Create participant
      const { error: participantError } = await supabase
        .from('booking_participants')
        .insert({
          booking_id: booking.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          experience_level: formData.experienceLevel
        });

      if (participantError) throw participantError;

      toast.success('Buchung erfolgreich erstellt');
      onBookingComplete();
      onClose();
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error('Fehler bei der Buchung: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-white">
        <DialogHeader>
          <DialogTitle>Kurs buchen</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="firstName">Vorname</Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]"
                required
              />
            </div>
            <div>
              <Label htmlFor="lastName">Nachname</Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]"
                required
              />
            </div>
          </div>

          <div>
            <Label htmlFor="email">E-Mail</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]"
              required
            />
          </div>

          <div>
            <Label htmlFor="phone">Telefon</Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
              className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]"
            />
          </div>

          <div>
            <Label htmlFor="experienceLevel">Schwimmerfahrung</Label>
            <Select 
              value={formData.experienceLevel}
              onValueChange={(value) => setFormData({ ...formData, experienceLevel: value })}
            >
              <SelectTrigger className="bg-[#002b56]/5 border-[#002b56]/20 text-[#002b56]">
                <SelectValue placeholder="Erfahrungslevel auswählen" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">Keine Erfahrung</SelectItem>
                <SelectItem value="beginner">Anfänger</SelectItem>
                <SelectItem value="intermediate">Fortgeschritten</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="border-[#002b56]/20 text-[#002b56] hover:bg-[#002b56]/5"
            >
              Abbrechen
            </Button>
            <Button
              type="submit"
              className="bg-[#002b56] hover:bg-[#002b56]/90 text-white"
              disabled={loading}
            >
              {loading ? 'Wird gebucht...' : 'Jetzt buchen'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}