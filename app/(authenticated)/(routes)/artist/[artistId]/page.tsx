import { Dot } from 'lucide-react';

import { ArtistTables } from '@/app/(authenticated)/_components/artist-tables';
import { TracksHeader } from '@/app/(authenticated)/_components/tracks-header';
import { getArtistDiscography } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

interface ArtistProps {
  params: {
    artistId: string;
  };
}

export default async function Artist({ params }: ArtistProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const {
    artist,
    topTracks,
    albums,
    singles,
    appearsOn,
    compilations,
    relatedArtists,
  } = await getArtistDiscography(session, params.artistId);

  return (
    <div>
      <TracksHeader images={artist.images} type='Artist' name={artist.name}>
        <div className='mb-2 flex flex-row'>
          {artist.genres &&
            artist.genres?.map((genre) => (
              <>
                <span key={genre} className='capitalize'>
                  {genre}
                </span>
                <Dot size={15} />
              </>
            ))}
          <span className='text-muted-foreground'>
            {artist?.followers?.total} followers
          </span>
        </div>
      </TracksHeader>
      <ArtistTables
        artist={artist}
        topTracks={topTracks}
        albums={albums}
        singles={singles}
        appearsOn={appearsOn}
        compilations={compilations}
        relatedArtists={relatedArtists}
      />
    </div>
  );
}
