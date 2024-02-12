'use client';
import { ChevronsLeftRight } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';

import { Avatar, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export const UserItem = () => {
  const session = useSession();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div
          role='button'
          className='flex w-full items-center p-3 text-sm text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white'
        >
          <div className='flex max-w-[160px] items-center gap-x-2 grayscale hover:grayscale-0'>
            <Avatar className='size-5'>
              <AvatarImage
                src={session.data?.user?.image || '/images/liked.png'}
              />
            </Avatar>
            <span className='line-clamp-1 text-start text-sm'>
              {session.data?.user?.name}
            </span>
          </div>
          <ChevronsLeftRight className='ml-2 size-4 rotate-90 text-muted-foreground' />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='w-80'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='flex flex-col space-y-4 p-2'>
          <p className='text-xs font-medium leading-none text-muted-foreground'>
            {session.data?.user?.email}
          </p>
          <div className='flex items-center gap-x-2'>
            <div className='rounded-md bg-secondary p-1'>
              <Avatar className='size-6'>
                <AvatarImage
                  src={session.data?.user?.image || '/images/liked.png'}
                />
              </Avatar>
            </div>
            <div className='space-y-1'>
              <p className='line-clamp-1 text-sm'>{session.data?.user?.name}</p>
            </div>
          </div>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem
          asChild
          className='w-full cursor-pointer text-muted-foreground'
        >
          <Button
            onClick={() => signOut}
            className='bg-transparent focus-visible:ring-0 dark:text-white'
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
