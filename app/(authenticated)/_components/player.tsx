'use client';

import Image from 'next/image';
import { useState } from 'react';
import {
  AiFillStepBackward,
  AiFillStepForward,
  AiFillHeart,
  AiOutlineHeart,
} from 'react-icons/ai';
import { BsPauseFill, BsPlayFill } from 'react-icons/bs';
import {
  HiSpeakerWave,
  HiSpeakerXMark,
  HiOutlineQueueList,
} from 'react-icons/hi2';
import { LuMonitorSpeaker } from 'react-icons/lu';

import { Slider } from './slider';

export const Player = () => {
  const [volume, setVolume] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  const Icon = isPlaying ? BsPauseFill : BsPlayFill;
  const VolumeIcon = volume === 0 ? HiSpeakerXMark : HiSpeakerWave;
  const HeartIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const handlePlay = () => {
    setIsPlaying(!isPlaying);
  };

  const toggleMute = () => {
    if (volume === 0) {
      setVolume(1);
    } else {
      setVolume(0);
    }
  };

  const toggleLiked = () => {
    setIsLiked(!isLiked);
  };

  return (
    <div
      className='
    fixed 
    bottom-0 
    z-[99999] 
    h-[80px] 
    w-full
    bg-secondary
    px-4
    py-2
  '
    >
      <div className='grid h-full grid-cols-2 md:grid-cols-3'>
        <div className='flex w-full justify-start'>
          <div className='flex items-center gap-x-4'>
            <div
              className='
                flex 
                w-full 
                cursor-pointer 
                items-center 
                gap-x-3 
                rounded-md 
                p-2 
                hover:bg-neutral-800/50
            '
            >
              <div
                className='
                    relative 
                    min-h-[44px] 
                    min-w-[44px] 
                    overflow-hidden 
                    rounded-md
                    '
              >
                <Image
                  fill
                  src={'/images/liked.png'}
                  alt='MediaItem'
                  className='object-cover'
                />
              </div>
              <div className='flex flex-col gap-y-1 overflow-hidden'>
                <p className='truncate text-sm '>Song title</p>
                <p className='truncate text-xs text-neutral-400'>
                  By Rasmus Elmersson
                </p>
              </div>
            </div>
            <HeartIcon
              onClick={toggleLiked}
              size={25}
              className='              
              cursor-pointer 
              text-neutral-400 
              transition
              hover:text-black
              hover:dark:text-white'
            />
          </div>
        </div>

        <div
          className='
            col-auto 
            flex 
            w-full 
            items-center 
            justify-end 
            md:hidden
          '
        >
          <div
            onClick={handlePlay}
            className='
              flex
              size-10
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full
              bg-black
              p-1 
              dark:bg-white
            '
          >
            <Icon size={25} className='text-black' />
          </div>
        </div>
        <div
          className='
            hidden
            size-full
            max-w-[722px] 
            items-center 
            justify-center 
            gap-x-6 
            md:flex
          '
        >
          <AiFillStepBackward
            onClick={() => {}}
            size={25}
            className='
              cursor-pointer 
              text-neutral-400 
              transition 
              hover:text-black
              hover:dark:text-white
            '
          />
          <div
            onClick={handlePlay}
            className='
              flex 
              size-10 
              cursor-pointer
              items-center
              justify-center 
              rounded-full 
              bg-neutral-400
              p-1
              hover:bg-black
              hover:dark:bg-white
            '
          >
            <Icon size={25} className='text-secondary' />
          </div>
          <AiFillStepForward
            onClick={() => {}}
            size={25}
            className='
              cursor-pointer 
              text-neutral-400 
              transition 
              hover:text-black
              hover:dark:text-white
            '
          />
        </div>
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
            <Slider
              value={volume}
              onChange={(value: number) => setVolume(value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
