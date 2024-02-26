import { ReactNode } from 'react';

import { SearchCommand } from '@/components/search-command';

import { Player } from './_components/player';
import { Sidebar } from './_components/sidebar';

const MainLayout = ({ children }: { children: ReactNode }) => {
  return (
    <div className='flex h-full bg-neutral-200 dark:bg-neutral-900'>
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
