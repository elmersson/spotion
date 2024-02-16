import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { Album, Artist, Playlist, Show } from '@/types/types';

import { LibraryItem } from './library-item';

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
      <div className='pl-1'>
        <Accordion type='multiple'>
          {isPlaylist && (
            <AccordionItem value='Playlists'>
              <AccordionTrigger>
                <span className='text-xs font-medium '>Playlists</span>
              </AccordionTrigger>
              <AccordionContent>
                {playlists.map((playlist) => (
                  <LibraryItem
                    id={playlist.id}
                    name={playlist.name}
                    key={playlist.id}
                    owner={playlist.owner.display_name}
                    type={playlist.type}
                    images={playlist.images}
                  />
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
                  <LibraryItem
                    id={artist.id}
                    name={artist.name}
                    key={artist.id}
                    type='artist'
                    images={artist.images}
                  />
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
                  <LibraryItem
                    id={album.id}
                    name={album.name}
                    key={album.id}
                    owner={album.artists[0].name}
                    type={album.album_type || 'album'}
                    images={album.images}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
          {isShows && (
            <AccordionItem value='Shows'>
              <AccordionTrigger>
                <span className='text-xs font-medium '>Podcasts</span>
              </AccordionTrigger>
              <AccordionContent>
                {shows.map((show) => (
                  <LibraryItem
                    id={show.id}
                    name={show.name}
                    key={show.id}
                    owner={show.publisher}
                    type={show.type}
                    images={show.images}
                  />
                ))}
              </AccordionContent>
            </AccordionItem>
          )}
        </Accordion>
      </div>
    </div>
  );
};
