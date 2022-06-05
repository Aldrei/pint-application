import React from 'react'

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import { ContainerStyle } from './styles'

export interface Props  { 
  children?: React.ReactNode
}

const Container = (props: Props): React.ReactElement => {
  return (
    <ContainerStyle>{props.children}</ContainerStyle>
  );
}

export default Container;