'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

type ItemType = 'browse' | 'playlist';

interface BrowseItemProps {
  title: string;
  imagePath: string;
  id: string;
  itemType: ItemType;
}
export const BrowseItem = ({
  title,
  imagePath,
  id,
  itemType,
}: BrowseItemProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/${itemType}/${id}`);
  };
  return (
    <div
      role='button'
      onClick={handleClick}
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
      {itemType === 'browse' && (
        <div className={'absolute flex size-full p-2 text-white'}>
          <p className='line-clamp-2 font-semibold shadow-lg'>{title}</p>
        </div>
      )}
    </div>
  );
};
