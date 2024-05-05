
import { Navigate, useLocation } from 'react-router-dom';

import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState } from '../../reducers/auth';

import { ROUTES } from '../../constants/routes';

import { isEquivalentRoute } from '../../helpers';

const CheckUnauthenticated = ({ children }: { children: JSX.Element }) => {
  const location = useLocation();
  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAuthState;

  if (accessToken?.access_token && isEquivalentRoute(location.pathname, ROUTES.login.path)) 
    return <Navigate to="/dashboard" />;

  return children;
};

export default CheckUnauthenticated;