'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Image as Images } from '@/types/types';

interface LibraryItemProps {
  id: string;
  name: string;
  owner?: string;
  type: string;
  images: Images[];
}
export const LibraryItem = ({
  id,
  name,
  owner,
  type,
  images,
}: LibraryItemProps) => {
  const router = useRouter();
  const handlePress = (id: string) => {
    router.push(`/${type}/${id}`);
  };
  return (
    <div
      role='button'
      onClick={() => handlePress(id)}
      className='group flex min-h-[27px] w-full items-center space-x-2.5 py-1 pr-3 text-sm font-medium text-muted-foreground grayscale-75 transition-all hover:bg-primary/5 hover:text-black hover:grayscale-0 hover:dark:text-white'
    >
      <div className='relative min-h-[24px] min-w-[24px] overflow-hidden rounded-md'>
        <Image
          fill
          src={
            images.length > 0
              ? images[images.length - 1].url
              : '/images/liked.png'
          }
          alt='MediaItem'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col'>
        <span className='line-clamp-1 text-xs'>{name}</span>
        <span className='line-clamp-1 text-xxs capitalize'>
          {type === 'show' ? 'podcast' : type} - {owner}
        </span>
      </div>
    </div>
  );
};
