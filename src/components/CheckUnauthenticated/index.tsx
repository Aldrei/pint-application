import React from 'react';

import { Navigate, useLocation } from 'react-router-dom';

import { IAutyState } from '../../reducers/auty';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

import { ROUTES } from '../../constants/routes';

import { isEquivalentRoute } from '../../helpers';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;

  if (accessToken.access_token && isEquivalentRoute(location.pathname, ROUTES.login.path)) 
    return <Navigate to="/dashboard" />;

  return children;
};

export default CheckAuth;