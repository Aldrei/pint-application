import React from 'react';

import { createTheme as createThemeOrigin } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

declare module '@mui/material/styles' {
  interface Theme {
    pallete?: {
      mode: string;
      primary?: {
        main: string;
        dark: string;
      },
      background: {
        default: string;
        paper: string;
      },
      text: {
        primary: string;
        secondary: string;
      },
      divider: string;
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    pallete?: {
      mode: string;
      primary?: {
        main: string;
        dark: string;
      },
      background: {
        default: string;
        paper: string;
      },
      text: {
        primary: string;
        secondary: string;
      },
      divider: string;
    }
  }
}

const breakpoints = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1536,
    mobile: 0,
    tablet: 640,
    laptop: 1024,
    desktop: 1200,
  },
};

const getDesignTokens = (mode: PaletteMode) => ({
  ...breakpoints,
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        text: {
          primary: '#000000',
          secondary: 'rgb(172, 39, 189)'
        },
        background: {
          default: '#de1818',
          paper: '#1f10c6'
        },
        divider: '#c4e715'
      }
      : {
        text: {
          primary: 'rgb(255, 255, 255)',
          secondary: 'rgb(178, 186, 194)'
        },
        background: {
          default: 'rgb(0, 30, 60)',
          paper: 'rgb(10, 25, 41)'
        },
        divider: 'rgba(255, 255, 255, 0.12)'
      }
    ),
  },
});

export const createTheme = (mode: PaletteMode) => createThemeOrigin(getDesignTokens(mode));

const useTheme = () => {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  const theme = React.useMemo(() => createTheme(mode), [mode]);

  return { theme, colorMode };
};

export default useTheme;