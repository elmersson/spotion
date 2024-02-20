import { Dot } from 'lucide-react';

import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import { UserLists } from '@/app/(authenticated)/_components/user-lists';
import { getPlaylistByUsername, getUser } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

interface UserProps {
  params: {
    username: string;
  };
}

export default async function User({ params }: UserProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const user = await getUser(session, params.username);
  const playlists = await getPlaylistByUsername(session, params.username);
  const userPlaylist = playlists.filter((playlist) => playlist.public);

  return (
    <>
      <TracksHeader
        images={user.images}
        type='profile'
        name={user.display_name}
      >
        {userPlaylist.length > 0 && (
          <>
            <span>{userPlaylist.length.toLocaleString()} public playlists</span>
            <Dot size={15} />
          </>
        )}
        <span className='font-semibold hover:underline'>
          {user.display_name}
        </span>
        {user.followers.total > 0 && (
          <>
            <Dot size={15} />
            <span>{user.followers.total.toLocaleString()} followers</span>
          </>
        )}
      </TracksHeader>
      <UserLists userPlaylist={userPlaylist} />
    </>
  );
}
