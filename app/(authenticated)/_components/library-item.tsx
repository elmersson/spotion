'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { BsFolderPlus, BsFolderSymlink, BsCopy } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import { FiPlus } from 'react-icons/fi';
import { GoCheckCircle, GoPin, GoShare } from 'react-icons/go';
import { ImEmbed2 } from 'react-icons/im';
import { IoSearch } from 'react-icons/io5';
import { MdFormatListBulletedAdd } from 'react-icons/md';
import { PiWarningOctagon } from 'react-icons/pi';

import {
  ContextMenu,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuSeparator,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
} from '@/components/ui/context-menu';
import { Image as Images } from '@/types/types';

interface LibraryItemProps {
  id: string;
  name: string;
  owner?: string;
  type: string;
  images: Images[];
}
export const LibraryItem = ({
  id,
  name,
  owner,
  type,
  images,
}: LibraryItemProps) => {
  const router = useRouter();
  const handlePress = (id: string) => {
    router.push(`/${type}/${id}`);
  };
  return (
    <ContextMenu>
      <ContextMenuTrigger>
        <div
          role='button'
          onClick={() => handlePress(id)}
          className='group flex min-h-[27px] w-full items-center space-x-2.5 py-1 pr-3 text-sm font-medium text-muted-foreground grayscale-75 transition-all hover:bg-primary/5 hover:text-black hover:grayscale-0 hover:dark:text-white'
        >
          <div className='relative min-h-[24px] min-w-[24px] overflow-hidden rounded-md'>
            <Image
              fill
              src={
                images.length > 0
                  ? images[images.length - 1].url
                  : '/images/liked.png'
              }
              alt='MediaItem'
              className='object-cover'
            />
          </div>
          <div className='flex flex-col'>
            <span className='line-clamp-1 text-xs'>{name}</span>
            <span className='line-clamp-1 text-xxs capitalize'>
              {type === 'show' ? 'podcast' : type}
              {owner ? ` - ${owner}` : ''}
            </span>
          </div>
        </div>
      </ContextMenuTrigger>
      <ContextMenuContent>
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <MdFormatListBulletedAdd size={16} />
          <span className='text-sm'>Add to queue</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <CgProfile size={16} />
          <span className='text-sm'>Add to profile</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <PiWarningOctagon size={16} />
          <span className='text-sm'>Report</span>
        </ContextMenuItem>
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <GoCheckCircle size={16} />
          <span className='text-sm'>Remove from your Library</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <FiPlus size={16} />
          <span className='text-sm'>Create playlist</span>
        </ContextMenuItem>
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <BsFolderPlus size={16} />
          <span className='text-sm'>Create folder</span>
        </ContextMenuItem>
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <GoCheckCircle size={16} />
          <span className='text-sm'>Exclude from your taste profile</span>
        </ContextMenuItem>
        <ContextMenuSub>
          <ContextMenuSubTrigger className='text-muted-foreground hover:text-black hover:dark:text-white'>
            <div className='flex flex-row items-center space-x-4'>
              <BsFolderSymlink size={16} />
              <span className='text-sm'>Move to folder</span>
            </div>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent className='w-48'>
            <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
              <IoSearch size={16} />
              <span className='text-sm'>Find a folder</span>
            </ContextMenuItem>
            <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
              <FiPlus size={16} />
              <span className='text-sm'>Create folder</span>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
        <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
          <GoPin size={16} />
          <span className='text-sm'>Pin playlist</span>
        </ContextMenuItem>
        <ContextMenuSeparator />
        <ContextMenuSub>
          <ContextMenuSubTrigger className='text-muted-foreground hover:text-black hover:dark:text-white'>
            <div className='flex flex-row items-center space-x-4'>
              <GoShare size={16} />
              <span className='text-sm'>Share</span>
            </div>
          </ContextMenuSubTrigger>
          <ContextMenuSubContent>
            <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
              <BsCopy size={16} />
              <span className='text-sm'>Copy link to playlist</span>
            </ContextMenuItem>
            <ContextMenuItem className='flex flex-row items-center space-x-4 text-muted-foreground hover:text-black hover:dark:text-white'>
              <ImEmbed2 size={16} />
              <span className='text-sm'>Embed playlist</span>
            </ContextMenuItem>
          </ContextMenuSubContent>
        </ContextMenuSub>
      </ContextMenuContent>
    </ContextMenu>
  );
};
