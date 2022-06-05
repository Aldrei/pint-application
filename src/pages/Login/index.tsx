import React from 'react'

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import Container from '../../components/Container'
import Input from '../../components/Input'

const LoginPage = (): React.ReactElement => {
  return (
    <Container>
      <Input name="username" />
      <Input name="password" />
    </Container>
  );
}

export default LoginPage;