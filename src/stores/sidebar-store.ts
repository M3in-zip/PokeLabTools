import { create } from "zustand";

interface SidebarState {
  visible: boolean;
  toggle: () => void;
  open: () => void;
  close: () => void;
}

export const useSidebarStore = create<SidebarState>((set) => ({
  visible: false,
  toggle: () => set((state) => ({ visible: !state.visible })),
  open: () => set({ visible: true }),
  close: () => set({ visible: false }),
}));
