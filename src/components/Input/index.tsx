import React from 'react';

import { InputStyle, MultilineInputStyle } from './styles';

const Input = ({...props}): React.ReactElement => {
  if (props.type === 'multiline') return <MultilineInputStyle className="inputComp" {...props} />;
  return <InputStyle className="inputComp" {...props} />;
};

export default Input;