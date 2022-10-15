import { render as originalRender, RenderOptions, RenderResult, queries, Queries } from '@testing-library/react';
import * as React from 'react';

import { Provider } from 'react-redux';
import { store } from '../../stores';

interface Props {
  children?: React.ReactNode;
}

export const ReduxProvider: React.FC = (props: Props): React.ReactElement => {
  return <Provider store={store}>{props.children}</Provider>;
};

const renderReduxProvider = <Q extends Queries = typeof queries, Container extends Element | DocumentFragment = HTMLElement>(
  Component: React.ReactElement,
  options: RenderOptions<Q, Container> = { wrapper: ReduxProvider },
): RenderResult<Q, Container> => originalRender(Component, options);

export default renderReduxProvider;
