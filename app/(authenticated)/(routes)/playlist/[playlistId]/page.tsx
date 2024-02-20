import { MoreHorizontal } from 'lucide-react';
import { FaPlay } from 'react-icons/fa';

import { PlaylistHeaderInformation } from '@/app/(authenticated)/_components/playlistHeaderInfo';
import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import { TracksTable } from '@/app/(authenticated)/_components/tracks-table';
import { getPlaylistById } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

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
        <PlaylistHeaderInformation playlist={playlist} />
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
