// zustand store
import { create } from 'zustand';

interface ThemeState {
  theme: string;
  setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeState>((set) => ({
  theme: 'dark', // default value
  setTheme: (theme) => set({ theme }),
}));
