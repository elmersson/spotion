'use client';

import Image from 'next/image';
import { FC } from 'react';

interface BrowseItemProps {
  title: string;
  imagePath: string;
}
export const BrowseItem: FC<BrowseItemProps> = ({ title, imagePath }) => {
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
          grayscale
          transition 
          hover:grayscale-0
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
      <div
        className='
            absolute 
            flex 
            size-full 
            p-2
            text-white'
      >
        <p className='line-clamp-2 text-sm font-semibold'>{title}</p>
      </div>
    </div>
  );
};
