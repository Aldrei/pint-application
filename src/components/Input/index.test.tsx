import { render } from '@testing-library/react';
import React from 'react';

import Input from './index';

describe('Input component', () => {
  it('Should render correctly type text with readOnly', () => {
    const nodeEl = render(<Input data-testid="test-id" name="test" type="text" value="Test do Test" readOnly />);

    const nodeElChild = nodeEl.getByTestId('test-id');

    expect(nodeElChild).toHaveAttribute('name', 'test');
    expect(nodeElChild).toHaveAttribute('type', 'text');
    expect(nodeElChild).toHaveAttribute('value', 'Test do Test');
    expect(nodeElChild).not.toBeDisabled();
    
    expect(nodeEl.baseElement).toMatchSnapshot();
  })
})