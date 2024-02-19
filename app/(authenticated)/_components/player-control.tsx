import { Repeat2, Shuffle } from 'lucide-react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

import { formatPlayerTime } from '@/lib/time-date';

import { Slider } from './slider';

interface PlayerControlProps {
  isPlaying: boolean;
  togglePlay: () => Promise<void>;
  duration: number;
  currentTime: number;
  slider: number;
}
export const PlayerControl = ({
  isPlaying,
  togglePlay,
  duration,
  currentTime,
  slider,
}: PlayerControlProps) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  return (
    <div className='flex size-full flex-col items-center justify-center'>
      <div
        className='
          hidden
          max-w-[722px] 
          items-center 
          justify-center 
          gap-x-4 
          md:flex
        '
      >
        <Shuffle
          onClick={() => {}}
          size={15}
          className='
            cursor-pointer 
            text-neutral-400 
            transition 
            hover:text-black
            hover:dark:text-white
          '
        />
        <AiFillStepBackward
          onClick={() => {}}
          size={15}
          className='
            cursor-pointer 
            text-neutral-400 
            transition 
            hover:text-black
            hover:dark:text-white
          '
        />
        <div
          onClick={togglePlay}
          className='flex cursor-pointer items-center justify-center text-muted-foreground hover:text-black hover:dark:text-white'
        >
          <Icon size={25} />
        </div>
        <AiFillStepForward
          onClick={() => {}}
          size={15}
          className='
            cursor-pointer 
            text-neutral-400 
            transition 
            hover:text-black
            hover:dark:text-white
          '
        />
        <Repeat2
          onClick={() => {}}
          size={15}
          className='
            cursor-pointer 
            text-neutral-400 
            transition 
            hover:text-black
            hover:dark:text-white
          '
        />
      </div>
      <div className='flex w-full items-center justify-center gap-2'>
        <span className='text-xs text-muted-foreground'>
          {currentTime ? formatPlayerTime(currentTime) : '0:00'}
        </span>
        <Slider value={slider} />
        <span className='text-xs text-muted-foreground'>
          {duration ? formatPlayerTime(duration) : '0:00'}
        </span>
      </div>
    </div>
  );
};
