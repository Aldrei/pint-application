import React from 'react'

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import { WrapperStyle } from './styles'

export interface Props  { 
  children?: React.ReactNode
}

const Wrapper = (props: Props): React.ReactElement => {
  return (
    <WrapperStyle>{props.children}</WrapperStyle>
  );
}

export default Wrapper;