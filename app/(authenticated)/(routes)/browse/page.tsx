import { getCategories } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';

import { BrowseItem } from '../../_components/browse-item';
import { Header } from '../../_components/header';

export default async function Browse() {
  const session = await getAuthSession();

  if (!session) {
    return null;
  }

  const data = await getCategories(session);

  return (
    <div className='size-full overflow-hidden overflow-y-auto rounded-lg bg-neutral-200 pb-4 dark:bg-neutral-900'>
      <Header />
      <div className='px-6'>
        <div className='3xl:grid-cols-8 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6'>
          {data.categories.items.map((item) => (
            <BrowseItem
              key={item.id}
              title={item.name}
              imagePath={item.icons[0].url}
              id={item.id}
              itemType='browse'
            />
          ))}
        </div>
      </div>
    </div>
  );
}
