import { TooltipTrigger } from '@radix-ui/react-tooltip';
import { IconType } from 'react-icons/lib';

import { Tooltip, TooltipContent } from '@/components/ui/tooltip';
import { cn } from '@/lib/utils';

interface UserActionItemProps {
  onClick: () => void;
  Icon: IconType;
  label: string;
  isActive?: boolean;
  tooltip?: string;
}

export const UserActionItem = ({
  onClick,
  Icon,
  label,
  isActive = false,
  tooltip,
}: UserActionItemProps) => {
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <div
          role='button'
          onClick={onClick}
          className={cn(
            'group flex min-h-[27px] w-full items-center px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-primary/5 hover:text-black hover:dark:text-white',
            isActive && 'text-black dark:text-white'
          )}
        >
          <Icon className='mr-2 shrink-0' size={16} />
          <span className='line-clamp-1'>{label}</span>
        </div>
      </TooltipTrigger>
      {tooltip && (
        <TooltipContent side='right'>
          <p>{tooltip}</p>
        </TooltipContent>
      )}
    </Tooltip>
  );
};
