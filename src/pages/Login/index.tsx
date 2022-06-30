import React from 'react'

import Button from '../../components/Button'
import Card from '../../components/Card'
import Input from '../../components/Input'

import { LoginContainer } from './styles';

const LoginPage = (): React.ReactElement => {
  return (
    <LoginContainer>
      <Card>
        <Input name="username" placeholder="Email" />
        <Input name="password" placeholder="Senha" />
        <Button color='blue'>Entrar</Button>
      </Card>
    </LoginContainer>
  );
}

export default LoginPage;

