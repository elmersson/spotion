'use client';

import { useEffect, useState } from 'react';

import { useStore } from '@/lib/store/zustand';
import { cn } from '@/lib/utils';
import {
  Album,
  Artist,
  AuthSession,
  RecentlyPlayed,
  Track,
} from '@/types/types';

import { ArtistAlbums } from './artist-albums';
import { ArtistPopular } from './artist-popular';
import { ArtistRelated } from './artist-related';
import { RecentlyPlayedTable } from './recently-played';

type Tabs = 'Recantly Played' | 'Top Tracks' | 'Top Artists' | 'New Releases';

interface HomeTablesProps {
  recentlyPlayed: RecentlyPlayed;
  topTracks: Track[];
  topArtists: Artist[];
  newReleases: Album[];
  session: AuthSession;
}

export const HomeTables = ({
  recentlyPlayed,
  topTracks,
  topArtists,
  newReleases,
  session,
}: HomeTablesProps) => {
  const { setSession } = useStore();
  const [tab, setTab] = useState<Tabs>('Recantly Played');

  useEffect(() => {
    setSession(session);
  }, [session, setSession]);

  return (
    <div>
      <div className='flex items-center space-x-2 p-4 text-sm text-muted-foreground dark:bg-neutral-900'>
        <span
          role='button'
          onClick={() => setTab('Recantly Played')}
          className={cn(
            'hover:text-black hover:dark:text-white',
            tab === 'Recantly Played' &&
              'font-medium text-black dark:text-white'
          )}
        >
          Recantly Played
        </span>
        <span
          role='button'
          onClick={() => setTab('Top Tracks')}
          className={cn(
            'hover:text-black hover:dark:text-white',
            tab === 'Top Tracks' && 'font-medium text-black dark:text-white'
          )}
        >
          Top Tracks
        </span>
        <span
          role='button'
          onClick={() => setTab('Top Artists')}
          className={cn(
            'hover:text-black hover:dark:text-white',
            tab === 'Top Artists' && 'font-medium text-black dark:text-white'
          )}
        >
          Top Artists
        </span>
        <span
          role='button'
          onClick={() => setTab('New Releases')}
          className={cn(
            'hover:text-black hover:dark:text-white',
            tab === 'New Releases' && 'font-medium text-black dark:text-white'
          )}
        >
          New Releases
        </span>
      </div>
      <div className='p-6'>
        {tab === 'Recantly Played' && (
          <RecentlyPlayedTable recentlyPlayed={recentlyPlayed} />
        )}
        {tab === 'Top Tracks' && <ArtistPopular tracks={topTracks} />}
        {tab === 'Top Artists' && <ArtistRelated artists={topArtists} />}
        {tab === 'New Releases' && <ArtistAlbums albums={newReleases} />}
      </div>
    </div>
  );
};
