/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Album,
  Artist,
  AuthSession,
  Discography,
  Playlist,
  RecentlyPlayed,
  Show,
  ShowEpisodes,
  Track,
  TrackAnalysis,
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
  session: AuthSession,
  limit = 50
): Promise<Album[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/albums?market=from_token&limit=${limit}`,
    session
  );
  return data.items.map((item: any) => item.album);
};

export const getUserLikedArtists = async (
  session: AuthSession,
  limit = 50
): Promise<Artist[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/following?type=artist&limit=${limit}`,
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
  session: AuthSession,
  limit = 50
): Promise<Show[]> => {
  const data = await customGet(
    `https://api.spotify.com/v1/me/shows?limit=${limit}`,
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
  showId: string,
  limit = 20
): Promise<ShowEpisodes> => {
  const episodesUrl = `https://api.spotify.com/v1/shows/${showId}/episodes?limit=${limit}`;
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

export const getRecentlyPlayedTracks = async (
  session: AuthSession,
  limit = 50
): Promise<RecentlyPlayed> => {
  return customGet(
    `https://api.spotify.com/v1/me/player/recently-played?limit=${limit}`,
    session
  );
};

export const getTrackAnalysis = async (
  session: AuthSession,
  trackId: string
): Promise<TrackAnalysis> => {
  return customGet(
    `https://api.spotify.com/v1/audio-features/${trackId}`,
    session
  );
};

export const getTrackById = async (
  session: AuthSession,
  trackId: string
): Promise<Track> => {
  return customGet(`https://api.spotify.com/v1/tracks/${trackId}`, session);
};

export const getTrackRecommendations = async (
  session: AuthSession,
  trackId: string
): Promise<Track[]> => {
  const trackAnalysis = await getTrackAnalysis(session, trackId);

  const trackFeatures = {
    acousticness: 1,
    danceability: 1,
    energy: 1,
    instrumentalness: 1,
    key: 1,
    liveness: 1,
    loudness: 1,
    mode: 1,
    speechiness: 1,
    tempo: 1,
    valence: 1,
  };

  const track = await getTrackById(session, trackId);
  const artist = await getArtistById(session, track.artists[0].id);

  let endpoint = `https://api.spotify.com/v1/recommendations?limit=30&seed_artists=${artist.id}&seed_tracks=${trackId}`;

  Object.entries(trackAnalysis).forEach(([key, value]) => {
    // eslint-disable-next-line no-prototype-builtins
    if (trackFeatures.hasOwnProperty(key)) {
      endpoint += `&target_${key}=${value}`;
    }
  });

  const data = await customGet(endpoint, session);

  return data.tracks;
};

export const getNewReleases = async (
  session: AuthSession,
  limit: 15
): Promise<Album[]> => {
  return customGet(
    `https://api.spotify.com/v1/browse/new-releases?country=IN&limit=${limit}`,
    session
  ).then((data) => data.albums.items);
};

export const getUserTopArtists = async (
  session: AuthSession,
  limit: number = 20
): Promise<Artist[]> => {
  const url = `https://api.spotify.com/v1/me/top/artists?limit=${limit}`;
  const data = await customGet(url, session);

  return data.items.map((item: any) => ({
    id: item.id,
    name: item.name,
    genres: item.genres,
    followers: item.followers.total,
    images: item.images,
    popularity: item.popularity,
  }));
};
