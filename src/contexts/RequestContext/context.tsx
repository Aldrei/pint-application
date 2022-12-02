import * as React from 'react';

import { IReducersType } from '../../stores';

export interface IRequestContext {
  propertyVideoDelete: keyof IReducersType;
}

const RequestContext = React.createContext({} as IRequestContext);

export default RequestContext;
