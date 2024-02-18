'use client';

import {
  Dispatch,
  ReactNode,
  SetStateAction,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react';

import { useStore } from '@/lib/store/zustand';

interface PlayerProviderState {
  currentTrackAudio: HTMLAudioElement | null;
  isPlaying: boolean;
  play: () => Promise<void>;
  pause: () => void;
  togglePlay: () => Promise<void>;
  duration: number;
  currentTime: number;
  slider: number;
  setSlider: Dispatch<SetStateAction<number>>;
  drag: number;
  setDrag: Dispatch<SetStateAction<number>>;
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const PlayerContext = createContext<PlayerProviderState>({} as any);

interface PlayerProviderProps {
  children: ReactNode;
}

export default function PlayerProvider({ children }: PlayerProviderProps) {
  const { currentTrack } = useStore();

  const [currentTrackAudio, setCurrentTrackAudio] =
    useState<HTMLAudioElement | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [slider, setSlider] = useState(1);
  const [drag, setDrag] = useState(0);
  const [volume, setVolume] = useState<HTMLMediaElement['volume']>(0.5);

  useEffect(() => {
    if (!currentTrack) return;
    if (isPlaying) {
      pause();
      setCurrentTrackAudio(null);
    }
    const tempAudio = new Audio(currentTrack.preview_url);

    const setAudioData = () => {
      setDuration(tempAudio.duration);
      setCurrentTime(tempAudio.currentTime);
    };

    const setAudioTime = () => {
      const currTime = tempAudio.currentTime;
      setCurrentTime(currTime);
      setSlider(
        currTime
          ? Number(((currTime * 100) / tempAudio.duration).toFixed(1))
          : 0
      );
    };

    tempAudio.addEventListener('loadeddata', setAudioData);
    tempAudio.addEventListener('timeupdate', setAudioTime);
    tempAudio.preload = 'none';

    setCurrentTrackAudio(tempAudio);

    return () => {
      pause();
      setCurrentTrackAudio(null);
    };
  }, [currentTrack]);

  useEffect(() => {
    if (currentTrackAudio) {
      currentTrackAudio.volume = volume;
    }
  }, [volume, currentTrackAudio]);

  useEffect(() => {
    const handlePlay = async () => {
      if (currentTrackAudio) {
        await play();
      }
    };
    handlePlay();
  }, [currentTrackAudio]);

  const togglePlay = async () => {
    if (isPlaying) pause();
    else await play();
  };

  const play = async () => {
    setIsPlaying(true);
    await currentTrackAudio?.play();
  };

  const pause = () => {
    setIsPlaying(false);
    currentTrackAudio?.pause();
  };

  useEffect(() => {
    if (currentTrackAudio && drag) {
      currentTrackAudio.currentTime = Math.round(
        (drag * currentTrackAudio.duration) / 100
      );
    }
  }, [drag]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrackAudio,
        isPlaying,
        play,
        pause,
        togglePlay,
        duration,
        currentTime,
        slider,
        setSlider,
        drag,
        setDrag,
        volume,
        setVolume,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
}

export const usePlayer = () => useContext(PlayerContext);
