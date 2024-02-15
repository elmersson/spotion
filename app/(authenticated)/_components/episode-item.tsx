import Image from 'next/image';

import { Episode } from '@/types/types';

interface EpisodeItemProps {
  episode: Episode;
  publisher: string;
}
export const EpisodeItem = ({ episode, publisher }: EpisodeItemProps) => {
  return (
    <div className='my-3 flex flex-row space-x-4'>
      {episode.images.length > 0 && (
        <Image
          src={episode.images[0].url}
          alt='episode image'
          width={150}
          height={150}
        />
      )}
      <div className='flex flex-col justify-between pt-4'>
        <div>
          <span className='line-clamp-1 text-lg'>{episode.name}</span>
          <span className='line-clmap-1 text-muted-foreground'>
            {publisher}
          </span>
        </div>

        <span className='line-clamp-2 sm:w-[100%] md:w-[85%] lg:w-[75%]'>
          {episode.description}
        </span>
        <div>{episode.release_date}</div>
        {episode.resume_point && (
          <div>
            {episode.resume_point.fully_played ? 'Played' : episode.duration_ms}
          </div>
        )}
      </div>
    </div>
  );
};
