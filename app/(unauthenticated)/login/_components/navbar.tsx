'use client';

import { signIn } from 'next-auth/react';

import { ModeToggle } from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import { Logo } from './logo';

export const Navbar = async () => {
  const scrolled = useScrollTop();

  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'>
        <Button variant='ghost' size='sm' onClick={handleLogin}>
          Log in
        </Button>
        <ModeToggle />
      </div>
    </div>
  );
};
