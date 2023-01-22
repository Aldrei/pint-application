import React from 'react';

import LinearProgress from '@mui/material/LinearProgress';

import { ButtonStyle, ButtonFabStyle } from './styles';

export interface Props {
  'data-testid'?: string;
  props?: React.PropsWithChildren;
  loading?: boolean;
  text: string;
  color?: string;
  disabled?: boolean;
  onClick?(): void;
  fab?: boolean;
  icon?: React.ReactElement;
}

const Button = ({ loading, text, disabled, color, fab, icon, ...props }: Props): React.ReactElement => {
  if (fab) return (
    <ButtonFabStyle variant="extended" disabled={loading || disabled} {...props}>
      {loading && (<LinearProgress className="linear-progress" />)}
      {icon}{text}
    </ButtonFabStyle>
  );

  return (
    <ButtonStyle disabled={loading || disabled} mycolor={color} {...props}>
      {loading && (<LinearProgress className="linear-progress" />)}
      {icon}{text}
    </ButtonStyle>
  );
};

export default Button;