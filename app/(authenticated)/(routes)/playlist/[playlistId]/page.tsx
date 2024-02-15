import { Dot, MoreHorizontal } from 'lucide-react';
import { FaPlay } from 'react-icons/fa';

import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import { TracksTable } from '@/app/(authenticated)/_components/tracks-table';
import { getPlaylistById } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';
import { calculateTotalDuration, formatDuration } from '@/lib/time-date/time';

interface PlaylistProps {
  params: {
    playlistId: string;
  };
}

export default async function Playlist({ params }: PlaylistProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const playlist = await getPlaylistById(session, params.playlistId);

  return (
    <>
      <TracksHeader
        images={playlist.images}
        type={playlist.type}
        name={playlist.name}
      >
        <>
          <span className='font-semibold hover:underline'>
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
      </TracksHeader>
      <div className='ml-6 mt-4 flex flex-row items-center gap-6'>
        <div
          className='
        flex 
        size-12 
        items-center 
        justify-center 
        rounded-full
        bg-green-300
        drop-shadow-md
        hover:bg-green-500
        dark:bg-green-900
        hover:dark:bg-green-600

      '
        >
          <FaPlay className='text-neutral-900' />
        </div>
        <MoreHorizontal className='size-6 text-muted-foreground' />
      </div>
      <div className='p-4'>
        <TracksTable playlist={playlist} />
      </div>
    </>
  );
}
