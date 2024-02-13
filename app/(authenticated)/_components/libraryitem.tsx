'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';

import { Playlist } from '@/types/types';

interface LibraryItemProps {
  playlist: Playlist;
}
export const LibraryItem = ({ playlist }: LibraryItemProps) => {
  const router = useRouter();
  const handlePress = (id: string) => {
    router.push(`/playlist/${id}`);
  };
  return (
    <div
      onClick={() => handlePress(playlist.id)}
      className='group flex min-h-[27px] w-full items-center space-x-2.5 py-1 pr-3 text-sm font-medium text-muted-foreground grayscale-75 transition-all hover:bg-primary/5 hover:text-black hover:grayscale-0 hover:dark:text-white'
    >
      <div
        className='
                    relative 
                    min-h-[24px] 
                    min-w-[24px] 
                    overflow-hidden 
                    rounded-md
                    '
      >
        <Image
          fill
          src={
            playlist.images.length > 0
              ? playlist.images[playlist.images.length - 1].url
              : '/images/liked.png'
          }
          alt='MediaItem'
          className='object-cover'
        />
      </div>
      <div className='flex flex-col'>
        <span className='line-clamp-1 text-xs'>{playlist.name}</span>
        <span className='line-clamp-1 text-xxs'>
          {playlist.type} - {playlist.owner.display_name}
        </span>
      </div>
    </div>
  );
};
