import { Dot, Music, Clock3, MoreHorizontal } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';
import { FaPlay } from 'react-icons/fa';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getPlaylistById } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';
import { cn } from '@/lib/utils';

function formatDuration(totalDurationMs: number): string {
  // Convert milliseconds to minutes
  const totalMinutes = totalDurationMs / 1000 / 60;

  if (totalMinutes < 60) {
    // If less than an hour, return in minutes
    return `${Math.round(totalMinutes)} min`;
  } else {
    // Convert minutes to hours for durations over an hour
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    // Return formatted string with "hr" and optionally "min" if there are remaining minutes
    return `${hours} hr${minutes > 0 ? ` ${minutes} min` : ''}`;
  }
}

function convertMsToMinutesSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes);
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

function formatDateString(dateString: string): string {
  const monthNames = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = monthNames[date.getMonth()];
  const day = date.getDate();

  return `${month} ${day}, ${year}`;
}

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
    <div className='bg-neutral-200 dark:bg-neutral-900'>
      <div className='flex items-end gap-6'>
        {playlist && (
          <>
            {playlist.images && playlist.images.length > 0 ? (
              <Image
                src={playlist.images[0].url}
                alt={playlist.name}
                height={240}
                width={240}
                className='size-60 rounded-sm object-contain grayscale-25 hover:grayscale-0'
                priority
              />
            ) : (
              <div className='size-60 rounded-sm object-contain grayscale-25 hover:grayscale-0'>
                <Music size={160} className='bg-paper size-full ' />
              </div>
            )}

            <div className='mr-4 flex max-w-[80%] flex-col'>
              <h5 className='mb-4 text-xs capitalize'>{playlist.type}</h5>
              <h2
                className={cn(
                  'text-6xl font-bold',
                  playlist.name.length > 24 && 'text-3xl'
                )}
              >
                {playlist.name}
              </h2>

              {playlist.description && (
                <p className='mt-3 text-xs text-muted-foreground'>
                  {playlist.description}
                </p>
              )}

              <div className='mt-3 flex items-center text-xs'>
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
                {playlist.tracks.items.length > 0 && (
                  <>
                    <Dot size={15} />
                    <span>{playlist.tracks.total.toLocaleString()} songs</span>
                    <Dot size={15} />
                    <span className='text-muted-foreground'>
                      {formatDuration(
                        playlist.tracks.items.reduce(
                          (totalDuration, track) =>
                            totalDuration + track.track.duration_ms,
                          0
                        )
                      )}
                    </span>
                  </>
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div className='ml-6 mt-4 flex flex-row items-center gap-6'>
        <div
          className='
        flex 
        size-12 
        items-center 
        justify-center 
        rounded-full
        bg-green-900
        drop-shadow-md
        hover:bg-green-600

      '
        >
          <FaPlay className='text-neutral-900' />
        </div>
        <MoreHorizontal className='size-6 text-muted-foreground' />
      </div>
      <div className='p-4'>
        <Table className='mb-[80px] bg-neutral-200 dark:bg-neutral-900'>
          <TableHeader>
            <TableRow>
              <TableHead>#</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Album</TableHead>
              <TableHead>Date added</TableHead>
              <TableHead className='flex items-center justify-end'>
                <Clock3 size={16} />
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {playlist.tracks.items.map((track, index) => {
              return (
                <TableRow
                  key={track.track.id}
                  className='grayscale-75 hover:grayscale-0'
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className='flex flex-row gap-3'>
                    {track.track.album.images.length > 0 && (
                      <Image
                        src={
                          track.track.album.images[
                            track.track.album.images.length - 1
                          ].url
                        }
                        width={32}
                        height={32}
                        alt=''
                        className='rounded'
                      />
                    )}
                    <div>
                      <p className='text-sm'>{track.track.name}</p>
                      <div className='flex flex-row gap-1'>
                        {track.track.artists.map((artist, index) => (
                          <Fragment key={artist.id}>
                            <p className='text-xs hover:underline'>
                              {artist.name}
                              {index < track.track.artists.length - 1
                                ? ', '
                                : ''}
                            </p>
                          </Fragment>
                        ))}
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className='hover:underline'>
                    {track.track.album.name}
                  </TableCell>
                  <TableCell className='text-sm text-muted-foreground'>
                    {formatDateString(track.added_at)}
                  </TableCell>
                  <TableCell className='text-right text-sm text-muted-foreground'>
                    {convertMsToMinutesSeconds(track.track.duration_ms)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
