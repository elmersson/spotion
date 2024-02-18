import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Fragment } from 'react';

import { useStore } from '@/lib/store/zustand';
import { Track } from '@/types/types';

interface TrackCellProps {
  track: Track;
}

export const TrackCell = ({ track }: TrackCellProps) => {
  const { setCurrentTrack } = useStore();
  const router = useRouter();

  const handlePress = (track: Track) => {
    if (track.preview_url) {
      setCurrentTrack(track);
    }
  };

  return (
    <div
      role='button'
      className='flex flex-row gap-3'
      onDoubleClick={(e) => {
        e.preventDefault();
        handlePress(track);
      }}
    >
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
    </div>
  );
};
