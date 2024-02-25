'use client';

import { usePathname, useRouter } from 'next/navigation';
import { FiPlus } from 'react-icons/fi';
import { GoHome, GoHomeFill } from 'react-icons/go';
import { IoSearch, IoSettingsOutline } from 'react-icons/io5';
import { PiBrowsersDuotone, PiBrowsersFill } from 'react-icons/pi';

import { useCreatePlaylist } from '@/hooks/use-create-playlist';
import { useSearch } from '@/hooks/use-search';
import { useSettings } from '@/hooks/use-settings';

import { UserActionItem } from './user-action-item';

export const UserActions = () => {
  const pathname = usePathname();
  const router = useRouter();
  const settings = useSettings();
  const search = useSearch();
  const create = useCreatePlaylist();

  const actionItems = [
    {
      onClick: () => router.push('/'),
      Icon: pathname === '/' ? GoHomeFill : GoHome,
      label: 'Home',
      isActive: pathname === '/',
    },
    {
      onClick: search.onOpen,
      Icon: IoSearch,
      label: 'Search',
      tooltip: '⌘ + k',
    },
    {
      onClick: () => router.push('/browse'),
      Icon: pathname === '/browse' ? PiBrowsersFill : PiBrowsersDuotone,
      label: 'Browse',
      isActive: pathname === '/browse',
    },
    {
      onClick: settings.onOpen,
      Icon: IoSettingsOutline,
      label: 'Settings',
    },
    {
      onClick: create.onOpen,
      Icon: FiPlus,
      label: 'Create playlist',
      tooltip: '⌘ + .',
    },
  ];

  return (
    <>
      {actionItems.map((item, index) => (
        <UserActionItem key={`${item.label} + ${index}`} {...item} />
      ))}
    </>
  );
};
