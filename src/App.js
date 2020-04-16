import React from 'react';

import { ThemeProvider } from 'styled-components';

import theme from './styles/themes/light';

import Map from './pages/Map';

import GlobalStyles from './styles/global';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <Map />
      <GlobalStyles />
    </ThemeProvider>
  );
}
