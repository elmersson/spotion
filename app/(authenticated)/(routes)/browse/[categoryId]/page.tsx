import { BrowseItem } from '@/app/(authenticated)/_components/browse-item';
import { Header } from '@/app/(authenticated)/_components/header';
import { getCategoriePlaylist } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

interface CategoryProps {
  params: {
    categoryId: string;
  };
}

export default async function Artist({ params }: CategoryProps) {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const data = await getCategoriePlaylist(session, params.categoryId);

  return (
    <div className='size-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-200 pb-4 dark:bg-neutral-900'>
      <Header />
      <div className='px-6'>
        <div className='3xl:grid-cols-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {data.playlists.items.map((item) => (
            <BrowseItem
              key={item.id}
              title={item.name}
              imagePath={item.images[0].url}
              id={item.id}
              itemType='playlist'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
