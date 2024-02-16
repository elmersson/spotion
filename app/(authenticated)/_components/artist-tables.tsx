'use client';
import { useState } from 'react';

import { cn } from '@/lib/utils';
import { Discography } from '@/types/types';

import { ArtistAlbums } from './artist-albums';
import { ArtistPopular } from './artist-popular';
import { ArtistRelated } from './artist-related';

type Tabs =
  | 'Popular'
  | 'Albums'
  | 'Songs'
  | 'Appears On'
  | 'Compilations'
  | 'Related Artists';

export const ArtistTables = ({
  artist,
  topTracks,
  albums,
  singles,
  appearsOn,
  compilations,
  relatedArtists,
}: Discography) => {
  const [tab, setTab] = useState<Tabs>('Popular');

  return (
    <>
      <div className='flex items-center space-x-2 p-4 text-sm text-muted-foreground dark:bg-neutral-900'>
        <span
          role='button'
          onClick={() => setTab('Popular')}
          className={cn(
            'hover:text-black hover:dark:text-white',
            tab === 'Popular' && 'font-medium text-black dark:text-white'
          )}
        >
          Popular
        </span>
        {albums.length > 0 && (
          <span
            role='button'
            onClick={() => setTab('Albums')}
            className={cn(
              'hover:text-black hover:dark:text-white',
              tab === 'Albums' && 'font-medium text-black dark:text-white'
            )}
          >
            Albums
          </span>
        )}
        {singles.length > 0 && (
          <span
            role='button'
            onClick={() => setTab('Songs')}
            className={cn(
              'hover:text-black hover:dark:text-white',
              tab === 'Songs' && 'font-medium text-black dark:text-white'
            )}
          >
            Songs
          </span>
        )}
        {appearsOn.length > 0 && (
          <span
            role='button'
            onClick={() => setTab('Appears On')}
            className={cn(
              'hover:text-black hover:dark:text-white',
              tab === 'Appears On' && 'font-medium text-black dark:text-white'
            )}
          >
            Appears On
          </span>
        )}
        {compilations.length > 0 && (
          <span
            role='button'
            onClick={() => setTab('Compilations')}
            className={cn(
              'hover:text-black hover:dark:text-white',
              tab === 'Compilations' && 'font-medium text-black dark:text-white'
            )}
          >
            Compilations
          </span>
        )}
        {relatedArtists.length > 0 && (
          <span
            role='button'
            onClick={() => setTab('Related Artists')}
            className={cn(
              'hover:text-black hover:dark:text-white',
              tab === 'Related Artists' &&
                'font-medium text-black dark:text-white'
            )}
          >
            Related Artists
          </span>
        )}
      </div>
      <div className='px-4'>
        {tab === 'Popular' && <ArtistPopular tracks={topTracks} />}
        {tab === 'Albums' && <ArtistAlbums albums={albums} />}
        {tab === 'Songs' && <ArtistAlbums albums={singles} />}
        {tab === 'Appears On' && <ArtistAlbums albums={appearsOn} />}
        {tab === 'Compilations' && <ArtistAlbums albums={compilations} />}
        {tab === 'Related Artists' && (
          <ArtistRelated artists={relatedArtists} />
        )}
      </div>
    </>
  );
};
