'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Bell, 
  Mail, 
  Shield, 
  Key,
  Save,
  Loader2
} from 'lucide-react';

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [bookingNotifications, setBookingNotifications] = useState(true);
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    // Simulate saving
    await new Promise(resolve => setTimeout(resolve, 1000));
    setLoading(false);
    router.refresh();
  };

  return (
    <div className="text-white">
      <div className="mb-8">
        <h1 className="text-2xl font-bold mb-2">Einstellungen</h1>
        <p className="text-gray-400">Verwalten Sie Ihre Administrationseinstellungen.</p>
      </div>

      <Tabs defaultValue="notifications" className="space-y-6">
        <TabsList className="bg-[#0D1526] border-[#00A3FF]/20">
          <TabsTrigger 
            value="notifications"
            className="data-[state=active]:bg-[#00A3FF] data-[state=active]:text-white"
          >
            Benachrichtigungen
          </TabsTrigger>
          <TabsTrigger 
            value="security"
            className="data-[state=active]:bg-[#00A3FF] data-[state=active]:text-white"
          >
            Sicherheit
          </TabsTrigger>
        </TabsList>

        <TabsContent value="notifications" className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-[#0D1526] rounded-lg border border-[#00A3FF]/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A3FF]/20 flex items-center justify-center">
                    <Mail className="w-5 h-5 text-[#00A3FF]" />
                  </div>
                  <div>
                    <Label className="text-white">E-Mail-Benachrichtigungen</Label>
                    <p className="text-sm text-gray-400">Erhalten Sie E-Mail-Benachrichtigungen über wichtige Systemereignisse.</p>
                  </div>
                </div>
                <Switch
                  checked={emailNotifications}
                  onCheckedChange={setEmailNotifications}
                />
              </div>

              <div className="flex items-center justify-between p-4 bg-[#0D1526] rounded-lg border border-[#00A3FF]/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A3FF]/20 flex items-center justify-center">
                    <Bell className="w-5 h-5 text-[#00A3FF]" />
                  </div>
                  <div>
                    <Label className="text-white">Buchungsbenachrichtigungen</Label>
                    <p className="text-sm text-gray-400">Benachrichtigungen über neue Kursbuchungen.</p>
                  </div>
                </div>
                <Switch
                  checked={bookingNotifications}
                  onCheckedChange={setBookingNotifications}
                />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="security" className="space-y-6">
          <div className="grid gap-6">
            <div className="space-y-4">
              <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00A3FF]/20">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A3FF]/20 flex items-center justify-center">
                    <Key className="w-5 h-5 text-[#00A3FF]" />
                  </div>
                  <div>
                    <Label className="text-white">Passwort ändern</Label>
                    <p className="text-sm text-gray-400">Aktualisieren Sie Ihr Administratorpasswort.</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="current-password">Aktuelles Passwort</Label>
                    <Input
                      id="current-password"
                      type="password"
                      className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-password">Neues Passwort</Label>
                    <Input
                      id="new-password"
                      type="password"
                      className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-password">Passwort bestätigen</Label>
                    <Input
                      id="confirm-password"
                      type="password"
                      className="bg-[#0B1121] border-[#00A3FF]/20 text-white mt-2"
                    />
                  </div>
                </div>
              </div>

              <div className="p-4 bg-[#0D1526] rounded-lg border border-[#00A3FF]/20">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-[#00A3FF]/20 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-[#00A3FF]" />
                  </div>
                  <div>
                    <Label className="text-white">Zwei-Faktor-Authentifizierung</Label>
                    <p className="text-sm text-gray-400">Erhöhen Sie die Sicherheit Ihres Kontos.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <div className="mt-8">
        <Button 
          onClick={handleSave}
          className="bg-[#00A3FF] hover:bg-[#0088FF]"
          disabled={loading}
        >
          {loading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              Speichern...
            </>
          ) : (
            <>
              <Save className="w-4 h-4 mr-2" />
              Einstellungen speichern
            </>
          )}
        </Button>
      </div>
    </div>
  );
}