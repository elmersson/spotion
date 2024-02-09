'use client';

import { useSession } from 'next-auth/react';

import { ModeToggle } from '@/components/mode-toggle';
import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';
import { useScrollTop } from '@/hooks/use-scroll-top';
import { cn } from '@/lib/utils';

import { Logo } from './logo';

export const Navbar = async () => {
  const session = useSession();
  const scrolled = useScrollTop();

  const isLoading = session.status === 'loading';
  const isAuthenticated = session.status === 'authenticated';

  return (
    <div
      className={cn(
        'fixed top-0 z-50 flex w-full items-center bg-background p-6 dark:bg-[#1F1F1F]',
        scrolled && 'border-b shadow-sm'
      )}
    >
      <Logo />
      <div className='flex w-full items-center justify-between gap-x-2 md:ml-auto md:justify-end'>
        {isLoading && <Spinner />}
        {!isAuthenticated && !isLoading && (
          <Button variant='ghost' size='sm'>
            Log in
          </Button>
        )}
        {isAuthenticated && !isLoading && (
          <Button variant='ghost' size='sm'>
            Enter Spotion
          </Button>
        )}
        <ModeToggle />
      </div>
    </div>
  );
};
