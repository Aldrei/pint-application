import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import { ButtonStyle } from './styles';

export interface Props {
  'data-testid'?: string;
  props?: React.PropsWithChildren;
  loading?: boolean;
  text: string;
  color?: string;
  disabled?: boolean;
  onClick?(): void;
}

const Button = ({ loading, text, disabled, ...props }: Props): React.ReactElement => {
  return (
    <ButtonStyle data-testid="buttonComp" className="buttonComp" disabled={loading || disabled} {...props}>
      {loading && (<LinearProgress className="linear-progress" />)}
      {text}
    </ButtonStyle>
  );
};

export default Button;