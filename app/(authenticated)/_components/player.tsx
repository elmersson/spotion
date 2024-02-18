'use client';

import { usePlayer } from '@/components/providers/player-provider';
import { useStore } from '@/lib/store/zustand';

import { PlayerActions } from './player-actions';
import { PlayerControl } from './player-control';
import { PlayerInfo } from './player-info';

export const Player = () => {
  const { currentTrack } = useStore();
  const { isPlaying, togglePlay, duration, currentTime, volume, setVolume } =
    usePlayer();

  if (!currentTrack) {
    return null;
  }

  return (
    <div className='fixed bottom-0 z-[99999] h-[80px] w-full bg-secondary px-4 py-2'>
      <div className='grid h-full grid-cols-2 md:grid-cols-3'>
        <PlayerInfo track={currentTrack} />

        <PlayerControl
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          duration={duration}
          currentTime={currentTime}
        />

        <PlayerActions volume={volume} setVolume={setVolume} />
      </div>
    </div>
  );
};
