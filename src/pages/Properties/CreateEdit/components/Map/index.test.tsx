import React from 'react';

import renderReduxProvider from '../../../../../helpers/test/renderReduxProvider';
import { useAppSelectorBlaBlaBal } from '../../../../../hooks/useReducerSelector';

import { IPropertiesUpdateServiceRequest } from '../../../../../reducers/properties/update';

import MapEl from './index';

/** Data mocks. */
const mapDefault = { data: {}, status: 'idle' } as IPropertiesUpdateServiceRequest;

jest.mock('../../../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

describe('Property Video', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeAll(() => {
    useAppSelectorBlaBlaBalMocked
      .mockReturnValue(mapDefault);
  });

  it('Should render: mapa náo configurado', () => {
    mapDefault.status = 'success';
    mapDefault.data = undefined;
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(mapDefault)
      .mockReturnValue(mapDefault);

    const nodeEl = renderReduxProvider(<MapEl />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});