import React, { useState } from 'react';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import { ThemeProvider } from 'styled-components';
import { GlobalStyle } from './style/global';
import { ThemeName, getTheme, light } from './style/theme';
import ThemeSwitcher from './components/header/ThemeSwitcher';

function App() {
  const [themeName, setThemeName] = useState<ThemeName>('light');

  return (
    <div>
      <ThemeProvider theme={getTheme(themeName)}>
        <GlobalStyle themeName={themeName} />
        <ThemeSwitcher themeName={themeName} setThemeName={setThemeName} />
        <Layout>
          <Home />
        </Layout>
      </ThemeProvider>
    </div>
  );
}

export default App;
