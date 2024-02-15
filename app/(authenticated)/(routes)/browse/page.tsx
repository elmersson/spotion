import { BrowseItem } from '../../_components/browse-item';
import { Header } from '../../_components/header';

export default function Browse() {
  return (
    <div
      className='
  size-full 
  overflow-hidden 
  overflow-y-auto 
  rounded-lg 
  bg-neutral-900
  '
    >
      <Header />
      <div className='px-6'>
        <div
          className='
        3xl:grid-cols-8 
        grid 
        grid-cols-2 
        gap-4 
        sm:grid-cols-3 
        md:grid-cols-3 
        lg:grid-cols-4 
        xl:grid-cols-5
        2xl:grid-cols-6
      '
        >
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
          <BrowseItem title='Test genre' imagePath='/images/liked.png' />
        </div>
      </div>
    </div>
  );
}
