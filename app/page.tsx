'use client';
import type { SearchResults } from '@spotify/web-api-ts-sdk';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { signIn, signOut, useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import sdk from '@/lib/ClientInstance';

export default function Home() {
  const session = useSession();

  if (!session || session.status !== 'authenticated') {
    return (
      <div>
        <h1>Spotify Web API Typescript SDK in Next.js</h1>
        <Button onClick={() => signIn('spotify')}>Sign in with Spotify</Button>
      </div>
    );
  }
  return (
    <div>
      <p>Logged in as {session.data.user?.name}</p>
      <Button onClick={() => signOut()}>Sign out</Button>
      <SpotifySearch sdk={sdk} />
    </div>
  );
}

function SpotifySearch({ sdk }: { sdk: SpotifyApi }) {
  const [results, setResults] = useState<SearchResults>({} as SearchResults);

  useEffect(() => {
    (async () => {
      const results = await sdk.search('The Beatles', ['artist']);
      setResults(() => results);
    })();
  }, [sdk]);

  // generate a table for the results
  const tableRows = results.artists?.items.map((artist) => {
    return (
      <tr key={artist.id}>
        <td>{artist.name}</td>
        <td>{artist.popularity}</td>
        <td>{artist.followers.total}</td>
      </tr>
    );
  });

  return (
    <>
      <h1>Spotify Search for The Beatles</h1>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Popularity</th>
            <th>Followers</th>
          </tr>
        </thead>
        <tbody>{tableRows}</tbody>
      </table>
    </>
  );
}
