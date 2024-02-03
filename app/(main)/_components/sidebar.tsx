'use client';

import { ChevronsLeft, MenuIcon, Plus, Search, Settings } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ElementRef, useRef, useState, useEffect } from 'react';
import { useMediaQuery } from 'usehooks-ts';

import { useSettings } from '@/hooks/use-settings';
import { cn } from '@/lib/utils';

import { UserItem } from './user-item';

export const Sidebar = () => {
  const pathname = usePathname();
  const isMobile = useMediaQuery('(max-width: 768px)');
  const settings = useSettings();

  const isResizingRef = useRef(false);
  const sidebarRef = useRef<ElementRef<'aside'>>(null);
  const navbarRef = useRef<ElementRef<'div'>>(null);
  const [isResetting, setIsResetting] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(isMobile);

  const handleMouseDown = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault();
    event.stopPropagation();

    isResizingRef.current = true;
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (event: MouseEvent) => {
    if (!isResizingRef.current) return;
    let newWidth = event.clientX;

    if (newWidth < 240) newWidth = 240;
    if (newWidth > 480) newWidth = 480;

    if (sidebarRef.current && navbarRef.current) {
      sidebarRef.current.style.width = `${newWidth}px`;
      navbarRef.current.style.setProperty('left', `${newWidth}px`);
      navbarRef.current.style.setProperty(
        'width',
        `calc(100% - ${newWidth}px)`
      );
    }
  };

  const handleMouseUp = () => {
    isResizingRef.current = false;
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const resetWidth = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(false);
      setIsResetting(true);

      sidebarRef.current.style.width = isMobile ? '100%' : '240px';
      navbarRef.current.style.setProperty(
        'width',
        isMobile ? '0' : 'calc(100% - 240px)'
      );
      navbarRef.current.style.setProperty('left', isMobile ? '100%' : '240px');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  const collapse = () => {
    if (sidebarRef.current && navbarRef.current) {
      setIsCollapsed(true);
      setIsResetting(true);

      sidebarRef.current.style.width = '0';
      navbarRef.current.style.setProperty('width', '100%');
      navbarRef.current.style.setProperty('left', '0');
      setTimeout(() => setIsResetting(false), 300);
    }
  };

  useEffect(() => {
    if (isMobile) {
      collapse();
    } else {
      resetWidth();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMobile]);

  useEffect(() => {
    if (isMobile) {
      collapse();
    }
  }, [pathname, isMobile]);

  return (
    <>
      <aside
        className={cn(
          'group/sidebar relative z-[99999] flex h-[calc(100%-80px)] w-60 flex-col overflow-y-auto bg-secondary',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'w-0'
        )}
        ref={sidebarRef}
      >
        <div
          onClick={collapse}
          role='button'
          className={cn(
            'absolute right-2 top-3 h-6 w-6 rounded-sm text-muted-foreground opacity-0 transition hover:bg-neutral-300 group-hover/sidebar:opacity-100 dark:hover:bg-neutral-600',
            isMobile && 'opacity-100'
          )}
        >
          <ChevronsLeft className='size-5' />
        </div>
        <div className=''>
          <UserItem />
          <div className='pl-3'>
            <div className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-white'>
              <Search className='mr-2 shrink-0' size={16} />
              <span className='truncate'>Search</span>
            </div>
            <div
              onClick={settings.onOpen}
              className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-white'
            >
              <Settings className='mr-2 shrink-0' size={16} />
              <span className='truncate'>Settings</span>
            </div>
            <div className='group flex min-h-[27px] w-full items-center py-1 pr-3 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-white'>
              <Plus className='mr-2 shrink-0' size={16} />
              <span className='truncate'>Search</span>
            </div>
          </div>
        </div>
        <div className='mt-4 pl-3'>Library</div>
        <div
          onMouseDown={handleMouseDown}
          onClick={resetWidth}
          className='absolute right-0 top-0 h-full w-1 cursor-ew-resize bg-primary/10 opacity-0 transition group-hover/sidebar:opacity-100'
        />
      </aside>
      <div
        ref={navbarRef}
        className={cn(
          'absolute left-60 top-0 z-[99999] w-[calc(100%-240px)]',
          isResetting && 'transition-all duration-300 ease-in-out',
          isMobile && 'left-0 w-full'
        )}
      >
        <nav className='w-full bg-transparent px-3 py-2'>
          {isCollapsed && (
            <MenuIcon
              onClick={resetWidth}
              role='button'
              className='size-6 text-muted-foreground'
            />
          )}
        </nav>
      </div>
    </>
  );
};
