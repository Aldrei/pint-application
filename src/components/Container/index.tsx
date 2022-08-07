import React from 'react';

import { ContainerStyle } from './styles';

export interface Props {
  children?: React.ReactNode
}

const Container = (props: Props): React.ReactElement => {
  return (
    <ContainerStyle className='containerComp'>{props.children}</ContainerStyle>
  );
};

export default Container;