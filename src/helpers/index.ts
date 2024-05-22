import {
  IBannerData,
  IBannerStorePayload,
  ICityData,
  ICityStorePayload,
  IEmployeeData,
  IEmployeeStorePayload,
  INeighborhoodData,
  INeighborhoodStorePayload,
  IOwnerData,
  IOwnerStorePayload,
  IOwnerUpdatePayload,
  IPhotoData,
  IPropertyData,
  IPropertyStorePayload,
  IPropertyUpdatePayload,
} from '../types';

import { ROLES } from '../constants';
import Messages from '../constants/messages';

/**
 * getEnv(flag)
 * 
 * @param string flag: property to access value.
*/
export const getEnv = (flag: string): string | unknown => process.env[flag];

/**
 * Verifications.
*/
/**
 * isEquivalentRoute(route, compareRoute)
 * 
 * @param string route: URL pathname
 * @param string compareRoute: URL pathname 
*/
export const isEquivalentRoute = (route: string, compareRoute: string): boolean => {
  if (route === compareRoute) return true;
  return false;
};

/**
 * hasFeature(item, feature)
 * 
 * @param IPropertyData item: data property
 * @param keyof IPropertyData feature: flag property
*/
export const hasFeature = (item: IPropertyData, feature: keyof IPropertyData): boolean => Boolean((item[feature] && (Number(item[feature]) === 1 || Boolean(item[feature] === true))));

/**
 * hasProperty(objUknown, path)
 * 
 * @param unknown unknown: object any
 * @param keyof path: nested path to property in object
*/
export const hasProperty = (objUknown: unknown, path: string) => {
  const obj: Record<string, unknown> = objUknown as Record<string, unknown>;
  return !!path.split('.').reduce<Record<string, unknown> | undefined>((acc, cur) => {
    if (acc && acc[cur]) {
      return acc[cur] as Record<string, unknown> ;
    }
    return undefined;
  }, obj);
};

export const hasPropertyTyped = <T>(objUknown: unknown, path: string) => {
  const obj: T = objUknown as T;

  return !!path.split('.').reduce<T | undefined>((acc, cur) => {
    const accTyped = acc as T;
    const curTyped = cur as keyof T;

    if (accTyped && accTyped[curTyped]) return accTyped[curTyped] as unknown as T;

    return undefined;
  }, obj);
};

/**
 * Number prototype.
*/
declare global {
  interface Number {
    formatNumber(n: number, x?: number, s?: string, c?: string): string;
    toCurrencyBR(): string | number;
  }
}

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */
Number.prototype.formatNumber = function(n: number, x?: number, s?: string, c?: string) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));
  
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

Number.prototype.toCurrencyBR = function() {
  return this.formatNumber(2, 3, '.', ',');
};

/**
 * String prototype.
*/
declare global {
  interface String {
    toDateBR(): string;
    toCurrencyBRPress(): string;
    currencyBrToDecimal(): number;
    onlyNumbers(): string;
    toCepPress(): string;
  }
}

String.prototype.toCepPress = function() {
  if (this) {
    const strToFomat = this.onlyNumbers();
    if (strToFomat.length === 8) return `${strToFomat.substring(0, strToFomat.length-3)}-${strToFomat.substring(strToFomat.length-3)}`;
    
    return strToFomat;
  }

  return '';
};

String.prototype.onlyNumbers = function() {
  if (this) return this.replace(/\D/g, '');
  return '';
};

String.prototype.toDateBR = function() {
  if (isValidDate(String(this)))
    return this.split('-').reduceRight((acc, cur, i) => `${acc}${i < 2 ? '/' : ''}${cur}`, '');
  return '';
};

String.prototype.toCurrencyBRPress = function() {
  const result = String(this) || '0,00';

  if (result) {
    // Eliminate characteres
    let strToFomat = result.onlyNumbers();
    // Add comma on the right position
    strToFomat = `${strToFomat.substring(0, strToFomat.length-2)},${strToFomat.substring(strToFomat.length-2)}`;
    // Eliminate redundant zeros and Return new value formated
    return String(strToFomat.currencyBrToDecimal().toCurrencyBR());
  }

  return '0,00';
};

String.prototype.currencyBrToDecimal = function() {
  if (this) {
    const splitedValue = this.split(',');
    return parseFloat(`${splitedValue[0].onlyNumbers()}.${splitedValue[1].onlyNumbers()}`);
  }
  return 0.00;
};

/**
 * isValidDate(str)
 * 
 * @param string str: string to check is a valid date.
*/
const isValidDate = (str: string): boolean => !!(str && !isNaN(Date.parse(str)));

declare global {
  interface String {
    toMeter(type?: string): string;
  }
}

/**
 * toMeter(type)
 * 
 * @param string type: type of sufixe
*/
String.prototype.toMeter = function(type) {
  if (String(this))
    return type === 'square' ? `${this}m²` : `${this}m`;
  return '';
};

/**
 * getPhoto(item, size)
 * 
 * @param IPhotoData item: data photo from API.
 * @param keyof IPhotoData size: size flag of IPhotoData thumb or normal.
*/
export const getPhoto = (item: IPhotoData, size: keyof IPhotoData): string => {
  return size === 'thumb' ? item.thumb : item.normal;
};

