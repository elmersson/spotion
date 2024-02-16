import { useRouter } from 'next/navigation';

import { Artist } from '@/types/types';

import { ShowItem } from './show-item';

interface ArtistRelatedProps {
  artists: Artist[];
}

export const ArtistRelated = ({ artists }: ArtistRelatedProps) => {
  const router = useRouter();
  return (
    <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
      {artists.map((artist) => (
        <ShowItem
          key={artist.id}
          author={artist.name}
          title={artist.name}
          imagePath={artist.images[0].url}
          onClick={() => router.push(`/artist/${artist.id}`)}
        />
      ))}
    </div>
  );
};
