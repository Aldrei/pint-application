import React from 'react';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { orange } from '@mui/material/colors';
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

import { AppContainer } from './styles';

declare module '@mui/material/styles' {
  interface Theme {
    status: {
      danger: string;
    };
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
    status?: {
      danger?: string;
    };
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

// background dark = 'rgb(10, 25, 41)' 
// backgroundColor: 'rgb(19, 47, 76)',
// border: '1px solid rgb(23, 58, 94)',

// border rgb(23,58,94)'

// eslint-disable-next-line @typescript-eslint/no-empty-function
export const ColorModeContext = React.createContext({ toggleColorMode: () => {} });

const getDesignTokens = (mode: PaletteMode) => ({
  status: {
    danger: orange[500],
  },
  palette: {
    mode,
    ...(mode === 'light'
      ? {
        text: {
          primary: '#fff',
          secondary: 'rgb(178, 186, 194)'
        },
        background: {
          default: '#de1818',
          paper: '#1f10c6'
        },
        divider: '#c4e715'
      }
      : {}
    ),
  },
});


function App() {
  const [mode, setMode] = React.useState<'light' | 'dark'>('light');

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
