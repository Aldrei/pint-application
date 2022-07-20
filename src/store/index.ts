import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';

import authReducer, { IAutyState } from '../reducer/auty';
import counterReducer, { ICounterState } from '../reducer/counter';

export interface IReducersType {
  auth: IAutyState,
  counter: ICounterState,
}

export const store = configureStore({
  reducer: {
    auth: authReducer,
    counter: counterReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;