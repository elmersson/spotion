'use client';

import { Dot } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { calculateTotalDuration, formatDuration } from '@/lib/time-date/time';
import { Playlist } from '@/types/types';

interface PlaylistHeaderInformationProps {
  playlist: Playlist;
}
export const PlaylistHeaderInformation = ({
  playlist,
}: PlaylistHeaderInformationProps) => {
  const router = useRouter();
  return (
    <>
      <span
        role='button'
        onClick={() => router.push(`/user/${playlist.owner.id}`)}
        className='font-semibold hover:underline'
      >
        {playlist.owner?.display_name}
      </span>
      {playlist.followers.total > 0 && (
        <>
          <Dot size={15} />
          <span>
            {playlist.followers.total.toLocaleString()}{' '}
            {playlist.followers.total > 1 ? 'likes' : 'like'}
          </span>
        </>
      )}
      <Dot size={15} />
      <span>{playlist.tracks.total.toLocaleString()} songs</span>
      {playlist.tracks.items.length > 0 && (
        <>
          <Dot size={15} />
          <span className='text-muted-foreground'>
            {formatDuration(calculateTotalDuration(playlist))}
          </span>
        </>
      )}
    </>
  );
};
