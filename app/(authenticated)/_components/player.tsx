'use client';

import { useEffect, useState } from 'react';

import { usePlayer } from '@/components/providers/player-provider';
import { getPlayerState } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';
import { useStore } from '@/lib/store/zustand';
import { PlaybackState } from '@/types/types';

import { PlayerActions } from './player-actions';
import { PlayerControl } from './player-control';
import { PlayerInfo } from './player-info';

export const Player = () => {
  const [playerState, setPlayerState] = useState<PlaybackState | null>(null);

  const { currentTrack } = useStore();
  const {
    isPlaying,
    togglePlay,
    duration,
    currentTime,
    volume,
    setVolume,
    slider,
  } = usePlayer();

  useEffect(() => {
    const fetchPlayerState = async () => {
      const session = await getAuthSession();

      if (session) {
        const state = await getPlayerState(session);
        setPlayerState(state);
      }
    };

    fetchPlayerState();
  }, []);

  if (!currentTrack && !playerState?.item) {
    return null;
  }

  return (
    <div className='fixed bottom-0 z-[99999] h-[80px] w-full bg-secondary px-4 py-2'>
      <div className='grid h-full grid-cols-2 md:grid-cols-3'>
        <PlayerInfo track={playerState?.item ?? currentTrack} />

        <PlayerControl
          isPlaying={playerState?.is_playing ?? isPlaying}
          togglePlay={togglePlay}
          duration={playerState?.item.duration_ms ?? duration}
          currentTime={playerState?.progress_ms ?? currentTime}
          slider={slider}
        />

        <PlayerActions
          volume={volume}
          setVolume={setVolume}
          device={playerState?.device}
        />
      </div>
    </div>
  );
};
