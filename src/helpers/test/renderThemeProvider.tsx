import { ThemeProvider } from '@mui/material/styles';
import { render as originalRender, RenderOptions, RenderResult, queries, Queries } from '@testing-library/react';
import * as React from 'react';

import ColorModeContext from '../../contexts/ColorModeContext';
import useTheme from '../../hooks/useTheme';

interface Props {
  children?: React.ReactNode;
}

export const ThemeWrapper: React.FC = (props: Props): React.ReactElement => {
  const { theme, colorMode } = useTheme();
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>{props.children}</ThemeProvider>
    </ColorModeContext.Provider>
  );
};

const renderThemeProvider = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  Component: React.ReactElement,
  options: RenderOptions<Q, Container> = { wrapper: ThemeWrapper },
): RenderResult<Q, Container> => originalRender(Component, options);

// export function renderProvider<C>(Provider: React.FC, context: React.Context<C>): RenderHookResult<Record<string, unknown>, C> {
//   const wrapper: React.FC = ({ children }) => <Provider>{children}</Provider>;
//   return renderHook(() => React.useContext(context), { wrapper });
// }

export default renderThemeProvider;