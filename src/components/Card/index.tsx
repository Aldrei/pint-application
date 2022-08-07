import React from 'react';

import { CardStyle } from './styles';

interface Props {
  children?: React.ReactNode;
}

const Card = (props: Props) => {
  return <CardStyle className='cardComp'>{props.children}</CardStyle>;
};

export default Card;