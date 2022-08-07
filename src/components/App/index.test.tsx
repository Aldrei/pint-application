import React from 'react';

import { render } from '@testing-library/react';

import App from './index';

describe('App component', () => {
  it('Should render correctly', () => {
    const bodyEl = render(<App />);

    const appNode = bodyEl.getByTestId('appContainer');
    const loginPage = bodyEl.getByTestId('loginContainer');
    expect(appNode).toContainElement(loginPage);
    
    expect(bodyEl.baseElement).toMatchSnapshot();
  });
});
