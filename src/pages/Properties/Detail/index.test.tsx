import React from 'react';

import { render } from '@testing-library/react';

import PropertyDetail from './index';

jest.mock('../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(() => ({}))
}));

jest.mock('../../../stores/hooks', () => ({
  useAppDispatch: jest.fn
}));

describe('Property detail page', () => {
  it('Should render correctly', () => {
    const nodeEl = render(<PropertyDetail />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
