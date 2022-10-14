import { AxiosResponse, AxiosPromise, AxiosRequestConfig } from 'axios';
import React from 'react';

import { clearAccessTokenReducer } from '../../reducers/auty';

import { AXIOS_RESPONSE_SUCCESS, AXIOS_RESPONSE_ERROR, AXIOS_CONFIG_REQUEST_SUCCESS_DEFAULT, AXIOS_CONFIG_REQUEST_SUCCESS_CUSTOM, PERSIST_IMOB_AUTH, PERSIST_IMOB_AUTH_WITH_WRONG_DATA } from '../../mocks/constants';

import { useConfigAxios, interceptorRequestSuccess, interceptorResponseSuccess, interceptorResponseError } from './index';
import { render } from '@testing-library/react';
import api from './instance';

jest.mock('./instance');

jest.mock('../../stores/hooks', () => ({
  useAppDispatch: jest.fn(),
}));

jest.mock('../../reducers/auty', () => ({
  clearAccessTokenReducer: jest.fn(),
}));

const ComponentTest = (): React.ReactElement => {
  useConfigAxios();
  return <span>Test</span>;
};

describe('useConfigAxios', () => {
  const clearAccessTokenReducerMocked = clearAccessTokenReducer as jest.MockedFunction<typeof clearAccessTokenReducer>;
  const apiMocked = api as jest.MockedFunction<typeof api>;

  it('Should render correctly', () => {
    const axiosCreateMocked: AxiosPromise = jest.fn(() => ({
      interceptors: jest.fn()
    })) as unknown as AxiosPromise;
    apiMocked.mockReturnValue(axiosCreateMocked);

    const nodeEl = render(<ComponentTest />);
    expect(nodeEl.baseElement).toMatchSnapshot();
    expect(nodeEl.baseElement).toHaveTextContent('Test');
  });

  it('Should intercept success request and set access token', () => {
    window.localStorage.setItem('persist:imob', JSON.stringify(PERSIST_IMOB_AUTH));

    const dataRequestDefault = AXIOS_CONFIG_REQUEST_SUCCESS_DEFAULT as unknown as AxiosRequestConfig;
    const dataRequestCustom = AXIOS_CONFIG_REQUEST_SUCCESS_CUSTOM as unknown as AxiosRequestConfig;
    
    expect(interceptorRequestSuccess(dataRequestDefault)).toStrictEqual(dataRequestCustom);
  });

  it('Should intercept success request with empty access token', () => {
    window.localStorage.setItem('persist:imob', '');

    const dataRequestDefault = AXIOS_CONFIG_REQUEST_SUCCESS_DEFAULT as unknown as AxiosRequestConfig;
    
    expect(interceptorRequestSuccess(dataRequestDefault)).toStrictEqual(dataRequestDefault);
  });

  it('Should intercept success request with reject', () => {
    window.localStorage.setItem('persist:imob', JSON.stringify(PERSIST_IMOB_AUTH_WITH_WRONG_DATA));

    const dataRequestDefault = AXIOS_CONFIG_REQUEST_SUCCESS_DEFAULT as unknown as AxiosRequestConfig;

    try {
      expect(interceptorRequestSuccess(dataRequestDefault));
    } catch(e) {      
      expect(e).toEqual({
        error: 'error_to_get_access_token',
      });
    }
  });

  it('Should intercept success response', () => {
    const axiosResponse = AXIOS_RESPONSE_SUCCESS as unknown as AxiosResponse;
    expect(interceptorResponseSuccess(axiosResponse)).toStrictEqual(JSON.parse(JSON.stringify(axiosResponse)));
  });

  it('Should intercept error response', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const dataResponse = AXIOS_RESPONSE_ERROR as any;
    expect(interceptorResponseError(dataResponse, jest.fn())).toStrictEqual(JSON.parse(JSON.stringify(dataResponse.response)));
    expect(clearAccessTokenReducerMocked.mock.calls.length).toBe(1);
  });
});
