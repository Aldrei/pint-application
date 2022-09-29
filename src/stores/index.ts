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

import { encryptTransform } from 'redux-persist-transform-encrypt';

import { configureStore, ThunkAction, Action, combineReducers } from '@reduxjs/toolkit';

import { IServiceRequest } from '../types';
import authReducer, { IAutyState } from '../reducers/auty';
import counterReducer, { ICounterState } from '../reducers/counter';
import propertiesListReducer from '../reducers/properties/list';

export interface IReducersType {
  authReducer: IAutyState,
  counterReducer: ICounterState,
  propertiesListReducer: IServiceRequest
}

const persistConfig = {
  key: 'imob',
  version: 1,
  storage,
  whitelist: ['authReducer'],
  transforms: [
    encryptTransform({
      secretKey: 'my-super-secret-key',
      onError: function (error) {
        // Handle the error.
        console.log(error);
      },
    },
    {
      blacklist: ['authReducer']
    }),
  ],
};

const reducers = combineReducers({
  authReducer,
  counterReducer,
  propertiesListReducer
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