import React from 'react';

import { render } from '@testing-library/react';

jest.mock('../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn(() => ({
    status: 'idle',
    accessToken: 'abc123'
  }))
}));

import DashboardPage from './index';

describe('Login page', () => {
  it('Should be render correctly', () => {
    const nodeEl = render(<DashboardPage />);

    expect(nodeEl.baseElement).toHaveTextContent('Você está logado!');

    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});
