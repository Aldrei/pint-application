import { render } from '@testing-library/react';
import { AxiosResponse } from 'axios';
import React from 'react';

import { AXIOS_RESPONSE_SUCCESS } from '../../mocks';

import { useConfigAxios, interceptorResponseSuccess } from './index';
// import { AxiosInstance, AxiosPromise } from 'axios';

// jest.mock('./instance', () => ({
//   interceptors: {
//     request: jest.fn(() => ({
//       use: jest.fn(() => ({}))
//     }))
//   },
// }));

jest.mock('../../stores/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

// const ComponentTest = (): React.ReactElement => {
//   useConfigAxios();
//   return <span>Test</span>;
// };

describe('useConfigAxios', () => {
  // const apiMocked = api as jest.MockedFunction<typeof api>;
  // const axiosMocked = axios.mock

  beforeAll(() => {
    // axios.create.mockReturnThis();
  });

  it('Should intercept success response', () => {
    // const axiosCreateMocked: AxiosPromise = jest.fn(() => ({
    //   interceptors: jest.fn()
    // })) as unknown as AxiosPromise;
    // apiMocked.mockReturnValue(axiosCreateMocked);

    // const nodeEl = render(<ComponentTest />);
    // console.log('nodeEl:', nodeEl);

    const axiosResponse = AXIOS_RESPONSE_SUCCESS as unknown as AxiosResponse;
    // const dataResponse = interceptorResponseSuccess(axiosResponse);
    expect(interceptorResponseSuccess(axiosResponse)).toStrictEqual(JSON.parse(JSON.stringify(axiosResponse)));
  });
});
