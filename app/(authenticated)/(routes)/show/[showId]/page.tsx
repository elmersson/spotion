import { Dot } from 'lucide-react';

import { EpisodeItem } from '@/app/(authenticated)/_components/episode-item';
import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getShowById, getShowEpisodesById } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

interface ShowProps {
  params: {
    showId: string;
  };
}

export default async function Show({ params }: ShowProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const show = await getShowById(session, params.showId);
  const episodes = await getShowEpisodesById(session, params.showId);

  return (
    <>
      <TracksHeader images={show.images} type={show.type} name={show.name}>
        <span className='font-semibold'>{show.publisher}</span>
        <Dot size={15} />
        <span className='text-muted-foreground'>
          {show.total_episodes} episodes
        </span>
      </TracksHeader>

      <div className='mb-2 mt-6 flex flex-col px-6'>
        <span className='text-xl font-semibold'>About</span>
        <span className='w-[65%] text-sm sm:w-[100%] md:w-[80%]'>
          {show.description}
        </span>
      </div>

      <div className='p-3'>
        <Table className='mb-[80px]'>
          <TableHeader>
            <TableRow>
              <TableHead className='text-lg'>All episodes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {episodes.items.map((episode) => (
              <TableRow key={episode.id}>
                <EpisodeItem episode={episode} publisher={show.publisher} />
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
