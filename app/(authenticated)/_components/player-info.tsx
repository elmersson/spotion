import Image from 'next/image';
import { useState } from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import { Track } from '@/types/types';

interface PlayerInfoProps {
  track?: Track | null;
}
export const PlayerInfo = ({ track }: PlayerInfoProps) => {
  const [isLiked, setIsLiked] = useState(false);

  const HeartIcon = isLiked ? AiFillHeart : AiOutlineHeart;

  const toggleLiked = () => {
    setIsLiked(!isLiked);
  };

  if (!track) {
    return null;
  }

  return (
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
              src={track.album.images[0].url}
              alt='MediaItem'
              className='object-cover'
            />
          </div>
          <div className='flex flex-col gap-y-1 overflow-hidden'>
            <p className='truncate text-sm '>{track.name}</p>
            <p className='truncate text-xs text-neutral-400'>
              By {track.artists[0].name}
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
  );
};
