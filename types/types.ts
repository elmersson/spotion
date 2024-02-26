import { DefaultSession } from 'next-auth';

interface AuthUser {
  name: string;
  email: string;
  picture?: string | null;
  image?: string | null;
  accessToken: string;
  sub: string;
  expires_at: number;
}

export interface AuthSession extends Omit<DefaultSession, 'user'> {
  user: AuthUser;
}

export interface Image {
  height: number | null;
  url: string;
  width: number | null;
}

export interface Category {
  id: string;
  name: string;
  icons: Image[];
}

export interface Album {
  id: string;
  name: string;
  artists: Artist[];
  images: Image[];
  album_type?: string;
  release_date: string;
  tracks: {
    total: number;
    items: Track[];
  };
}

export interface Artist {
  id: string;
  name: string;
  images: Image[];
  followers?: {
    total: number;
  };
  genres?: string[];
}

export interface Track {
  id: string;
  name: string;
  album: Album;
  artists: Artist[];
  duration_ms: number;
  preview_url: string;
}

export interface Playlist {
  description?: string;
  collaborative: boolean;
  id: string;
  followers: {
    total: number;
  };
  images: Image[];
  name: string;
  owner: {
    id: string;
    display_name?: string;
  };
  public: boolean;
  items?: [{ added_at: string; track: Track }];
  tracks: {
    items: [{ added_at: string; track: Track }];
    total: number;
  };
  type: string;
  total?: number;
}

export interface SearchResults {
  albums?: {
    items: Album[];
  };
  artists?: {
    items: Artist[];
  };
  playlists?: {
    items: Playlist[];
  };
  tracks?: {
    items: Track[];
  };
}

export interface TrackAnalysis {
  acousticness: number;
  danceability: number;
  energy: number;
  instrumentalness: number;
  key: number;
  liveness: number;
  loudness: number;
  mode: 1 | 0;
  speechiness: number;
  tempo: number;
  valence: number;
}

export interface Show {
  available_markets: string[];
  copyrights: { text: string; type: string }[];
  description: string;
  html_description: string;
  explicit: boolean;
  external_urls: { spotify: string };
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  languages: string[];
  media_type: string;
  name: string;
  publisher: string;
  type: 'show';
  uri: string;
  total_episodes: number;
}

export interface UserSavedShow {
  added_at: string;
  show: Show;
}

export interface UserSavedShowsResponse {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: UserSavedShow[];
}

export interface ShowEpisodes {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Episode[];
}

export interface Episode {
  audio_preview_url: string;
  description: string;
  html_description: string;
  duration_ms: number;
  explicit: boolean;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  is_externally_hosted: boolean;
  is_playable: boolean;
  language: string;
  languages: string[];
  name: string;
  release_date: string;
  release_date_precision: string;
  resume_point: ResumePoint;
  type: string;
  uri: string;
  restrictions?: {
    reason: string;
  };
}

interface ExternalUrls {
  spotify: string;
}

interface ResumePoint {
  fully_played: boolean;
  resume_position_ms: number;
}

export interface Discography {
  artist: Artist;
  topTracks: Track[];
  albums: Album[];
  singles: Album[];
  appearsOn: Album[];
  compilations: Album[];
  relatedArtists: Artist[];
}

export interface RecentlyPlayed {
  items: RecentlyPlayedItem[];
  next: string;
  cursors: Cursors;
  limit: number;
  href: string;
}

interface RecentlyPlayedItem {
  track: Track;
  played_at: string;
  context: Context;
}

interface Context {
  type: string;
  href: string;
  external_urls: ExternalUrls;
}

interface ExternalUrls {
  spotify: string;
}

interface Cursors {
  after: string;
  before: string;
}

export interface TopItemsResult {
  artists: Artist[];
  tracks: Track[];
}

export interface User {
  display_name: string;
  external_urls: ExternalUrls;
  followers: {
    href: string;
    total: number;
  };
  href: string;
  id: string;
  images: Image[];
  type: string;
  uri: string;
}

export interface PlaybackState {
  device: Device;
  repeat_state: string;
  shuffle_state: boolean;
  context: PlaybackContext;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: Track;
  currently_playing_type: string;
  actions: PlaybackActions;
}

export interface Device {
  id: string;
  is_active: boolean;
  is_private_session: boolean;
  is_restricted: boolean;
  name: string;
  type: string;
  volume_percent: number;
  supports_volume: boolean;
}

export interface PlaybackContext {
  type: string;
  href: string;
  external_urls: ExternalUrls;
  uri: string;
}

export interface ExternalIds {
  isrc: string;
  ean: string;
  upc: string;
}

export interface Restrictions {
  reason: string;
}

export interface PlaybackActions {
  interrupting_playback: boolean;
  pausing: boolean;
  resuming: boolean;
  seeking: boolean;
  skipping_next: boolean;
  skipping_prev: boolean;
  toggling_repeat_context: boolean;
  toggling_shuffle: boolean;
  toggling_repeat_track: boolean;
  transferring_playback: boolean;
}

export interface CategoriesResponse {
  categories: {
    href: string;
    limit: number;
    next: string | null;
    offset: number;
    previous: string | null;
    total: number;
    items: CategoryItem[];
  };
}

export interface CategoryItem {
  href: string;
  icons: Image[];
  id: string;
  name: string;
}

export interface CategoryPlaylistsResponse {
  message: string;
  playlists: CategoryPlaylistCollection;
}

interface CategoryPlaylistCollection {
  href: string;
  items: CategoryPlaylistItem[];
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
}

interface CategoryPlaylistItem {
  collaborative: boolean;
  description: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  images: Image[];
  name: string;
  owner: PlaylistOwner;
  primary_color: string | null;
  public: boolean;
  snapshot_id: string;
  tracks: PlaylistTracks;
  type: string;
  uri: string;
}

interface PlaylistOwner {
  display_name: string;
  external_urls: ExternalUrls;
  href: string;
  id: string;
  type: string;
  uri: string;
}

interface PlaylistTracks {
  href: string;
  total: number;
}
