import { create } from "zustand";

type SheetStore = {
  id?: string;
  isOpen: boolean;
  onOpen: (id?: string) => void;
  onClose: () => void;
};

export  const useSheet = create<SheetStore>((set) => ({
  id: undefined,
  isOpen: false,
  onOpen: (id?: string) => set({ isOpen: true, id }),
  onClose: () => set({ isOpen: false, id: undefined }),
}));