import { 
  persistStore, 
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import authReducer, { IAutyState } from '../reducer/auty';
import counterReducer, { ICounterState } from '../reducer/counter';

export interface IReducersType {
  authReducer: IAutyState,
  counterReducer: ICounterState,
}

const persistConfig = {
  key: 'imob',
  version: 1,
  storage,
  whitelist: ['authReducer']
};

const reducers = combineReducers({
  authReducer,
  counterReducer,
});
export type RootReducer = ReturnType<typeof reducers>;

const persistedReducer = persistReducer<RootReducer>(persistConfig, reducers);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
});

export const persistorStore = persistStore(store);

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;