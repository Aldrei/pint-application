import * as React from 'react';

import renderThemeProvider from '../../helpers/test/renderThemeProvider';
import ColorModeContext from '../../contexts/ColorModeContext';
import useTheme from '../useTheme';
import { fireEvent } from '@testing-library/react';

const ComponentTest = (): React.ReactElement => {
  const { theme } = useTheme();
  const colorMode = React.useContext(ColorModeContext);

  return (
    <React.Fragment>
      <button onClick={colorMode.toggleColorMode}>Change mode</button>
      <span>{`Theme mode: ${theme.pallete?.mode}`}</span>
    </React.Fragment>
  );
};

describe('useBreakpoints', () => {
  it('Should change to light mode', () => {
    const nodeEl = renderThemeProvider(<ComponentTest />);

    fireEvent.click(nodeEl.getByText('Change mode'));
    expect(nodeEl.baseElement).toMatchSnapshot();

    fireEvent.click(nodeEl.getByText('Change mode'));
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
