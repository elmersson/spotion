import { Dot, Music } from 'lucide-react';
import Image from 'next/image';
import { Fragment } from 'react';

import { formatDuration } from '@/lib/time-date';
import { cn } from '@/lib/utils';
import { Album, Playlist } from '@/types/types';

interface TracksHeaderProps {
  playlist: Playlist | Album;
}

export const TracksHeader = ({ playlist }: TracksHeaderProps) => {
  const isPlaylist = (playlist: Playlist | Album): playlist is Playlist => {
    return 'followers' in playlist;
  };

  const calculateTotalDuration = (playlist: Playlist | Album) => {
    if (isPlaylist(playlist)) {
      return playlist.tracks.items.reduce(
        (total, { track }) => total + track.duration_ms,
        0
      );
    } else {
      return playlist.tracks.items.reduce(
        (total, track) => total + track.duration_ms,
        0
      );
    }
  };

  const displayType = isPlaylist(playlist) ? 'Playlist' : 'Album';

  return (
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
            <h5 className='mb-4 text-xs capitalize'>{displayType}</h5>
            <h2
              className={cn(
                'text-6xl font-bold',
                playlist.name.length > 24 && 'text-3xl'
              )}
            >
              {playlist.name}
            </h2>

            {isPlaylist(playlist) && playlist.description && (
              <p className='mt-3 text-xs text-muted-foreground'>
                {playlist.description}
              </p>
            )}

            <div className='mt-3 flex items-center text-xs'>
              {isPlaylist(playlist) ? (
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
                </>
              ) : (
                <>
                  {playlist.artists.map((artist) => (
                    <Fragment key={artist.id}>
                      <p className='text-xs hover:underline'>{artist.name}</p>
                    </Fragment>
                  ))}
                  <Dot size={15} />
                  <p className='text-xs hover:underline'>
                    {playlist.release_date}
                  </p>
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
            </div>
          </div>
        </>
      )}
    </div>
  );
};
