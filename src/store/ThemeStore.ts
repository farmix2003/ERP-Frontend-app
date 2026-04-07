import { create } from "zustand";

type Theme = 'light' | 'dark';

interface ThemeStore {
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;
}

const getStoredTheme = (): Theme =>{
    const storedTheme = localStorage.getItem('theme') as Theme | null;

    if (storedTheme === 'light' || storedTheme === 'dark') {
        return storedTheme;
    }
    return 'light';
}

const applyTheme = (theme: Theme) => {
    const root = document.documentElement;
    if (theme === 'dark') {
        root.classList.add('dark');
    } else {
        root.classList.remove('dark');
    }

    localStorage.setItem('theme', theme);
}

export const useThemeStore = create<ThemeStore>((set, get) => ({
    theme: getStoredTheme(),

    toggleTheme: () => {
        const nextTheme = get().theme === 'light' ? 'dark' : 'light';
        applyTheme(nextTheme);
        set({ theme: nextTheme });
    },

    setTheme: (theme) => {
        applyTheme(theme);
        set({ theme });
    }
}));