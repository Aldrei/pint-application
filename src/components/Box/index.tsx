import React from 'react'

// import Box from '@mui/material/Box';
// import TextField from '@mui/material/TextField';

import { BoxStyle } from './styles'

export interface Props  { 
  children?: React.ReactNode
}

const Box = (props: Props): React.ReactElement => {
  return (
    <BoxStyle>{props.children}</BoxStyle>
  );
}

export default Box;