'use client';

import { Plus, Search, Settings } from 'lucide-react';
import { usePathname, useRouter } from 'next/navigation';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { PiBrowsersDuotone, PiBrowsersFill } from 'react-icons/pi';

import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';

export const UserActions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const settings = useSettings();
  const search = useSearch();

  const isHome = pathname === '/';
  const HomeIcon = isHome ? GoHomeFill : GoHome;
  const isBrowse = pathname === '/browse';
  const BrowseIcon = isBrowse ? PiBrowsersFill : PiBrowsersDuotone;
  return (
    <div className='pl-3'>
      <div
        onClick={() => router.push('/')}
        className={cn(
          'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white',
          isHome && 'text-black dark:text-white'
        )}
      >
        <HomeIcon className='mr-2 shrink-0' size={16} />
        <span className='line-clamp-1'>Home</span>
      </div>
      <div
        onClick={search.onOpen}
        className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white'
      >
        <Search className='mr-2 shrink-0' size={16} />
        <span className='line-clamp-1'>Search</span>
      </div>
      <div
        onClick={() => router.push('/browse')}
        className={cn(
          'group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white',
          isBrowse && 'text-black dark:text-white'
        )}
      >
        <BrowseIcon className='mr-2 shrink-0' size={16} />
        <span className='line-clamp-1'>Browse</span>
      </div>
      <div
        onClick={settings.onOpen}
        className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white'
      >
        <Settings className='mr-2 shrink-0' size={16} />
        <span className='line-clamp-1'>Settings</span>
      </div>
      <div className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white'>
        <Plus className='mr-2 shrink-0' size={16} />
        <span className='truncate'>Create playlist</span>
      </div>
    </div>
  );
};
