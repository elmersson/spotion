import { Playlist } from '@/types/types';

import { LibraryItem } from './libraryitem';

interface LibraryProps {
  playlists: Playlist[];
}
export const Library = ({ playlists }: LibraryProps) => {
  return (
    <>
      <span className='text-sm font-medium text-muted-foreground'>Library</span>
      {playlists.map((playlist) => (
        <LibraryItem playlist={playlist} key={playlist.id} />
      ))}
    </>
  );
};
