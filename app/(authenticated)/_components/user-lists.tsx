'use client';

import { useRouter } from 'next/navigation';

import { Playlist } from '@/types/types';

import { ShowItem } from './show-item';

interface UserListsProps {
  userPlaylist: Playlist[];
}

export const UserLists = ({ userPlaylist }: UserListsProps) => {
  const router = useRouter();
  return (
    <div className='mt-4 p-4'>
      <span className='text-2xl font-semibold'>Public playlists</span>
      <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
        {userPlaylist.map((playlist) => (
          <ShowItem
            key={playlist.id}
            title={playlist.name}
            imagePath={playlist.images[0].url}
            author={playlist.owner.display_name || ''}
            onClick={() => router.push(`/playlist/${playlist.id}`)}
          />
        ))}
      </div>
    </div>
  );
};
