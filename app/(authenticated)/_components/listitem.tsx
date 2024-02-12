import Image from 'next/image';
import { FC } from 'react';
import { FaPlay } from 'react-icons/fa';

interface ListItemProps {
  image: string;
  name: string;
}

export const ListItem: FC<ListItemProps> = ({ image, name }) => {
  return (
    <div
      className='
    group 
    relative 
    flex 
    cursor-pointer 
    items-center 
    gap-x-4 
    overflow-hidden 
    rounded-md 
    bg-neutral-900/10
    pr-4
    grayscale 
    transition 
    hover:bg-neutral-900/20
    hover:grayscale-0 
    dark:bg-neutral-100/10
    hover:dark:bg-neutral-100/20
  '
    >
      <div className='relative min-h-[54px] min-w-[54px]'>
        <Image className='object-cover' src={image} fill alt='Image' />
      </div>
      <div className='line-clamp-2'>
        <p className='text-xs'>{name}</p>
      </div>

      <div
        className='
          absolute
          right-1
          flex
          items-center
          justify-center
          rounded-full
          bg-green-600
          p-3
          opacity-0
          drop-shadow-md
          transition
          hover:scale-110
          group-hover:opacity-100
        '
      >
        <FaPlay className='text-neutral-200 dark:text-neutral-900' size={12} />
      </div>
    </div>
  );
};
