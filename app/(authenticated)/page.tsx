import { redirect } from 'next/navigation';

import {
  getNewReleases,
  getRecentlyPlayedTracks,
  getTopItems,
} from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

import { HomeTables } from './_components/home-tables';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  const recentlyPlayed = await getRecentlyPlayedTracks(session);
  const newReleases = await getNewReleases(session);
  const { artists, tracks } = await getTopItems({ session });

  return (
    <div className='bg-neutral-200dark:bg-neutral-900 size-full overflow-hidden overflow-y-auto rounded-lg'>
      <HomeTables
        session={session}
        recentlyPlayed={recentlyPlayed}
        topTracks={tracks}
        topArtists={artists}
        newReleases={newReleases}
      />
    </div>
  );
}
