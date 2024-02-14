import { MoreHorizontal } from 'lucide-react';
import { AiOutlineHeart } from 'react-icons/ai';
import { FaPlay } from 'react-icons/fa';

import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import { TracksTable } from '@/app/(authenticated)/_components/tracks-table';
import { getAlbumById } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

interface AlbumProps {
  params: {
    albumId: string;
  };
}

export default async function Album({ params }: AlbumProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const album = await getAlbumById(session, params.albumId);

  return (
    <div className='bg-neutral-200 dark:bg-neutral-900'>
      <TracksHeader playlist={album} />
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
        <AiOutlineHeart className='size-8 text-muted-foreground' />
      </div>
      <div className='p-4'>
        <TracksTable playlist={album} />
      </div>
    </div>
  );
}
