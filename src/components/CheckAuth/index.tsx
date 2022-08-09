import React from 'react';

import { Navigate } from 'react-router-dom';

import { IAutyState } from '../../reducer/auty';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;

  if (!accessToken.access_token)
    return <Navigate to="/login" />;

  return children;
};

export default CheckAuth;