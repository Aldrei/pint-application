import React from 'react'

import { ButtonStyle } from './styles'

const Button = ({...props}): React.ReactElement => {
  return <ButtonStyle {...props} />
}

export default Button;