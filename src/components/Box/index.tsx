import React from 'react'

import { BoxStyle } from './styles'

export interface Props  { 
  children?: React.ReactNode
}

const Box = (props: Props): React.ReactElement => {
  return (
    <BoxStyle className='boxComp'>{props.children}</BoxStyle>
  );
}

export default Box;