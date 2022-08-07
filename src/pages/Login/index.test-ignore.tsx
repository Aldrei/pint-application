import { render } from '@testing-library/react';

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

  /**
   * TODO: Test behavior here:
   *        1. Check button is disabled if empty input.
   *        2. If has data:
   *           2.1. Check if make request and redirect to dashboard page.
   *           2.2. Check if make request and render message error.
  */
})