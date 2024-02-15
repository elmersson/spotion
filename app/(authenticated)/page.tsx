import { redirect } from 'next/navigation';

import { getAuthSession } from '@/lib/server-utils';

import { Header } from './_components/header';
import { ListItem } from './_components/list-item';
import { ShowItem } from './_components/show-item';

export default async function Home() {
  const session = await getAuthSession();

  if (!session) {
    redirect('/login');
  }

  return (
    <div
      className='
size-full 
overflow-hidden 
overflow-y-auto 
rounded-lg 
bg-neutral-200
dark:bg-neutral-900
'
    >
      <Header>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-semibold text-black dark:text-white'>
            Recantly played
          </h1>
        </div>
        <div
          className='
        mt-4 
        grid 
        grid-cols-2 
        gap-4 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5 
        2xl:grid-cols-8
      '
        >
          <ShowItem
            author='Rasmus Elmersson'
            title='Test song'
            imagePath='/images/liked.png'
          />
          <ShowItem
            author='Rasmus Elmersson'
            title='Test song'
            imagePath='/images/liked.png'
          />
          <ShowItem
            author='Rasmus Elmersson'
            title='Test song'
            imagePath='/images/liked.png'
          />
          <ShowItem
            author='Rasmus Elmersson'
            title='Test song'
            imagePath='/images/liked.png'
          />
        </div>
      </Header>
      <div className='mb-7 mt-2 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-black dark:text-white'>
            Your shows
          </h1>
        </div>
        <div
          className='
              mb-2 
              mt-4 
              grid 
              grid-cols-1 
              gap-3 
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            '
        >
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
        </div>
      </div>
      <div className='mb-7 mt-2 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-black dark:text-white'>
            Others play
          </h1>
        </div>
        <div
          className='
              mb-2 
              mt-4 
              grid 
              grid-cols-1 
              gap-3 
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            '
        >
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
        </div>
      </div>
      <div className='mb-7 mt-2 px-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-xl font-semibold text-black dark:text-white'>
            Your suggestions
          </h1>
        </div>
        <div
          className='
              mb-2 
              mt-4 
              grid 
              grid-cols-1 
              gap-3 
              sm:grid-cols-2
              lg:grid-cols-3
              xl:grid-cols-4
              2xl:grid-cols-5
            '
        >
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
          <ListItem
            name='test med massa text som inte vet var dent ska'
            image='/images/liked.png'
          />
        </div>
      </div>
    </div>
  );
}
