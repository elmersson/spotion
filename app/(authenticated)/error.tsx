'use client';

import { Box } from '@/components/box';

const Error = () => {
  return (
    <Box className='flex h-full items-center justify-center bg-neutral-200 dark:bg-neutral-900'>
      <div className='text-neutral-400'>Something went wrong.</div>
    </Box>
  );
};

export default Error;
