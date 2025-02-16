import React from 'react';

import { AlertContainer } from './styles';
import AlertTitle from '@mui/material/AlertTitle';
import Alert, { AlertColor } from '@mui/material/Alert';

interface IAlert {
  type: AlertColor;
  title?: string;
  text: string;
}

const AlertComponent = ({ type, title, text }: IAlert): React.ReactElement => {
  return (
    <AlertContainer>
      <Alert severity={type}>
        {title && <AlertTitle>{title}</AlertTitle>}
        {text}
      </Alert>
    </AlertContainer>
  );
};

export default AlertComponent;