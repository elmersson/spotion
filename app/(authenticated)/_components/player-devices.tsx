'use client';
import { LuMonitorSpeaker } from 'react-icons/lu';

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { cn } from '@/lib/utils';
import { Device } from '@/types/types';

interface PlayerDevicesProps {
  currentDevice?: Device;
}

export const PlayerDevices = ({ currentDevice }: PlayerDevicesProps) => {
  const otherDevice = currentDevice?.name !== 'This web browser';
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <div role='button'>
          <LuMonitorSpeaker
            className={cn(
              'cursor-pointer text-neutral-400 transition hover:text-black hover:dark:text-white',
              otherDevice &&
                'text-green-600 hover:text-green-400 hover:dark:text-green-400'
            )}
            size={18}
          />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className='bg-neutral-200 dark:bg-neutral-900'
        align='start'
        alignOffset={11}
        forceMount
      >
        <div className='flex flex-col space-y-2 p-2'>
          <span
            className={cn(
              'text-sm font-medium leading-none text-muted-foreground',
              otherDevice && 'text-green-600'
            )}
          >
            {currentDevice?.name}
          </span>
          <DropdownMenuSeparator />
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
