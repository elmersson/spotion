import { Album, Playlist } from '@/types/types';

export function formatDuration(totalDurationMs: number): string {
  const totalMinutes = totalDurationMs / 1000 / 60;

  if (totalMinutes < 60) {
    return `${Math.round(totalMinutes)} min`;
  } else {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = Math.round(totalMinutes % 60);
    return `${hours} hr${minutes > 0 ? ` ${minutes} min` : ''}`;
  }
}

export function convertMsToMinutesSeconds(ms: number): string {
  const totalSeconds = Math.floor(ms / 1000);

  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;

  const formattedMinutes = String(minutes);
  const formattedSeconds = String(seconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
}

export const calculateTotalDuration = (playlist: Playlist | Album) => {
  const isPlaylist = (playlist: Playlist | Album): playlist is Playlist => {
    return 'followers' in playlist;
  };

  if (isPlaylist(playlist)) {
    return playlist.tracks.items.reduce(
      (total, { track }) => total + track.duration_ms,
      0
    );
  } else {
    return playlist.tracks.items.reduce(
      (total, track) => total + track.duration_ms,
      0
    );
  }
};
