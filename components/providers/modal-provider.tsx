'use client';

import { useEffect, useState } from 'react';

import { useCreatePlaylist } from '@/hooks/use-create-playlist';

import { PlaylistModal } from '../modals/playlist-modal';
import { SettingsModal } from '../modals/settings-modal';

export const ModalProvider = () => {
  const [isMounted, setIsMounted] = useState(false);
  const create = useCreatePlaylist();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.metaKey && event.key === '.') {
        event.preventDefault();
        if (!create.isOpen) {
          create.onOpen();
        } else {
          create.onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [create]);

  if (!isMounted) {
    return null;
  }

  return (
    <>
      <SettingsModal />
      <PlaylistModal />
    </>
  );
};
