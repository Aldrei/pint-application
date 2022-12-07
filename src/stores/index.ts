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
import propertiesShowReducer, { IPropertiesShowServiceRequest } from '../reducers/properties/show';
import propertiesStoreReducer, { IPropertiesStoreServiceRequest } from '../reducers/properties/store';
import propertiesUpdateReducer, { IPropertiesUpdateServiceRequest } from '../reducers/properties/update';
import propertiesPhotosReducer, { IPropertiesPhotosServiceRequest } from '../reducers/properties/photos/list';
import propertiesPhotosUpdatePositionsReducer, { IPropertiesPhotosUpdatePositionsServiceRequest } from '../reducers/properties/photos/updatePositions';
import propertiesPhotosUploadReducer, { IPropertiesPhotosUploadServiceRequest } from '../reducers/properties/photos/store';
import propertiesPhotosUpdateReducer, { IPropertiesPhotosUpdateServiceRequest } from '../reducers/properties/photos/update';
import propertiesPhotosDeleteReducer, { IPropertiesPhotosDeleteServiceRequest } from '../reducers/properties/photos/delete';
import propertiesVideosReducer, { IPropertiesVideosServiceRequest } from '../reducers/properties/videos/list';
import propertiesVideosDeleteReducer, { IPropertiesVideosDeleteServiceRequest } from '../reducers/properties/videos/delete';
import ownersSearchReducer, { IOwnerSearchServiceRequest } from '../reducers/owners/search';
import employeesSearchReducer, { IEmployeeSearchServiceRequest } from '../reducers/employees/search';
import employeesAgentsSearchReducer from '../reducers/employees/agents/search';
import employeesBrokersSearchReducer from '../reducers/employees/brokers/search';
import citiesSearchReducer, { ICitiesSearchServiceRequest } from '../reducers/cities/search';
import neighborhoodsSearchReducer, { INeighborhoodsSearchServiceRequest } from '../reducers/neighborhoods/search';

export interface IReducersType {
  authReducer: IAutyState,
  counterReducer: ICounterState,
  propertiesListReducer: IServiceRequest,
  propertiesShowReducer: IPropertiesShowServiceRequest,
  propertiesPhotosReducer: IPropertiesPhotosServiceRequest,
  ownersSearchReducer: IOwnerSearchServiceRequest,
  employeesSearchReducer: IEmployeeSearchServiceRequest,
  employeesAgentsSearchReducer: IEmployeeSearchServiceRequest,
  employeesBrokersSearchReducer: IEmployeeSearchServiceRequest,
  citiesSearchReducer: ICitiesSearchServiceRequest,
  neighborhoodsSearchReducer: INeighborhoodsSearchServiceRequest,
  propertiesStoreReducer: IPropertiesStoreServiceRequest,
  propertiesUpdateReducer: IPropertiesUpdateServiceRequest,
  propertiesPhotosUpdatePositionsReducer: IPropertiesPhotosUpdatePositionsServiceRequest,
  propertiesPhotosUploadReducer: IPropertiesPhotosUploadServiceRequest,
  propertiesVideosReducer: IPropertiesVideosServiceRequest,
  propertiesPhotosUpdateReducer: IPropertiesPhotosUpdateServiceRequest,
  propertiesPhotosDeleteReducer: IPropertiesPhotosDeleteServiceRequest,
  propertiesVideosDeleteReducer: IPropertiesVideosDeleteServiceRequest,
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
  propertiesListReducer,
  propertiesShowReducer,
  propertiesStoreReducer,
  propertiesUpdateReducer,
  propertiesPhotosReducer,
  propertiesPhotosUpdatePositionsReducer,
  propertiesPhotosUploadReducer,
  propertiesPhotosDeleteReducer,
  propertiesVideosReducer,
  ownersSearchReducer,
  employeesSearchReducer,
  employeesAgentsSearchReducer,
  employeesBrokersSearchReducer,
  citiesSearchReducer,
  neighborhoodsSearchReducer,
  propertiesPhotosUpdateReducer,
  propertiesVideosDeleteReducer,
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