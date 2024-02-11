import { ReactNode } from 'react';

import { SearchCommand } from '@/components/search-command';

import { Player } from './_components/player';
import { Sidebar } from './_components/sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
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
