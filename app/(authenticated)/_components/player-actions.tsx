import { Dispatch, SetStateAction, useState } from 'react';
import {
  HiOutlineQueueList,
  HiSpeakerWave,
  HiSpeakerXMark,
} from 'react-icons/hi2';
import { LuMonitorSpeaker } from 'react-icons/lu';

import { Slider } from './slider';

interface PlayerActionsProps {
  volume: number;
  setVolume: Dispatch<SetStateAction<number>>;
}

export const PlayerActions = ({ volume, setVolume }: PlayerActionsProps) => {
  const [muteVolume, setMuteVolume] = useState<number>(0);
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(muteVolume);
    } else {
      setMuteVolume(volume);
      setVolume(0);
    }
  };
  return (
    <div className='hidden w-full justify-end pr-2 md:flex'>
      <div className='flex w-[160px] items-center gap-x-2'>
        <HiOutlineQueueList
          className='              
        cursor-pointer 
        text-neutral-400 
        transition
        hover:text-black
        hover:dark:text-white'
          size={30}
        />
        <LuMonitorSpeaker
          className='              
        cursor-pointer 
        text-neutral-400 
        transition 
        hover:text-black
        hover:dark:text-white'
          size={30}
        />
        <VolumeIcon
          onClick={toggleMute}
          className='              
        cursor-pointer 
        text-neutral-400 
        transition 
        hover:text-black
        hover:dark:text-white'
          size={30}
        />
        <Slider value={volume} onChange={(value: number) => setVolume(value)} />
      </div>
    </div>
  );
};
