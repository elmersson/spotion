'use client';

import { FaPlay } from 'react-icons/fa';

import { useStore } from '@/lib/store/zustand';
import { Track } from '@/types/types';

interface PlayButtonProps {
  variant?: 'simple' | 'filled';
  track: Track;
  className?: string;
}

export const PlayButton = ({ variant, track, className }: PlayButtonProps) => {
  const { setCurrentTrack } = useStore();

  const handlePress = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <button
      role='button'
      onClick={(e) => {
        e.preventDefault();
        handlePress(track);
      }}
      className='flex items-center justify-center rounded-full bg-green-600 p-3'
      disabled={!track.preview_url}
    >
      <FaPlay className='text-neutral-200 dark:text-neutral-900' size={12} />
    </button>
  );
};
