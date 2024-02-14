/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Album,
  Artist,
  AuthSession,
  Playlist,
  Show,
  Track,
  UserSavedShow,
} from '@/types/types';

import { customGet } from './server-utils';

export const getUserLikedPlaylists = async (
  session: AuthSession
): Promise<Playlist[]> => {
  const data = await customGet(
    'https://api.spotify.com/v1/me/playlists',
    session
  );
  return data.items;
};

export const getUserLikedAlbums = async (
  session: AuthSession
): Promise<Album[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=50`,
    session
  );
  return data.items.map((item: any) => item.album);
};

export const getUserLikedArtists = async (
  session: AuthSession
): Promise<Artist[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/following?type=artist&limit=50`,
    session
  );
  return data.artists.items;
};

type LikedSongs = { total: number; items: Track[] };

export const getUserLikedSongs = async (
  session: AuthSession
): Promise<LikedSongs> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/tracks?limit=50`,
    session
  );

  const finalData = { total: data.total, items: data.items };
  let limit = 50;
  let currUrl = data.next;

  while (currUrl !== null) {
    const nextData = await customGet(currUrl, session);
    finalData.items.push(...nextData.items);
    limit += 50;
    currUrl = nextData.next;
  }

  return {
    total: data.total,
    items: data.items.map((item: any) => item.track),
  };
};

export const getUserSavedShows = async (
  session: AuthSession
): Promise<Show[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/shows?limit=50`,
    session
  );

  const shows = data.items.map((item: UserSavedShow) => item.show);

  return shows;
};

export const getPlaylistById = async (
  session: AuthSession,
  playlistId: string
): Promise<Playlist> => {
  const data = await customGet(
    `https://api.spotify.com/v1/playlists/${playlistId}`,
    session
  );
  const playlist = data;

  let limit = 50;
  let currUrl = data.tracks.next;

  while (currUrl !== null) {
    const nextData = await customGet(currUrl, session);
    playlist.tracks.items.push(...nextData.items);
    limit += 50;
    currUrl = nextData.next;
  }

  return playlist;
};

export const getAlbumById = async (
  session: AuthSession,
  albumId: string
): Promise<Album> => {
  return customGet(`https://api.spotify.com/v1/albums/${albumId}`, session);
};
