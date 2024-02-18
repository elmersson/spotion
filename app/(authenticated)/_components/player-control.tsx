import * as Progress from '@radix-ui/react-progress';
import { Repeat2, Shuffle } from 'lucide-react';
import { AiFillStepBackward, AiFillStepForward } from 'react-icons/ai';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';

import { formatPlayerTime } from '@/lib/time-date';

interface PlayerControlProps {
  isPlaying: boolean;
  togglePlay: () => Promise<void>;
  slider: number;
  duration: number;
  currentTime: number;
}
export const PlayerControl = ({
  isPlaying,
  togglePlay,
  slider,
  duration,
  currentTime,
}: PlayerControlProps) => {
  const Icon = isPlaying ? BsPauseFill : BsPlayFill;

  return (
    <div className='flex size-full flex-col items-center justify-center gap-2'>
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
        <Progress.Root
          className='bg-gray-dark relative h-1 w-1/2 overflow-hidden rounded-full'
          style={{ transform: 'translateZ(0)' }}
          value={slider}
        >
          <Progress.Indicator
            className='duration-[660ms] ease-[cubic-bezier(0.65, 0, 0.35, 1)] size-full bg-white transition-transform'
            style={{ transform: `translateX(-${100 - slider}%)` }}
          />
        </Progress.Root>
        <span className='text-xs text-muted-foreground'>
          {duration ? formatPlayerTime(duration) : '0:00'}
        </span>
      </div>
    </div>
  );
};
