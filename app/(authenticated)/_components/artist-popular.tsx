import { Clock3 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from '@/components/ui/table';
import { convertMsToMinutesSeconds } from '@/lib/time-date';
import { Track } from '@/types/types';

interface ArtistPopularProps {
  tracks: Track[];
}
export const ArtistPopular = ({ tracks }: ArtistPopularProps) => {
  const router = useRouter();
  return (
    <Table className='mb-[80px]'>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Album</TableHead>
          <TableHead className='flex items-center justify-end'>
            <Clock3 size={16} />
          </TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {tracks.length > 0 &&
          tracks.map((track, index) => (
            <TableRow key={track.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell className='flex flex-row gap-3'>
                {track.album.images.length > 0 && (
                  <Image
                    src={track.album.images[track.album.images.length - 1].url}
                    width={32}
                    height={32}
                    alt=''
                    className='rounded'
                  />
                )}
                <div>
                  <p className='line-clamp-1 text-sm'>{track.name}</p>
                  <div className='flex flex-row gap-1'>
                    {track.artists.map((artist, artistIndex) => (
                      <Fragment key={artist.id}>
                        <span
                          role='button'
                          className='line-clamp-1 text-xs hover:underline'
                          onClick={() => router.push(`/artist/${artist.id}`)}
                        >
                          {artist.name}
                          {artistIndex < track.artists.length - 1 ? ', ' : ''}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
              </TableCell>
              <TableCell
                onClick={() => router.push(`../album/${track.album.id}`)}
                className='hover:underline '
              >
                <span role='button'>{track.album.name}</span>
              </TableCell>
              <TableCell className='text-right text-sm text-muted-foreground'>
                {convertMsToMinutesSeconds(track.duration_ms)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
