import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';

/**
 * Light/dark theme. Light is the default premium look; dark is opt-in and
 * remembered in localStorage. The initial class is applied by an inline
 * script in index.html (see THEME_STORAGE_KEY there) so a returning dark-mode
 * visitor never flashes the light theme before hydration.
 */
export const THEME_STORAGE_KEY = 'mars-theme';

const ThemeContext = createContext(null);

const readStoredTheme = () => {
  if (typeof document === 'undefined') return 'light';
  return document.documentElement.classList.contains('dark') ? 'dark' : 'light';
};

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(readStoredTheme);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark');
    // Keeps form controls, scrollbars and the browser UI in step with the theme.
    document.documentElement.style.colorScheme = theme;
    try {
      window.localStorage.setItem(THEME_STORAGE_KEY, theme);
    } catch {
      /* private mode, the theme still applies for this session */
    }
  }, [theme]);

  const toggleTheme = useCallback(
    () => setTheme(current => (current === 'dark' ? 'light' : 'dark')),
    [],
  );

  const value = useMemo(
    () => ({ theme, toggleTheme, isDark: theme === 'dark' }),
    [theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
