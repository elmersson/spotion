'use client';

import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { BounceLoader } from 'react-spinners';

import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { useSearch } from '@/hooks/use-search';
import { searchSpotify } from '@/lib/actions';
import { getAuthSession } from '@/lib/server-utils';
import { SearchResults } from '@/types/types';

import { Box } from './box';

export const SearchCommand = () => {
  const userInfo = useSession();
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<SearchResults>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [focusedItemIndex, setFocusedItemIndex] = useState<number | null>(null);

  const { toggle, isOpen, onClose } = useSearch();

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        toggle();
      } else if (e.key === 'ArrowDown') {
        e.preventDefault();
        setFocusedItemIndex((prevIndex) => {
          const itemsLength = searchResults?.artists?.items?.length ?? 0;
          if (e.key === 'ArrowDown') {
            return prevIndex === null
              ? 0
              : Math.min(prevIndex + 1, itemsLength - 1);
          } else if (e.key === 'ArrowUp') {
            return prevIndex === null ? 0 : Math.max(prevIndex - 1, 0);
          }
          return prevIndex;
        });
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setFocusedItemIndex((prevIndex) =>
          prevIndex === null ? 0 : Math.max(prevIndex - 1, 0)
        );
      } else if (e.key === 'Enter' && focusedItemIndex !== null) {
        e.preventDefault();
        const artistId = searchResults?.artists?.items[focusedItemIndex]?.id;
        if (artistId) {
          router.push(`artist/${artistId}`);
          onClose();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [toggle, focusedItemIndex, searchResults, onClose, router]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setSearchResults(undefined);
      return;
    }

    const performSearch = async () => {
      setIsLoading(true);

      try {
        const session = await getAuthSession();
        if (session) {
          const results = await searchSpotify(session, searchQuery, 'artist');
          setSearchResults(results);
        }
      } catch (error) {
        setSearchResults(undefined);
      } finally {
        setIsLoading(false);
      }
    };

    const timeoutId = setTimeout(() => {
      performSearch();
    }, 500);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  if (!isMounted) {
    return null;
  }

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <CommandDialog open={isOpen} onOpenChange={onClose}>
      <CommandInput
        placeholder={`Search ${userInfo.data?.user?.name}s Spotion...`}
        onChangeCapture={handleInputChange}
      />
      <CommandList>
        <CommandEmpty>No results found.</CommandEmpty>
        <CommandGroup>
          {isLoading ? (
            <CommandItem>
              <Box className='flex h-full items-center justify-center'>
                <BounceLoader color='#22c55e' size={40} />
              </Box>
            </CommandItem>
          ) : searchResults ? (
            searchResults.artists?.items.map((artist) => (
              <CommandItem
                key={artist.id}
                onClick={() => router.push(`artist/${artist.id}`)}
              >
                {artist.name}
              </CommandItem>
            ))
          ) : (
            <CommandItem>No results found.</CommandItem>
          )}
        </CommandGroup>
      </CommandList>
    </CommandDialog>
  );
};
