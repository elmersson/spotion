import { getUserLikedPlaylists } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

import { Sidebar } from './sidebar';

export const NavigationBar = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists] = await Promise.all([getUserLikedPlaylists(session)]);
  return <Sidebar playlists={playlists} />;
};
