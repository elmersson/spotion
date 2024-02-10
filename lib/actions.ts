import { AuthSession, Playlist } from '@/types/types';

import { customGet } from './server-utils';

export const getUserLikedPlaylists = async (
  session: AuthSession
): Promise<Playlist[]> => {
  const data = await customGet(
    'https://api.spotify.com/v1/me/playlists',
    session
  );
  return data.items;
};