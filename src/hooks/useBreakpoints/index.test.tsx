import * as React from 'react';

import mediaQuery from 'css-mediaquery';

import renderThemeProvider from '../../helpers/test/render';
import { useBreakpoints } from '../useBreakpoints';
import { breakpoints } from '../useTheme';

const ComponentTest = (): React.ReactElement => {
  const [goSm, goMd, goLg, goXl] = useBreakpoints();
  const resovelText = () => {
    if (goXl) return `Up ${breakpoints.values.xl}`;
    if (goLg) return `Up ${breakpoints.values.lg}`;
    if (goMd) return `Up ${breakpoints.values.md}`;
    if (goSm) return `Up ${breakpoints.values.sm}`;
  };
  return <span>{resovelText()}</span>;
};

function createMatchMedia(width: number) {
  return (query: string) => ({
    matches: mediaQuery.match(query, {
      width,
    }),
    addListener: () => jest.fn(),
    removeListener: () => jest.fn(),
  }) as unknown as MediaQueryList;
}

describe('useBreakpoints', () => {
  it('Should confirm SM size', () => {
    window.matchMedia = createMatchMedia(600);

    const nodeEl = renderThemeProvider(<ComponentTest />);
    expect(nodeEl.baseElement).toHaveTextContent(`Up ${breakpoints.values.sm}`);
  });

  it('Should confirm MD size', () => {
    window.matchMedia = createMatchMedia(900);

    const nodeEl = renderThemeProvider(<ComponentTest />);
    expect(nodeEl.baseElement).toHaveTextContent(`Up ${breakpoints.values.md}`);
  });

  it('Should confirm LG size', () => {
    window.matchMedia = createMatchMedia(1200);

    const nodeEl = renderThemeProvider(<ComponentTest />);
    expect(nodeEl.baseElement).toHaveTextContent(`Up ${breakpoints.values.lg}`);
  });

  it('Should confirm XL size', () => {
    window.matchMedia = createMatchMedia(1536);

    const nodeEl = renderThemeProvider(<ComponentTest />);
    expect(nodeEl.baseElement).toHaveTextContent(`Up ${breakpoints.values.xl}`);
  });
});
