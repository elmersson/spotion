'use client';

import * as RadixSlider from '@radix-ui/react-slider';
import { FC } from 'react';

interface SlideProps {
  value?: number;
  onChange?: (value: number) => void;
  max?: number;
}

export const Slider: FC<SlideProps> = ({ value = 1, onChange, max }) => {
  const handleChange = (newValue: number[]) => {
    onChange?.(newValue[0]);
  };

  return (
    <RadixSlider.Root
      className='
            relative 
            flex 
            h-10 
            w-full 
            touch-none 
            select-none 
            items-center
          '
      defaultValue={[1]}
      value={[value]}
      onValueChange={handleChange}
      max={max ?? 1}
      min={0}
      step={0.01}
      aria-label='Volume'
    >
      <RadixSlider.Track
        className='
              relative 
              h-[3px] 
              grow 
              rounded-full 
              bg-neutral-600
            '
      >
        <RadixSlider.Range
          className='
                absolute 
                h-full 
                rounded-full 
                bg-neutral-400
                hover:text-black
                hover:dark:bg-white
              '
        />
      </RadixSlider.Track>
    </RadixSlider.Root>
  );
};
