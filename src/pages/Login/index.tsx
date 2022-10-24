import React, { useState } from 'react';

import { IAuthServiceAccessTokenRequest } from '../../services/auth';

import { hasProperty, helperDataFormControl } from '../../helpers';

import Button from '../../components/Button';
import Card from '../../components/Card';
import Input from '../../components/Input';
import Alert from '../../components/Alert';

import { IAutyState } from '../../reducers/auty';
import { useAppDispatch } from '../../stores/hooks';
import { authServiceThunk } from '../../reducers/auty';
import { useAppSelectorBlaBlaBal } from '../../hooks/useReducerSelector';

import { LoginContainer } from './styles';

const LoginPage = (): React.ReactElement => {
  const { status } = useAppSelectorBlaBlaBal('authReducer') as IAutyState;
  const dispatch = useAppDispatch();

  const [form, setForm] = useState({} as IAuthServiceAccessTokenRequest);

  const formIsValid = (): boolean => hasProperty(form, 'username.length') && hasProperty(form, 'password.length') && (form.username.length > 3 && form.password.length > 3);

  const handleAuth = () => {
    try {
      if (formIsValid()) {
        dispatch(authServiceThunk(form));
      }
    } catch (error) {
      /* istanbul ignore next */ 
      console.error('LoginPage error:', error);
    }
  };

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const { name, value } = e.target;
      const newDataForm = helperDataFormControl<keyof IAuthServiceAccessTokenRequest, IAuthServiceAccessTokenRequest>(name as keyof IAuthServiceAccessTokenRequest, value)(form);

      setForm(newDataForm);
    } catch (error) {
      /* istanbul ignore next */ 
      console.error('handleSetValue error:', error);
    }
  };

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  return (
    <LoginContainer data-testid='loginContainer'>
      <Card>
        <Input onChange={handleSetValue} data-testid="username" name="username" placeholder="Email" />
        <Input onChange={handleSetValue} data-testid="password" type="password" name="password" placeholder="Senha" />
        <Button onClick={handleAuth} data-testid="button-login" color='blue' disabled={!formIsValid()} loading={(status === 'loading')} text='Entrar' />
        {status === 'failed' && (<Alert type="error" title="Tente novamente" text="Email ou senha inválido!" />)}
      </Card>
    </LoginContainer>
  );
};

export default LoginPage;

