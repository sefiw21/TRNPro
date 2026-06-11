import { create } from 'zustand';
import { persist } from 'zustand/middleware';

// 1. Officially added 'system' back to the types
export type Theme = 'light' | 'theme' | 'oled' | 'system';

interface ThemeState {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

const applyThemeToDocument = (theme: Theme) => {
  if (typeof document === 'undefined') return;
  
  const root = document.documentElement;
  
  // Always clear the slate first
  root.classList.remove('light', 'dark');
  root.removeAttribute('data-theme');

  // 2. Add the logic to handle the OS system check
  if (theme === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // If their computer is dark, we default to your favorite Blue Theme
    if (prefersDark) {
        root.classList.add('dark');
    } else {
        root.classList.add('light');
    }
  } else if (theme === 'oled') {
    root.classList.add('dark');
    root.setAttribute('data-theme', 'oled');
  } else if (theme === 'theme') {
    root.classList.add('dark');
  } else {
    root.classList.add('light');
  }
};

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      // We can safely default to 'system' now if you want new users to sync automatically
      theme: 'system', 

      setTheme: (newTheme) => {
        applyThemeToDocument(newTheme);
        set({ theme: newTheme });
      },
    }),
    {
      name: 'theme-store',
      onRehydrateStorage: () => (state) => {
        if (state) applyThemeToDocument(state.theme);
      },
    }
  )
);