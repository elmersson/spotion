'use client';

import { BounceLoader } from 'react-spinners';

import { Box } from '@/components/box';

const Loading = () => {
  return (
    <Box className='flex h-full items-center justify-center bg-neutral-200 dark:bg-neutral-900'>
      <BounceLoader color='#22c55e' size={40} />
    </Box>
  );
};

export default Loading;
