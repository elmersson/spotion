import {
  getUserLikedAlbums,
  getUserLikedArtists,
  getUserLikedPlaylists,
  getUserSavedShows,
} from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

import { SidebarContainer } from './sidebar-container';
import { UserActions } from './user-actions';
import { UserItem } from './user-item';
import { UserLibrary } from './user-library';

export const Sidebar = async () => {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const [playlists, albums, artists, shows] = await Promise.all([
    getUserLikedPlaylists(session),
    getUserLikedAlbums(session),
    getUserLikedArtists(session),
    getUserSavedShows(session),
  ]);

  return (
    <SidebarContainer>
      <UserItem />
      <UserActions />
      <UserLibrary
        playlists={playlists}
        albums={albums}
        artists={artists}
        shows={shows}
      />
    </SidebarContainer>
  );
};
