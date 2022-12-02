import * as React from 'react';

type SnackType = 'success' | 'error' | 'warning' | 'info';

export interface ISnack {
  type: SnackType;
  message: string;
}

/* istanbul ignore next */ 
// eslint-disable-next-line @typescript-eslint/no-empty-function, @typescript-eslint/no-unused-vars
const SnackContext = React.createContext({ addMessage: (props: ISnack) => {} });

export default SnackContext;
