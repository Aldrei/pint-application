import { render } from '@testing-library/react';
import React from 'react';

import Button from './index';

describe('Button component', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<Button>Button test</Button>);

    expect(nodeEl.getByTestId('buttonComp')).toHaveTextContent(`Button test`);
    expect(nodeEl.getByTestId('buttonComp')).not.toBeDisabled();
    
    expect(nodeEl.baseElement).toMatchSnapshot();
  })

  it('Should be disabled', () => {
    const nodeEl = render(<Button disabled>Test</Button>);

    expect(nodeEl.getByTestId('buttonComp')).toBeDisabled();

    expect(nodeEl.baseElement).toMatchSnapshot();
  })
})