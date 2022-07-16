import React, { useState } from 'react'

import { IAuthServiceAccessTokenRequest } from '../../services/auth';

import helperDataFormControl from '../../helpers/helperDataFormControl';

import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'

import { RootState } from '../../store';
import { useAppSelector, useAppDispatch } from '../../store/hooks';

import { authServiceThunk } from '../../reducer/auty';

import { LoginContainer } from './styles';

const LoginPage = (): React.ReactElement => {
  const { accessToken, status } = useAppSelector((state: RootState) => state.auth);
  const dispatch = useAppDispatch();

  console.log({ accessToken });
  console.log({ status });

  const [form, setForm] = useState({} as IAuthServiceAccessTokenRequest);

  const formIsValid = (): boolean => (form?.username?.length > 3 && form?.password?.length > 3);

  const handleAuth = async () => {
    try {
      if (formIsValid()) {
        dispatch(authServiceThunk(form));
      }
    } catch (error) {
      console.error('LoginPage error:', error);
    }
  }

  const handleSetValue = (e: React.ChangeEvent<HTMLInputElement>)  => {
    try {
      const { name, value } = e.target;
      const newDataForm = helperDataFormControl<keyof IAuthServiceAccessTokenRequest, IAuthServiceAccessTokenRequest>(name as keyof IAuthServiceAccessTokenRequest, value)(form);

      setForm(newDataForm);
    } catch (error) {
      console.error('handleSetValue error:', error);
    }
  }

  if (accessToken?.access_token) alert('BIIIRRRLLL');

  /**
   * NOTE: Controlled components without defined values - https://reactjs.org/docs/uncontrolled-components.html#the-file-input-tag
   *       Controlled components with defined values will use in editions forms.
  */
  return (
    <LoginContainer data-testid='loginContainer'>
      <Card>
        <Input onChange={handleSetValue} data-testid="username" name="username" placeholder="Email" />
        <Input onChange={handleSetValue} data-testid="password" type="password" name="password" placeholder="Senha" />
        <Button onClick={handleAuth} data-testid="button-login" color='blue' disabled={!formIsValid()}>Entrar</Button>
      </Card>
    </LoginContainer>
  );
}

export default LoginPage;