/**
 * getPhoto(item, size)
 * 
 * @param IBannerData item: data banner from API.
 * @param keyof IBannerData size: size flag of IBannerData thumb or normal.
*/
export const getBannerPhoto = (item: IBannerData, size: keyof IBannerData): string => {
  return size === 'thumb' ? item.thumb : item.normal;
};

/**
 * Validating property characteristics.
*/
/**
 * showDormitorio(item)
 * 
 * @param IPropertyData item: data property.
*/
export const showDormitorio = (item: IPropertyData) => `${item.dormitorio && Number(item.dormitorio) ? item.dormitorio : '--'} dormitório(s)`;

/**
 * showGaragem(item)
 * 
 * @param IPropertyData item: data property.
*/
export const showGaragem = (item: IPropertyData) => `${item.garagem && Number(item.garagem) ? item.garagem : '--'} carro(s)`;

/**
 * showGaragem(item)
 * 
 * @param IPropertyData item: data property.
 * @param keyof IPropertyData key: key of item.
 * 
 * valor - valorIPTU - valorCondominio
*/
export const showCurrency = (item: IPropertyData, key: keyof IPropertyData) => `R$ ${Number(item[key]).toCurrencyBR()}`;

/**
 * Form.
*/
/**
 * helperDataFormControl<keyof XX, XX>(key as keyof W, value)(XX)
 * 
 * @param XX
 * 
 * @param W key: key of object.
 * @param XX[W] value: value of object key.
 * @param XX obj: object form.
*/
export const helperDataFormControl = <W extends keyof XX, XX extends object>(key: W, value: XX[W]) => (obj: XX) => {
  obj[key] = value;
  /**
   * NOTE: JSON.parse(JSON.stringify()) prevent bug not-rendering: force a new instance from obj param.
  */
  return JSON.parse(JSON.stringify(obj));
};

/**
 * Payload.
*/
export const resolvePropertyStorePayload = (dataPropertyStore: IPropertyData): IPropertyStorePayload => {
  const dataStorePayload = {
    ...dataPropertyStore,
  } as unknown as IPropertyStorePayload;

  return dataStorePayload;
};

export const resolvePropertyUpdatePayload = (dataPropertyUpdate: IPropertyData): IPropertyUpdatePayload => {
  const dataUpdatePayload = {
    ...dataPropertyUpdate,
  } as unknown as IPropertyUpdatePayload;

  return dataUpdatePayload;
};

export const resolveOwnerStorePayload = (dataStorePayload: IOwnerData): IOwnerStorePayload => {
  const data = {
    ...dataStorePayload,
  } as unknown as IOwnerStorePayload;

  return data;
};

export const resolveOwnerUpdatePayload = (dataPayload: IOwnerData): IOwnerUpdatePayload => {
  const data = {
    ...dataPayload,
  } as unknown as IOwnerUpdatePayload;

  return data;
};

export const resolveEmployeeStorePayload = (dataStorePayload: IEmployeeData): IEmployeeStorePayload => {
  const data = {
    ...dataStorePayload,
  } as unknown as IEmployeeStorePayload;

  return data;
};

export const resolveCityStorePayload = (dataStorePayload: ICityData): ICityStorePayload => {
  const data = {
    ...dataStorePayload,
  } as unknown as ICityStorePayload;

  return data;
};

export const resolveNeighborhoodsStorePayload = (dataStorePayload: INeighborhoodData): INeighborhoodStorePayload => {
  const data = {
    ...dataStorePayload,
  } as unknown as INeighborhoodStorePayload;

  return data;
};

export const resolveBannerStorePayload = (dataStorePayload: IBannerData): IBannerStorePayload => {
  const data = {
    ...dataStorePayload,
  } as unknown as IBannerStorePayload;

  return data;
};

export const statusCodeIs = (statusCode: number): string => {
  if (statusCode >= 200 && statusCode <= 299) return 'success';
  if (statusCode >= 400 && statusCode <= 499) return 'error';
  if (statusCode >= 500 && statusCode <= 599) return 'error';
  return '';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const dataListToDataOptions = (dataResult: any) => {
  // eslint-disable-next-line
  const dataList = dataResult ? dataResult as unknown as Record<string, any> : [] as Record<string, any>;
  // eslint-disable-next-line
  const dataOptions: readonly any[] = dataList.data || [];

  return dataOptions;
};

type IGetMessageAction = keyof typeof Messages.pt.generic;
type IGetMessageType = keyof typeof Messages.pt.generic.store;

interface IGetMessage {
  action: IGetMessageAction;
  type: IGetMessageType;
  model?: string;
}
 
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const getMessage = ({ action, type, model = '' }: IGetMessage): string => {
  const messageInstance = Messages.pt.generic[action][type]; 
  if (typeof messageInstance === 'function') return messageInstance(model);
  return Messages.pt.generic[action][type] as string;
};

export const canManageUsers = (): boolean => {
  try {
    const persistImob = localStorage.getItem('persist:imob');
    const persistImobData = persistImob ? JSON.parse(persistImob) : {};

    if (persistImobData?.authReducer) {
      const authReducer = JSON.parse(persistImobData?.authReducer);
      const userRoles = authReducer?.whoIsAuth?.employee?.data?.user?.data?.roles?.data as string[];
      
      if (userRoles.includes(ROLES.ADMINISTRATOR.VALUE) || userRoles.includes(ROLES.MANAGER.VALUE)) return true;
    }

    return false;
  } catch (error) {
    console.log('Error canManageUser', error);
    return false;
  }
};