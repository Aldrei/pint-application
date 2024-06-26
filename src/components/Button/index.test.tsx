import { render } from '@testing-library/react';
import React from 'react';

import Button from './index';

describe('Button component', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<Button data-testid="buttonComp" text='Button test' />);

    expect(nodeEl.getByTestId('buttonComp')).toHaveTextContent('Button test');
    expect(nodeEl.getByTestId('buttonComp')).not.toBeDisabled();
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should be disabled', () => {
    const nodeEl = render(<Button data-testid="buttonComp" text='Test' disabled />);

    expect(nodeEl.getByTestId('buttonComp')).toBeDisabled();
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should show linear progress', () => {
    const nodeEl = render(<Button text='Test' loading />);

    expect(nodeEl.baseElement.getElementsByClassName('linear-progress')).toHaveLength(1);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });

  it('Should render blue color', () => {
    const nodeEl = render(<Button color='blue' text='Test' />);

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
