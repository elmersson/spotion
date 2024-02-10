'use client';
import { useSession } from 'next-auth/react';
import { ReactNode } from 'react';

import { SearchCommand } from '@/components/search-command';
import { Spinner } from '@/components/spinner';

import { Player } from './_components/player';
import { Sidebar } from './_components/sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  const session = useSession();

  if (session.status === 'loading') {
    <div className='flex h-full items-center justify-center'>
      <Spinner size='lg' />
    </div>;
  }

  return (
    <div className='flex h-full dark:bg-[#1F1F1F]'>
      <Sidebar />
      <Player />
      <main className='h-full flex-1 overflow-y-auto'>
        <SearchCommand />
        {children}
      </main>
    </div>
  );
};

export default MainLayout;