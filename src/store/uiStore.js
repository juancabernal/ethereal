import { create } from 'zustand';

export const useUiStore = create((set) => ({
  isLoading: true,
  setLoading: (value) => set({ isLoading: value }),
  pageKey: 'home',
  setPageKey: (key) => set({ pageKey: key }),
}));
