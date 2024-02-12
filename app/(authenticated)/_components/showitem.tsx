'use client';

import Image from 'next/image';
import { FC } from 'react';
import { FaPlay } from 'react-icons/fa';

interface ShowItemProps {
  author: string;
  title: string;
  imagePath: string;
}
export const ShowItem: FC<ShowItemProps> = ({ author, title, imagePath }) => {
  return (
    <div
      className='
          group 
          relative 
          flex 
          cursor-pointer 
          flex-col 
          items-center 
          justify-center 
          gap-x-4 
          overflow-hidden 
          rounded-sm 
        bg-neutral-800/5 
          grayscale 
          transition
        hover:bg-neutral-800/10 
          hover:grayscale-0 
          dark:bg-neutral-400/5
          hover:dark:bg-neutral-400/10
        '
    >
      <div
        className='
            relative 
            aspect-square 
            size-full
            overflow-hidden 
            rounded-md
          '
      >
        <Image
          className='object-cover'
          src={imagePath || '/images/music-placeholder.png'}
          fill
          alt='Image'
        />
      </div>
      <div className='flex w-full flex-col items-start gap-y-1 p-2'>
        <p className='line-clamp-1 w-full text-sm font-semibold'>{title}</p>
        <p
          className='
              line-clamp-1 
              w-full 
              text-xs 
              text-neutral-600
              dark:text-neutral-400
            '
        >
          By {author}
        </p>
      </div>
      <div
        className='
            absolute 
            bottom-16 
            right-2
          '
      >
        <div
          className='
        translate 
        flex 
        translate-y-1/4 
        items-center 
        justify-center 
        rounded-full 
        bg-green-600 
        p-4 
        opacity-0 
        drop-shadow-md
        transition
        hover:scale-110 
        group-hover:translate-y-0
        group-hover:opacity-100
      '
        >
          <FaPlay className='text-neutral-900' />
        </div>
      </div>
    </div>
  );
};
