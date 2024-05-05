import {
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistReducer,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web

import { encryptTransform } from 'redux-persist-transform-encrypt';

import { Action, ThunkAction, combineReducers, configureStore } from '@reduxjs/toolkit';

import authReducer, { IAutyState } from '../reducers/auty';
import bannersCrudReducer from '../reducers/banners/crud';
import citiesListReducer from '../reducers/cities/crud';
import citiesSearchReducer, { ICitiesSearchServiceRequest } from '../reducers/cities/search';
import counterReducer, { ICounterState } from '../reducers/counter';
import employeesAgentsSearchReducer from '../reducers/employees/agents/search';
import employeesBrokersSearchReducer from '../reducers/employees/brokers/search';
import employeesListReducer from '../reducers/employees/crud';
import employeesSearchReducer, { IEmployeeSearchServiceRequest } from '../reducers/employees/search';
import messagesListReducer from '../reducers/messages/crud';
import neighborhoodsListReducer from '../reducers/neighborhoods/crud';
import neighborhoodsSearchReducer, { INeighborhoodsSearchServiceRequest } from '../reducers/neighborhoods/search';
import ownersDeleteReducer from '../reducers/owners/delete';
import ownersListReducer from '../reducers/owners/list';
import ownersSearchReducer, { IOwnerSearchServiceRequest } from '../reducers/owners/search';
import ownersShowReducer, { IOwnersShowServiceRequest } from '../reducers/owners/show';
import ownersStoreReducer, { IOwnerStoreServiceRequest } from '../reducers/owners/store';
import ownersUpdateReducer, { IOwnerUpdateServiceRequest } from '../reducers/owners/update';
import propertiesDeleteReducer from '../reducers/properties/delete';
import propertiesListReducer from '../reducers/properties/list';
import propertiesPhotosDeleteReducer, { IPropertiesPhotosDeleteServiceRequest } from '../reducers/properties/photos/delete';
import propertiesPhotosReducer, { IPropertiesPhotosServiceRequest } from '../reducers/properties/photos/list';
import propertiesPhotosUploadReducer, { IPropertiesPhotosUploadServiceRequest } from '../reducers/properties/photos/store';
import propertiesPhotosUpdateReducer, { IPropertiesPhotosUpdateServiceRequest } from '../reducers/properties/photos/update';
import propertiesPhotosUpdatePositionsReducer, { IPropertiesPhotosUpdatePositionsServiceRequest } from '../reducers/properties/photos/updatePositions';
import propertiesSearchReducer, { IPropertySearchServiceRequest } from '../reducers/properties/search';
import propertiesShowReducer, { IPropertiesShowServiceRequest } from '../reducers/properties/show';
import propertiesStoreReducer, { IPropertiesStoreServiceRequest } from '../reducers/properties/store';
import propertiesUpdateReducer, { IPropertiesUpdateServiceRequest } from '../reducers/properties/update';
import propertiesVideosDeleteReducer, { IPropertiesVideosDeleteServiceRequest } from '../reducers/properties/videos/delete';
import propertiesVideosReducer, { IPropertiesVideosServiceRequest } from '../reducers/properties/videos/list';
import propertiesAgenciesListReducer from '../reducers/propertiesAgencies/crud';
import { IServiceRequest } from '../types';

export interface IReducersType {
  authReducer: IAutyState,
  counterReducer: ICounterState,
  propertiesListReducer: IServiceRequest,
  propertiesShowReducer: IPropertiesShowServiceRequest,
  propertiesDeleteReducer: IServiceRequest,
  propertiesPhotosReducer: IPropertiesPhotosServiceRequest,
  ownersSearchReducer: IOwnerSearchServiceRequest,
  ownersStoreReducer: IOwnerStoreServiceRequest,
  ownersUpdateReducer: IOwnerUpdateServiceRequest,
  ownersShowReducer: IOwnersShowServiceRequest,
  ownersDeleteReducer: IServiceRequest,
  ownersListReducer: IServiceRequest,
  employeesSearchReducer: IEmployeeSearchServiceRequest,
  employeesAgentsSearchReducer: IEmployeeSearchServiceRequest,
  employeesBrokersSearchReducer: IEmployeeSearchServiceRequest,
  employeesListReducer: IServiceRequest,
  citiesSearchReducer: ICitiesSearchServiceRequest,
  citiesListReducer: IServiceRequest,
  neighborhoodsSearchReducer: INeighborhoodsSearchServiceRequest,
  neighborhoodsListReducer: IServiceRequest,
  propertiesStoreReducer: IPropertiesStoreServiceRequest,
  propertiesUpdateReducer: IPropertiesUpdateServiceRequest,
  propertiesSearchReducer: IPropertySearchServiceRequest,
  propertiesPhotosUpdatePositionsReducer: IPropertiesPhotosUpdatePositionsServiceRequest,
  propertiesPhotosUploadReducer: IPropertiesPhotosUploadServiceRequest,
  propertiesVideosReducer: IPropertiesVideosServiceRequest,
  propertiesPhotosUpdateReducer: IPropertiesPhotosUpdateServiceRequest,
  propertiesPhotosDeleteReducer: IPropertiesPhotosDeleteServiceRequest,
  propertiesVideosDeleteReducer: IPropertiesVideosDeleteServiceRequest,
  bannersCrudReducer: IServiceRequest
  messagesListReducer: IServiceRequest
  propertiesAgenciesListReducer: IServiceRequest
}

const persistConfig = {
  key: 'imob',
  version: 1,
  storage,
  whitelist: ['authReducer', 'propertiesSearchReducer'],
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
    }
    ),
  ],
};

const reducers = combineReducers({
  authReducer,
  counterReducer,
  propertiesListReducer,
  propertiesShowReducer,
  propertiesStoreReducer,
  propertiesUpdateReducer,
  propertiesDeleteReducer,
  propertiesSearchReducer,
  propertiesPhotosReducer,
  propertiesPhotosUpdatePositionsReducer,
  propertiesPhotosUploadReducer,
  propertiesPhotosDeleteReducer,
  propertiesVideosReducer,
  ownersSearchReducer,
  ownersStoreReducer,
  ownersUpdateReducer,
  ownersShowReducer,
  ownersDeleteReducer,
  ownersListReducer,
  employeesSearchReducer,
  employeesAgentsSearchReducer,
  employeesBrokersSearchReducer,
  employeesListReducer,
  citiesSearchReducer,
  citiesListReducer,
  neighborhoodsSearchReducer,
  neighborhoodsListReducer,
  propertiesPhotosUpdateReducer,
  propertiesVideosDeleteReducer,
  bannersCrudReducer,
  messagesListReducer,
  propertiesAgenciesListReducer
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