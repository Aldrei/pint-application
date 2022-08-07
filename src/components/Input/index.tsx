import React from 'react';

import { InputStyle } from './styles';

const Input = ({...props}): React.ReactElement => {
  return <InputStyle className="inputComp" {...props} />;
};

export default Input;