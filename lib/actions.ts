/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Album,
  Artist,
  AuthSession,
  Discography,
  Playlist,
  Show,
  ShowEpisodes,
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

export const getShowById = async (
  session: AuthSession,
  showId: string
): Promise<Show> => {
  return customGet(`https://api.spotify.com/v1/shows/${showId}`, session);
};

export const getShowEpisodesById = async (
  session: AuthSession,
  showId: string
): Promise<ShowEpisodes> => {
  const episodesUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?limit=20`;
  const data: ShowEpisodes = await customGet(episodesUrl, session);
  return data;
};

export const getArtistById = async (
  session: AuthSession,
  artistId: string
): Promise<Artist> => {
  return customGet(`https://api.spotify.com/v1/artists/${artistId}`, session);
};

export const getArtistDiscography = async (
  session: AuthSession,
  artistId: string
): Promise<Discography> => {
  const baseUrl = `https://api.spotify.com/v1/artists/${artistId}`;

  const urls = [
    '',
    '/top-tracks?market=from_token',
    '/albums?include_groups=album',
    '/albums?include_groups=single',
    '/albums?include_groups=appears_on',
    '/albums?include_groups=compilation',
    '/related-artists',
  ];

  const promises = urls.map((url) => customGet(`${baseUrl}${url}`, session));
  const results = await Promise.all(promises);

  return {
    artist: results[0],
    topTracks: results[1].tracks,
    albums: results[2].items,
    singles: results[3].items,
    appearsOn: results[4].items,
    compilations: results[5].items,
    relatedArtists: results[6].artists,
  };
};
