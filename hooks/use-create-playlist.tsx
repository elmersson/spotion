import { create } from 'zustand';

type CreatePlaylistStore = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useCreatePlaylist = create<CreatePlaylistStore>((set) => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));
