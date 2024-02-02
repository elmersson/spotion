'use client';

import { ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';

import { Spinner } from '@/components/spinner';
import { Button } from '@/components/ui/button';

export const Heading = () => {
  const session = useSession();
  const isAuthenticated = session.status === 'authenticated';
  const isLoading = session.status === 'loading';

  return (
    <div className='max-w-3xl space-y-4'>
      <h1 className='text-3xl font-bold sm:text-5xl md:text-6xl'>
        Your Music, Podcasts, & Playlists. Unified. Welcome to{' '}
        <span className='underline'>Spotion</span>
      </h1>
      <h3 className='text-base font-medium sm:text-xl md:text-2xl'>
        Spotion is the brainchild of Notion calendar design <br />
        and Spotifys functionality.
      </h3>
      {isLoading && (
        <div className='flex w-full items-center justify-center'>
          <Spinner size='lg' />
        </div>
      )}
      {isAuthenticated && !isLoading && (
        <Button asChild>
          <Link href='/home'>
            Enter Spotion
            <ArrowRight className='ml-2 size-4' />
          </Link>
        </Button>
      )}
      {!isAuthenticated && !isLoading && (
        <Button onClick={() => signIn('spotify')}>
          Get Spotion free
          <ArrowRight className='ml-2 size-4' />
        </Button>
      )}
    </div>
  );
};
