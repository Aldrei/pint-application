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
import propertiesDeleteReducer from '../reducers/properties/delete';
import propertiesSearchReducer, { IPropertySearchServiceRequest } from '../reducers/properties/search';
import propertiesPhotosReducer, { IPropertiesPhotosServiceRequest } from '../reducers/properties/photos/list';
import propertiesPhotosUpdatePositionsReducer, { IPropertiesPhotosUpdatePositionsServiceRequest } from '../reducers/properties/photos/updatePositions';
import propertiesPhotosUploadReducer, { IPropertiesPhotosUploadServiceRequest } from '../reducers/properties/photos/store';
import propertiesPhotosUpdateReducer, { IPropertiesPhotosUpdateServiceRequest } from '../reducers/properties/photos/update';
import propertiesPhotosDeleteReducer, { IPropertiesPhotosDeleteServiceRequest } from '../reducers/properties/photos/delete';
import propertiesVideosReducer, { IPropertiesVideosServiceRequest } from '../reducers/properties/videos/list';
import propertiesVideosDeleteReducer, { IPropertiesVideosDeleteServiceRequest } from '../reducers/properties/videos/delete';
import ownersSearchReducer, { IOwnerSearchServiceRequest } from '../reducers/owners/search';
import ownersStoreReducer, { IOwnerStoreServiceRequest } from '../reducers/owners/store';
import ownersUpdateReducer, { IOwnerUpdateServiceRequest } from '../reducers/owners/update';
import ownersShowReducer, { IOwnersShowServiceRequest } from '../reducers/owners/show';
import ownersDeleteReducer from '../reducers/owners/delete';
import ownersListReducer from '../reducers/owners/list';
import employeesSearchReducer, { IEmployeeSearchServiceRequest } from '../reducers/employees/search';
import employeesAgentsSearchReducer from '../reducers/employees/agents/search';
import employeesBrokersSearchReducer from '../reducers/employees/brokers/search';
import employeesListReducer from '../reducers/employees/crud';
import citiesSearchReducer, { ICitiesSearchServiceRequest } from '../reducers/cities/search';
import citiesListReducer from '../reducers/cities/crud';
import neighborhoodsSearchReducer, { INeighborhoodsSearchServiceRequest } from '../reducers/neighborhoods/search';
import neighborhoodsListReducer from '../reducers/neighborhoods/crud';
import bannersCrudReducer from '../reducers/banners/crud';

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