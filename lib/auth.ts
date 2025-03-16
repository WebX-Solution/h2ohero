import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import type { Database } from '@/types/supabase';
import { toast } from 'sonner';

class AuthService {
  private supabase = createClientComponentClient<Database>();
  private sessionPromise: Promise<any> | null = null;
  private lastCheck = 0;
  private minInterval = 2000; // Minimum 2 seconds between checks
  
  async getSession() {
    const now = Date.now();
    
    // Prevent multiple simultaneous session checks
    if (this.sessionPromise) {
      return this.sessionPromise;
    }
    
    // Enforce minimum interval between checks
    if (now - this.lastCheck < this.minInterval) {
      return null;
    }
    
    this.lastCheck = now;
    
    try {
      this.sessionPromise = this.supabase.auth.getSession();
      const result = await this.sessionPromise;
      return result;
    } catch (error) {
      console.error('Session check failed:', error);
      return null;
    } finally {
      this.sessionPromise = null;
    }
  }

  async signIn(email: string, password: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) throw error;
      return data;
    } catch (error: any) {
      const message = error.message === 'Invalid login credentials'
        ? 'Ungültige Anmeldedaten'
        : 'Ein Fehler ist aufgetreten';
      toast.error(message);
      throw error;
    }
  }

  async signOut() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Sign out failed:', error);
      toast.error('Fehler beim Abmelden');
      throw error;
    }
  }

  onAuthStateChange(callback: (event: string, session: any) => void) {
    return this.supabase.auth.onAuthStateChange(callback);
  }
}

export const authService = new AuthService();