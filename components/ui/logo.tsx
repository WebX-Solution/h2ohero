import { cn } from '@/lib/utils';

interface LogoProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

export function Logo({ size = 'md', className }: LogoProps) {
  const sizes = {
    sm: 'w-10 h-10 text-[8px]',
    md: 'w-12 h-12 text-[10px]',
    lg: 'w-16 h-16 text-[12px]'
  };

  return (
    <div 
      className={cn(
        "border-2 border-[#002b56] p-3 flex items-center justify-center transition-all duration-300",
        sizes[size],
        className
      )}
    >
      <div className="font-bold leading-none text-[#002b56]">
        WATER<br />WORLD
      </div>
    </div>
  );
}