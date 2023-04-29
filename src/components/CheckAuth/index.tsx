import React, { useState } from 'react';

import { Navigate } from 'react-router-dom';

import { IAutyState } from '../../reducers/auty';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

import { useConfigAxios } from '../../hooks/useConfigAxios';

import Menu from '../Menu';
import Header from '../Header';

const CheckAuth = ({ children }: { children: JSX.Element }) => {
  const { accessToken } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;
  const [menuActive, setMenuActive] = useState(false);

  useConfigAxios();

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
