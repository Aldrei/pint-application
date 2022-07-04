import React from 'react'

import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'

import { LoginContainer } from './styles';

const LoginPage = (): React.ReactElement => {
  return (
    <LoginContainer data-testid='loginContainer'>
      <Card>
        <Input data-testid="username" name="username" placeholder="Email" />
        <Input data-testid="password" name="password" placeholder="Senha" />
        <Button data-testid="button-login" color='blue'>Entrar</Button>
      </Card>
    </LoginContainer>
  );
}

export default LoginPage;

