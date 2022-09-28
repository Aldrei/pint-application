import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { PaletteMode } from '@mui/material';

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';

import LoginPage from '../../pages/Login';
import DashboardPage from '../../pages/Dashboard';
import PropertiesList from '../../pages/Properties/List';
import PropertiesDetail from '../../pages/Properties/Detail';

import CheckAuth from '../../components/CheckAuth';
import CheckUnauthenticated from '../../components/CheckUnauthenticated';

import { ROUTES } from '../../constants/routes';

import ColorModeContext from '../../contexts/ColorModeContext';

import { AppContainer } from './styles';

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


function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('dark');

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  console.log('DEBUG mode:', mode);

  const theme = React.useMemo(
    () =>
      createTheme(getDesignTokens(mode)),
    [mode],
  );
  
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        {/* <Button>
          {theme.palette.mode} mode
          <IconButton sx={{ ml: 1 }} onClick={colorMode.toggleColorMode} color="inherit">
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Button> */}

        <BrowserRouter basename='/'>
          <AppContainer className='appComp' data-testid='appContainer'>
            {/* A <Switch> looks through its children <Route>s and
              renders the first one that matches the current URL. */}
            <Routes>
              <Route path={ROUTES.index.path} element={<Navigate to='/login' />} />
              <Route path={ROUTES.login.path} element={
                <CheckUnauthenticated>
                  <LoginPage />
                </CheckUnauthenticated>
              } />
              <Route path={ROUTES.dashboard.path} element={
                <CheckAuth>
                  <DashboardPage />
                </CheckAuth>
              } />
              <Route path={ROUTES.propertiesList.path} element={
                <CheckAuth>
                  <PropertiesList />
                </CheckAuth>
              } />
              <Route path={ROUTES.propertiesDetail.path} element={
                <CheckAuth>
                  <PropertiesDetail />
                </CheckAuth>
              } />
            </Routes>
          </AppContainer>
        </BrowserRouter>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
