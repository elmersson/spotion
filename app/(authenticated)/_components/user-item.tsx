'use client';
import { ChevronsLeftRight, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
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
  const router = useRouter();
  const session = useSession();

  const logout = () => {
    signOut({ callbackUrl: 'http://localhost:3000/login' });
  };

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
        className='bg-neutral-200 dark:bg-neutral-900'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='flex flex-col space-y-2 p-2'>
          <p className='text-sm font-medium leading-none text-muted-foreground'>
            {session.data?.user?.email}
          </p>
          <DropdownMenuSeparator />
          <Link
            href='https://www.spotify.com/us/account/overview/?utm_source=spotify&utm_medium=menu&utm_campaign=your_account'
            rel='noopener noreferrer'
            target='_blank'
            className='flex flex-row items-center justify-between text-sm font-medium text-muted-foreground'
          >
            <span>Profile</span> <ExternalLink size={18} />
          </Link>
          <DropdownMenuSeparator />

          <Link
            href='https://support.spotify.com/'
            rel='noopener noreferrer'
            target='_blank'
            className='flex flex-row items-center justify-between text-sm font-medium text-muted-foreground'
          >
            <span>Support</span> <ExternalLink size={18} />
          </Link>
          <DropdownMenuSeparator />

          <div className='flex items-center gap-x-2'>
            <div className='rounded-md bg-secondary p-1'>
              <Avatar className='size-6'>
                <AvatarImage
                  src={session.data?.user?.image || '/images/liked.png'}
                />
              </Avatar>
            </div>
            <div
              className='space-y-1'
              role='button'
              onClick={() => router.push(`/user/${session.data?.user?.name}`)}
            >
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
            onClick={logout}
            className='bg-transparent focus-visible:ring-0 dark:text-white'
          >
            Log out
          </Button>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
