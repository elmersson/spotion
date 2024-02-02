'use client';
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';

import { Heading } from './_components/heading';

export default function Home() {
  const session = useSession();

  if (!session || session.status !== 'authenticated') {
    return (
      <div className='flex min-h-full flex-col'>
        <div className='flex flex-1 flex-col items-center justify-center gap-y-8 px-6 pb-10 text-center md:justify-start'>
          <Heading />
        </div>
      </div>
    );
  }

  if (session.status === 'authenticated') {
    redirect('/home');
  }
}
