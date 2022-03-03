import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type VFC
} from 'react';
import { ThemeProvider as SCThemeProvider } from 'styled-components';
import { themes } from '../styles/themes';

type ThemeKey = keyof typeof themes;
type ThemeKeyOrAuto = ThemeKey | 'auto';

const mediaQuery = '(prefers-color-scheme: dark)';
const systemThemeKey = (): ThemeKey =>
  window.matchMedia(mediaQuery).matches ? 'dark' : 'light';

interface ThemeContextValue {
  themeKey: ThemeKeyOrAuto;
  setThemeKey: (key: ThemeKeyOrAuto) => void;
}
export const ThemeContext = createContext<ThemeContextValue>({
  themeKey: 'auto',
  setThemeKey: () => void 0
});

interface ThemeProviderProps {
  children?: React.ReactNode;
}
export const ThemeProvider: VFC<ThemeProviderProps> = ({ children }) => {
  const [themeKey, setThemeKey] = useState<ThemeKeyOrAuto>(
    (localStorage.getItem('theme') as ThemeKeyOrAuto | null) ?? 'auto'
  );
  const [systemTheme, setSystemTheme] = useState(systemThemeKey());
  const theme = themes[themeKey === 'auto' ? systemTheme : themeKey];
  useEffect(() => {
    const media = window.matchMedia(mediaQuery);
    const el = ({ matches }: MediaQueryListEvent) => {
      setSystemTheme(matches ? 'dark' : 'light');
    };
    media.addEventListener('change', el);
    return () => media.removeEventListener('change', el);
  }, [themeKey]);
  return (
    <SCThemeProvider theme={theme}>
      <ThemeContext.Provider
        value={{
          themeKey,
          setThemeKey: key => {
            setThemeKey(key);
            localStorage.setItem('theme', key);
          }
        }}
      >
        {children}
      </ThemeContext.Provider>
    </SCThemeProvider>
  );
};

export const useTheme = () => {
  const { themeKey, setThemeKey } = useContext(ThemeContext);
  const systemTheme = systemThemeKey();
  const currentThemeKey = themeKey === 'auto' ? systemTheme : themeKey;
  const theme = themes[currentThemeKey];
  return {
    current: {
      key: currentThemeKey,
      theme
    },
    themeKey,
    setThemeKey
  };
};
