import { createContext } from 'react';

/* istanbul ignore next */ 
// eslint-disable-next-line @typescript-eslint/no-empty-function
const ColorModeContext = createContext({ toggleColorMode: () => {} });

export default ColorModeContext;