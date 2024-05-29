import { ReactNode, createContext, useState } from "react";
import { ThemeName, getTheme } from "../style/theme";
import { ThemeProvider } from "styled-components";
import { GlobalStyle } from "../style/global";

interface State {
  themeName: ThemeName;
  toggleTheme: () => void;
}

export const state = {
  themeName: 'light' as ThemeName,
  toggleTheme: () => {}
};

export const ThemeContext = createContext<State>(state);

export const BookStoreThemeProvider = ({ children }: { children: ReactNode }) => {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  const toggleTheme = () => {
    setThemeName(themeName === 'light' ? 'dark' : 'light');
  }

  return (
    <ThemeContext.Provider value={{ themeName, toggleTheme }}>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        { children }
      </ThemeProvider>
    </ThemeContext.Provider>
  )
};