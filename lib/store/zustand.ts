import { create } from 'zustand';

import { Track } from '@/types/types';

interface ZustandState {
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

export const useStore = create<ZustandState>((set) => ({
  currentTrack: null,
  setCurrentTrack: (track: Track) =>
    set(() => ({
      currentTrack: track,
    })),
}));
