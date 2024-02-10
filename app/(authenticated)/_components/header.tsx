'use client';

import { useRouter } from 'next/navigation';
import { FC, ReactNode } from 'react';
import { RxCaretLeft, RxCaretRight } from 'react-icons/rx';

interface HeaderProps {
  children?: ReactNode;
}

export const Header: FC<HeaderProps> = ({ children }) => {
  const router = useRouter();

  return (
    <div className='h-fit p-6'>
      <div className='mb-4 flex w-full items-center justify-between'>
        <div className='hidden items-center gap-x-2 md:flex'>
          <button
            onClick={() => router.back()}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-black 
              opacity-75
              transition
              hover:opacity-100
            '
          >
            <RxCaretLeft className='text-white' size={35} />
          </button>
          <button
            onClick={() => router.forward()}
            className='
              flex 
              cursor-pointer 
              items-center 
              justify-center 
              rounded-full 
              bg-black 
              opacity-75
              transition 
              hover:opacity-100
            '
          >
            <RxCaretRight className='text-white' size={35} />
          </button>
        </div>
      </div>
      {children}
    </div>
  );
};
