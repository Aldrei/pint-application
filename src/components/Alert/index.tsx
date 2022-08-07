import React from 'react';

// import { ThumbUp, Info, ErrorOutline } from '@mui/icons-material';

import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import InfoIcon from '@mui/icons-material/Info';
import ErrorOutline from '@mui/icons-material/ErrorOutline';

import { AlertContainer, ColIcon, ColMessage, MessageTitle, MessageDesc } from './styles';

interface IAlert {
  type: string;
  title?: string;
  text: string;
}

const Alert = ({ type, title, text }: IAlert): React.ReactElement => {
  const resolveIcon = () => {
    try {
      switch (type) {
      case 'error':
        return <ErrorOutline color='error' />;
      case 'success':
        return <CheckCircleOutlineIcon />;
      case 'info':
        return <InfoIcon />;
      default: return null;
      }
    } catch (error) {
      console.log(error);
      return null;
    }
  };

  return (
    <AlertContainer>
      <ColIcon>{resolveIcon()}</ColIcon>
      <ColMessage>
        {title && (<MessageTitle>{title}</MessageTitle>)}
        <MessageDesc>{text}</MessageDesc>
      </ColMessage>
    </AlertContainer>
  );
};

export default Alert;