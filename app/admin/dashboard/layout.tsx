'use client';

import { useState, memo, useMemo, useCallback, Suspense } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useRouter } from 'next/navigation';
import { 
  Calendar, 
  Users, 
  FolderTree,
  BookOpen,
  Settings, 
  LogOut,
  Menu,
  X,
  Loader2
} from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const navigation = [
  { name: 'Kurse', href: '/admin/dashboard/courses', icon: Calendar },
  { name: 'Kategorien', href: '/admin/dashboard/categories', icon: FolderTree },
  { name: 'Buchungen', href: '/admin/dashboard/bookings', icon: Users },
  {
    name: 'Blog',
    href: '/admin/dashboard/blog',
    icon: BookOpen,
    subItems: [
      { name: 'Beiträge', href: '/admin/dashboard/blog' },
      { name: 'Kategorien', href: '/admin/dashboard/blog/categories' }
    ]
  },
  { name: 'Einstellungen', href: '/admin/dashboard/settings', icon: Settings },
];

// Memoize navigation data
const navigationItems = navigation.map(item => ({
  ...item,
  Icon: memo(item.icon)
}));

// Memoize navigation items to prevent unnecessary re-renders
const NavigationItem = memo(({ item, pathname, onClick }: {
  item: typeof navigation[0],
  pathname: string,
  onClick: () => void
}) => {
  const Icon = useMemo(() => item.icon, [item.icon]);
  return (
    <Link
      href={item.href}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-[#002b56] transition-colors",
        pathname === item.href 
          ? "bg-[#002b56]/10 text-[#002b56]" 
          : "hover:bg-[#002b56]/5"
      )}
      onClick={onClick}
    >
      <Icon className="h-5 w-5" />
      {item.name}
    </Link>
  );
});

NavigationItem.displayName = 'NavigationItem';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();
  const supabase = createClientComponentClient();
  
  const handleLogout = useCallback(async () => {
    await supabase.auth.signOut();
    router.push('/admin/login');
  }, [supabase, router]);

  const toggleSidebar = useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div>
      <div className="lg:hidden fixed top-0 left-0 right-0 z-50 flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="absolute inset-0 bg-white/80 backdrop-blur-sm z-[-1]" />
        <button
          type="button" 
          className="text-[#002b56]"
          onClick={toggleSidebar}
        >
          {sidebarOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
        <div className="text-[#002b56] font-semibold">Admin Dashboard</div>
        <div className="w-6" /> {/* Spacer for alignment */}
      </div>

      <div className="lg:fixed lg:inset-y-0 lg:flex lg:w-64 lg:flex-col">
        <div className={cn(
          "fixed inset-0 z-40 flex flex-col bg-white border-r border-gray-200 p-6 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0",
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        )}>
          <div className="flex items-center justify-between mb-8">
            <div className="text-xl font-bold text-[#002b56]">Admin Panel</div>
          </div>

          <nav className="flex-1 space-y-2">
            {navigation.map((item) => {
              return (
                <NavigationItem
                  key={item.name}
                  item={item}
                  pathname={pathname}
                  onClick={() => setSidebarOpen(false)}
                />
              );
            })}
          </nav>

          <div className="mt-auto pt-4 border-t border-gray-200">
            <Button
              variant="ghost"
              className="w-full justify-start text-[#002b56] hover:bg-[#002b56]/5"
              onClick={handleLogout}
            >
              <LogOut className="mr-3 h-5 w-5" />
              Logout
            </Button>
          </div>
        </div>
      </div>

      <div className="lg:pl-64">
        <main className="min-h-screen py-20 lg:py-8 px-4 md:px-8 bg-white relative">
          <div className="max-w-7xl mx-auto">
            <Suspense fallback={
              <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="w-8 h-8 text-[#002b56] animate-spin" />
              </div>
            }>
              {children}
            </Suspense>
          </div>
        </main>
      </div>
    </div>
  );
}