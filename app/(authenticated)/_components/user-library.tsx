import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Album, Artist, Playlist, Show } from '@/types/types';

import { LibraryItem } from './libraryitem';

interface LibraryProps {
  playlists: Playlist[];
  artists: Artist[];
  albums: Album[];
  shows: Show[];
}
export const UserLibrary = ({
  playlists,
  artists,
  albums,
  shows,
}: LibraryProps) => {
  const isPlaylist = playlists.length > 0;
  const isArtists = artists.length > 0;
  const isAlbums = albums.length > 0;
  const isShows = shows.length > 0;

  return (
    <div className='mt-4 px-3'>
      <div className='mb-1'>
        <span className='text-sm font-medium text-muted-foreground'>
          Library
        </span>
      </div>
      <Accordion type='multiple'>
        {isPlaylist && (
          <AccordionItem value='Playlists'>
            <AccordionTrigger>
              <span className='text-xs font-medium'>Playlists</span>
            </AccordionTrigger>
            <AccordionContent>
              {playlists.map((playlist) => (
                <LibraryItem playlist={playlist} key={playlist.id} />
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
        {isArtists && (
          <AccordionItem value='Artists'>
            <AccordionTrigger>
              <span className='text-xs font-medium '>Artists</span>
            </AccordionTrigger>
            <AccordionContent>
              {artists.map((artist) => (
                <div key={artist.id}>{artist.name}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
        {isAlbums && (
          <AccordionItem value='Albums'>
            <AccordionTrigger>
              <span className='text-xs font-medium '>Albums</span>
            </AccordionTrigger>
            <AccordionContent>
              {albums.map((album) => (
                <div key={album.id}>{album.name}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
        {isShows && (
          <AccordionItem value='Shows'>
            <AccordionTrigger>
              <span className='text-xs font-medium '>Shows</span>
            </AccordionTrigger>
            <AccordionContent>
              {shows.map((show) => (
                <div key={show.id}>{show.name}</div>
              ))}
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </div>
  );
};
