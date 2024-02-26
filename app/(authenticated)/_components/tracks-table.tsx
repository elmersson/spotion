'use client';
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
import { useStore } from '@/lib/store/zustand';
import { convertMsToMinutesSeconds, formatDateString } from '@/lib/time-date';
import { Album, Playlist, Track } from '@/types/types';

interface TracksTableProps {
  playlist: Playlist | Album;
}

export const TracksTable = ({ playlist }: TracksTableProps) => {
  const router = useRouter();
  const { setCurrentTrack } = useStore();

  const type = (playlist: Playlist | Album): playlist is Playlist => {
    return 'followers' in playlist;
  };

  const isPlaylist = type(playlist);

  const tracks = isPlaylist
    ? playlist.tracks.items.map((item) => item.track)
    : playlist.tracks.items;

  const addedDate = (index: number): string => {
    if (isPlaylist) {
      const date = playlist.tracks.items[index].added_at;

      return formatDateString(date);
    }
    return '';
  };

  const handlePress = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <Table className='mb-[80px]'>
      <TableHeader>
        <TableRow>
          <TableHead>#</TableHead>
          <TableHead>Title</TableHead>
          {isPlaylist && <TableHead>Album</TableHead>}
          {isPlaylist && <TableHead>Date added</TableHead>}
          <TableHead className='flex items-center justify-end'>
            <Clock3 size={16} />
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {tracks.map((track, index) => {
          return (
            <TableRow
              key={track.id}
              className='grayscale-75 hover:grayscale-0'
              role='button'
              onDoubleClick={(e) => {
                e.preventDefault();
                handlePress(track);
              }}
            >
              <TableCell>{index + 1}</TableCell>
              <TableCell className='flex flex-row gap-3'>
                {isPlaylist && track.album.images.length > 0 && (
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
              {isPlaylist && (
                <TableCell
                  onClick={() => router.push(`../album/${track.album.id}`)}
                  className='hover:underline '
                >
                  <span role='button'>{track.album.name}</span>
                </TableCell>
              )}

              {isPlaylist && (
                <TableCell className='text-sm text-muted-foreground'>
                  {addedDate(index)}
                </TableCell>
              )}
              <TableCell className='text-right text-sm text-muted-foreground'>
                {convertMsToMinutesSeconds(track.duration_ms)}
              </TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
};
