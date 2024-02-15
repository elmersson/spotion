import { cn } from '@/lib/utils';

interface BoxProps {
  children: React.ReactNode;
  className?: string;
}

export const Box = ({ children, className }: BoxProps) => {
  return (
    <div className={cn('h-fit w-full rounded-lg bg-neutral-900', className)}>
      {children}
    </div>
  );
};
