import { useAppSelectorBlaBlaBal } from './index';

import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
  useDispatch: jest.fn(),
}));

import { IAutyState } from '../../reducers/auty';
import { ICounterState } from '../../reducers/counter';
import { useAppSelector } from '../../stores/hooks';

jest.mock('../../store/hooks', () => ({
  useAppSelector: jest.fn(),
}));

describe('Helper dataFormControl', () => {
  const reducerValidFlag = 'authReducer';

  const useSelectorMocked = useSelector as jest.MockedFunction<typeof useSelector>;
  const useAppSelectorMocked = useAppSelector as jest.MockedFunction<typeof useAppSelector>;

  it('Should return a valid flag reducer', () => {
    const authReducerValueRoot: IAutyState = {
      whoIsAuth: {}, 
      accessToken: {},
      status: 'idle'
    };
    const counterReducerValueRoot: ICounterState = {
      value: 123, 
      status: 'idle',
    };
    const rootReducerValue = { authReducer: authReducerValueRoot, counterReducer: counterReducerValueRoot };
    useSelectorMocked.mockReturnValue(rootReducerValue);

    const authReducerValue: IAutyState = {
      whoIsAuth: {}, 
      accessToken: {},
      status: 'idle'
    };
    useAppSelectorMocked.mockReturnValue(authReducerValue);

    const objValues = useAppSelectorBlaBlaBal(reducerValidFlag);

    expect(objValues).toEqual(authReducerValueRoot);
  });
});
