'use client';

import { ArrowRight } from 'lucide-react';
import { signIn } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export const Heading = () => {
  const handleLogin = () => {
    signIn('spotify', { callbackUrl: 'http://localhost:3000' });
  };

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
      <Button onClick={handleLogin}>
        Get Spotion free
        <ArrowRight className='ml-2 size-4' />
      </Button>
    </div>
  );
};
