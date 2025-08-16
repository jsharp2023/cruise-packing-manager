import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type Theme = {
  id: string;
  name: string;
  primary: string;
  primaryForeground: string;
  secondary: string;
  accent: string;
  background: string;
  card: string;
  headerBg: string;
  headerText: string;
};

export const themes: Theme[] = [
  {
    id: 'ocean',
    name: 'Ocean Blue',
    primary: 'hsl(203.8863 88.2845% 53.1373%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(187 100% 38%)',
    accent: 'hsl(14 91% 64%)',
    background: 'hsl(210 100% 95%)',
    card: 'hsl(0 0% 100%)',
    headerBg: 'hsl(210 100% 25%)',
    headerText: 'hsl(0 0% 100%)',
  },
  {
    id: 'sunset',
    name: 'Sunset Cruise',
    primary: 'hsl(14 91% 64%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(45 93% 58%)',
    accent: 'hsl(262 83% 58%)',
    background: 'hsl(30 100% 97%)',
    card: 'hsl(0 0% 100%)',
    headerBg: 'hsl(14 80% 40%)',
    headerText: 'hsl(0 0% 100%)',
  },
  {
    id: 'tropical',
    name: 'Tropical Paradise',
    primary: 'hsl(159.7826 100% 36.0784%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(187 100% 38%)',
    accent: 'hsl(42.0290 92.8251% 56.2745%)',
    background: 'hsl(120 100% 97%)',
    card: 'hsl(0 0% 100%)',
    headerBg: 'hsl(159 80% 25%)',
    headerText: 'hsl(0 0% 100%)',
  },
  {
    id: 'elegant',
    name: 'Elegant Navy',
    primary: 'hsl(220 100% 25%)',
    primaryForeground: 'hsl(0 0% 100%)',
    secondary: 'hsl(210 100% 56%)',
    accent: 'hsl(341.4894 75.2000% 50.9804%)',
    background: 'hsl(220 20% 98%)',
    card: 'hsl(0 0% 100%)',
    headerBg: 'hsl(220 100% 15%)',
    headerText: 'hsl(0 0% 100%)',
  },
];

interface ThemeContextType {
  currentTheme: Theme;
  setTheme: (themeId: string) => void;
  themes: Theme[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [currentTheme, setCurrentTheme] = useState<Theme>(themes[0]);

  useEffect(() => {
    // Load saved theme from localStorage
    const savedThemeId = localStorage.getItem('cruise-packing-theme');
    if (savedThemeId) {
      const savedTheme = themes.find(t => t.id === savedThemeId);
      if (savedTheme) {
        setCurrentTheme(savedTheme);
      }
    }
  }, []);

  useEffect(() => {
    // Apply theme to CSS variables
    const root = document.documentElement;
    root.style.setProperty('--theme-primary', currentTheme.primary);
    root.style.setProperty('--theme-primary-foreground', currentTheme.primaryForeground);
    root.style.setProperty('--theme-secondary', currentTheme.secondary);
    root.style.setProperty('--theme-accent', currentTheme.accent);
    root.style.setProperty('--theme-background', currentTheme.background);
    root.style.setProperty('--theme-card', currentTheme.card);
    root.style.setProperty('--theme-header-bg', currentTheme.headerBg);
    root.style.setProperty('--theme-header-text', currentTheme.headerText);
  }, [currentTheme]);

  const setTheme = (themeId: string) => {
    const theme = themes.find(t => t.id === themeId);
    if (theme) {
      setCurrentTheme(theme);
      localStorage.setItem('cruise-packing-theme', themeId);
    }
  };

  return (
    <ThemeContext.Provider value={{ currentTheme, setTheme, themes }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}