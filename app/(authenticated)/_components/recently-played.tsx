import { Clock3 } from 'lucide-react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { convertMsToMinutesSeconds } from '@/lib/time-date';
import { RecentlyPlayed } from '@/types/types';

import { PlayButton } from './play-button';
import { TrackCell } from './track-cell';

interface RecentlyPlayedTableProps {
  recentlyPlayed: RecentlyPlayed;
}
export const RecentlyPlayedTable = ({
  recentlyPlayed,
}: RecentlyPlayedTableProps) => {
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
        {recentlyPlayed.items.length > 0 &&
          recentlyPlayed.items.map((item, index) => (
            <TableRow key={item.track.id}>
              <TableCell>{index + 1}</TableCell>
              <TableCell>
                <TrackCell track={item.track} />
              </TableCell>
              <TableCell
                onClick={() => router.push(`../album/${item.track.album.id}`)}
                className='hover:underline '
              >
                <span role='button'>{item.track.album.name}</span>
              </TableCell>
              <TableCell className='text-right text-sm text-muted-foreground'>
                {convertMsToMinutesSeconds(item.track.duration_ms)}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};
