import { create } from 'zustand';

import { AuthSession, Track } from '@/types/types';

interface ZustandState {
  session: AuthSession | null;
  setSession: (session: AuthSession) => void;
  currentTrack: Track | null;
  setCurrentTrack: (track: Track) => void;
}

export const useStore = create<ZustandState>((set) => ({
  session: null,
  setSession: (session: AuthSession) => set(() => ({ session: session })),
  currentTrack: null,
  setCurrentTrack: (track: Track) =>
    set(() => ({
      currentTrack: track,
    })),
}));
