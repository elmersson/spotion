import { Clock3 } from 'lucide-react';
import { useRouter } from 'next/navigation';

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

import { TrackCell } from './track-cell';

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
              <TableCell>
                <TrackCell track={track} />
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
