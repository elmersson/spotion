import { useRouter } from 'next/navigation';

import { Album } from '@/types/types';

import { ShowItem } from './show-item';

interface ArtistAlbumsProps {
  albums: Album[];
}

export const ArtistAlbums = ({ albums }: ArtistAlbumsProps) => {
  const router = useRouter();
  return (
    <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-8'>
      {albums.map((album) => (
        <ShowItem
          key={album.id}
          author={album.name}
          title={album.name}
          imagePath={album.images[0].url}
          onClick={() => router.push(`/album/${album.id}`)}
        />
      ))}
    </div>
  );
};
