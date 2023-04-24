import React from 'react';

import renderReduxProvider from '../../../../../../helpers/test/renderReduxProvider';
import { useAppSelectorBlaBlaBal } from '../../../../../../hooks/useReducerSelector';

import { IPropertiesVideosServiceRequest } from '../../../../../../reducers/properties/videos/list';
import { IPropertiesVideosDeleteServiceRequest } from '../../../../../../reducers/properties/videos/delete';

import VideoEl from './index';

/** Data mocks. */
const videosDefault = { data: {}, status: 'idle' } as IPropertiesVideosServiceRequest;
const videoDelete = { data: {}, status: 'idle' } as IPropertiesVideosDeleteServiceRequest;

jest.mock('../../../../../hooks/useReducerSelector', () => ({
  useAppSelectorBlaBlaBal: jest.fn()
}));

describe('Property Video', () => {
  const useAppSelectorBlaBlaBalMocked = useAppSelectorBlaBlaBal as jest.MockedFunction<typeof useAppSelectorBlaBlaBal>;

  beforeAll(() => {
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(videoDelete)
      .mockReturnValue(videosDefault);
  });

  it('Should render empty video', () => {
    videoDelete.status = 'success';
    videoDelete.data = undefined;
    useAppSelectorBlaBlaBalMocked
      .mockReturnValueOnce(videoDelete)
      .mockReturnValue(videosDefault);

    const nodeEl = renderReduxProvider(<VideoEl />);
    expect(nodeEl.baseElement).toMatchSnapshot();
  });
});