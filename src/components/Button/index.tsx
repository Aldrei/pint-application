import React from 'react'

import { ButtonStyle } from './styles'

const Button = ({...props}): React.ReactElement => {
  return <ButtonStyle data-testid="buttonComp" className="buttonComp" {...props} />
}

export default Button;