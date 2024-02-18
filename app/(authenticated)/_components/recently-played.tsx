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
              <TableCell className='flex flex-row gap-3'>
                {item.track.album.images.length > 0 && (
                  <Image
                    src={
                      item.track.album.images[
                        item.track.album.images.length - 1
                      ].url
                    }
                    width={32}
                    height={32}
                    alt=''
                    className='rounded'
                  />
                )}
                <div>
                  <p className='line-clamp-1 text-sm'>{item.track.name}</p>
                  <div className='flex flex-row gap-1'>
                    {item.track.artists.map((artist, artistIndex) => (
                      <Fragment key={artist.id}>
                        <span
                          role='button'
                          className='line-clamp-1 text-xs hover:underline'
                          onClick={() => router.push(`/artist/${artist.id}`)}
                        >
                          {artist.name}
                          {artistIndex < item.track.artists.length - 1
                            ? ', '
                            : ''}
                        </span>
                      </Fragment>
                    ))}
                  </div>
                </div>
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
