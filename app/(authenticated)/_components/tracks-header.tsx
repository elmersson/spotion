import { Music } from 'lucide-react';
import Image from 'next/image';
import { ReactNode } from 'react';

import { cn } from '@/lib/utils';
import { Image as Images } from '@/types/types';

interface TracksHeaderProps {
  images: Images[];
  type: string;
  name: string;
  description?: string;
  children: ReactNode;
}

export const TracksHeader = ({
  images,
  type,
  name,
  description,
  children,
}: TracksHeaderProps) => {
  return (
    <div className='flex items-end gap-6'>
      {images && images.length > 0 ? (
        <Image
          src={images[0].url}
          alt={name}
          height={240}
          width={240}
          className='size-60 rounded-sm object-contain grayscale-25 hover:grayscale-0'
          priority
        />
      ) : (
        <div className='size-60 rounded-sm object-contain grayscale-25 hover:grayscale-0'>
          <Music size={160} className='bg-paper size-full ' />
        </div>
      )}

      <div className='mr-4 flex max-w-[80%] flex-col'>
        <h5 className='mb-4 text-xs capitalize'>{type}</h5>
        <h2
          className={cn('text-6xl font-bold', name.length > 24 && 'text-3xl')}
        >
          {name}
        </h2>

        {description && (
          <p className='mt-3 text-xs text-muted-foreground'>{description}</p>
        )}

        <div className='mt-3 flex items-center text-xs'>{children}</div>
      </div>
    </div>
  );
};
