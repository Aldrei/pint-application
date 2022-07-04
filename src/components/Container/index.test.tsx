import { render } from '@testing-library/react';
import React from 'react';

import Container from './index';

describe('Container component', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<Container><h1 className="child-test">Test</h1></Container>)

    const nodeElChild = nodeEl.baseElement.getElementsByClassName('child-test');
    expect(nodeElChild.length).toBe(1);
    
    expect(nodeEl.baseElement).toMatchSnapshot();
  })
})