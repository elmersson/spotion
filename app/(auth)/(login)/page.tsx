'use client';
import { redirect } from 'next/navigation';
import { signIn, useSession } from 'next-auth/react';

import { Button } from '@/components/ui/button';

export default function Home() {
  const session = useSession();

  if (!session || session.status !== 'authenticated') {
    return (
      <div>
        <h1>Spotify Web API Typescript SDK in Next.js</h1>
        <Button onClick={() => signIn('spotify')}>Sign in with Spotify</Button>
      </div>
    );
  }

  if (session.status === 'authenticated') {
    redirect('/home');
  }
}
