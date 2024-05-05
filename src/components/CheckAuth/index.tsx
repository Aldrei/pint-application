import React, { useEffect, useState } from 'react';

import { Navigate } from 'react-router-dom';

import { useAppDispatch } from '../../hooks/useReducerDispatch';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';
import { IAuthState, whoServiceThunk } from '../../reducers/auth';

import { useConfigAxios } from '../../hooks/useConfigAxios';

import Header from '../Header';
import Menu from '../Menu';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const dispatch = useAppDispatch();

  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAuthState;
  const [menuActive, setMenuActive] = useState(false);

  useConfigAxios();

  useEffect(() => {
    /**
     * Soon after user loggin and is redirect to dashboard page, getToke() don't can get the new token from localStorage.
     * So, pass the new token by parameter.
    */
    if (accessToken?.access_token) dispatch(whoServiceThunk(accessToken?.access_token));
  }, [accessToken]);

  const toggleDrawer =
    (
      // event: React.KeyboardEvent | 
      event: React.MouseEvent, open: boolean) => {
      
      // if (
      //   event.type === 'keydown' &&
      //   ((event as React.KeyboardEvent).key === 'Tab' ||
      //     (event as React.KeyboardEvent).key === 'Shift')
      // ) {
      //   return;
      // }

      setMenuActive(open);
    };

  if (!accessToken?.access_token) 
    return <Navigate to="/login" />;

  return (
    <React.Fragment>
      <Header toggleMenu={(e, action) => toggleDrawer(e, action)} />
      <Menu
        handleClose={() => {
          setMenuActive(false);
        }}
        menuActive={menuActive} />
      {children}
    </React.Fragment>
  );
};

export default CheckAuth;
