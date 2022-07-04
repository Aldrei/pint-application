import { render } from '@testing-library/react';
import Raact from 'react';

import LoginPage from './index';

describe('Page Login', () => {
  it('Should be render correctly', () => {
    const nodeEl = render(<LoginPage />);

    const nodeBody = nodeEl.getByTestId('loginContainer');
    const nodeUsername = nodeEl.getByTestId('username');
    const nodePassword = nodeEl.getByTestId('password');
    const nodeButtonLogin = nodeEl.getByTestId('button-login');

    expect(nodeBody).toContainElement(nodeUsername);
    expect(nodeBody).toContainElement(nodePassword);
    expect(nodeBody).toContainElement(nodeButtonLogin);

    expect(nodeEl.baseElement).toMatchSnapshot();
  })
})