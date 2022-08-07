import { render } from '@testing-library/react';
import React from 'react';

import Card from './index';

describe('Card component', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<Card><h1 className="child-test">Test</h1></Card>);

    const nodeElChild = nodeEl.baseElement.getElementsByClassName('child-test');
    expect(nodeElChild.length).toBe(1);
    
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
