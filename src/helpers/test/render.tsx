// import { ThemeProvider } from '@mui/material';
import { render as originalRender, RenderOptions, RenderResult, queries, Queries } from '@testing-library/react';
import React from 'react';


// export const ThemeWrapper: React.FC = ({ children }): React.ReactElement => <ThemeProvider theme={THEME}>{children}</ThemeProvider>;

const render = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  Component: React.ReactElement,
  options: RenderOptions<Q, Container> = {},
): RenderResult<Q, Container> => originalRender(
  Component,
  options
);

// export function renderProvider<C>(Provider: React.FC, context: React.Context<C>): RenderHookResult<Record<string, unknown>, C> {
//   const wrapper: React.FC = ({ children }) => <Provider>{children}</Provider>;
//   return renderHook(() => React.useContext(context), { wrapper });
// }

export default render;