import React from 'react';

import { render } from '@testing-library/react';

import Box from './index';

describe('Box component', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<Box><h1 className="child-test">Test</h1></Box>);

    const nodeElChild = nodeEl.baseElement.getElementsByClassName('child-test');
    expect(nodeElChild.length).toBe(1);
    
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
