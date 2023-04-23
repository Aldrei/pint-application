import React from 'react';

import renderReduxProvider from '../../../../helpers/test/renderReduxProvider';
import { useAppSelectorBlaBlaBal } from '../../../../hooks/useReducerSelector';

import { IPropertiesPhotosUpdateServiceRequest } from '../../../../reducers/properties/photos/update';

import PhotosEl from './index';

/** Data mocks. */
const photosDefault = { data: {}, status: 'idle' } as IPropertiesPhotosUpdateServiceRequest;

jest.mock('../../../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

describe('Property Photos', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeAll(() => {
    useAppSelectorBlaBlaBalMocked
      .mockReturnValue(photosDefault);
  });

  it('Should render empty list photos', () => {
    photosDefault.status = 'success';
    photosDefault.data = undefined;
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(photosDefault)
      .mockReturnValue(photosDefault);

    const nodeEl = renderReduxProvider(<PhotosEl />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});