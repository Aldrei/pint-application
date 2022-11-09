import { IPropertyData, IPhotoData } from '../types';

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
export const hasFeature = (item: IPropertyData, feature: keyof IPropertyData): boolean => Boolean((item[feature] && (item[feature] === 1 || item[feature] === true)));

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

/**
 * Number prototype.
*/
declare global {
  interface Number {
    formatNumber(n: number, x?: number, s?: string, c?: string): string;
    toCurrencyBR(): string | number;
    toDecimal(): string | number;
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

Number.prototype.toDecimal = function() {
  const newValue = this.formatNumber(2, 0, '', '');
  console.log('DEBUG toDecimal newValue:', newValue);
  return newValue.replace(',', '.');
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

  }
}

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
    const splitedValue = result.split(',');

    let strToFomat = '';
    let thousand = '';
    let decimal = '';

    splitedValue[0] = splitedValue[0].replace(/\D/g, '');
    splitedValue[1] = splitedValue[1].replace(/\D/g, '');

    // If user add decimal: when decimal is bigger than 2, move comma to right
    if (splitedValue[1].length === 3) {
      thousand = `${splitedValue[0]}${splitedValue[1].charAt(0)}`;
      decimal = `${splitedValue[1].substring(1, 3)}`;
      strToFomat = `${thousand},${decimal}`;
    }

    // If user remove decimal: when decimal is less than 2, move comma to left
    if (splitedValue[1].length === 1) {
      decimal = `${splitedValue[0].charAt(splitedValue[0].length-1)}${splitedValue[1]}`;
      thousand = `${splitedValue[0].substring(0, splitedValue[0].length-1)}`;
      strToFomat = `${thousand},${decimal}`;
    }

    // If change thousand: when decimal is equal 2 
    if (splitedValue[1].length === 2) strToFomat = result;

    const newValue = strToFomat.currencyBrToDecimal();
    return String(Number(newValue).toCurrencyBR());
  }

  return '0,00';
};

String.prototype.currencyBrToDecimal = function() {
  if (this) {
    const splitedValue = this.split(',');
    const newValue = splitedValue[0].replace(/[^0-9]/g, '');
    return parseFloat(`${newValue}.${splitedValue[1]}`);
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
 * @param keyof IPhotoData size: size flag of IPhoneDate thumb or normal.
*/
export const getPhoto = (item: IPhotoData, size: keyof IPhotoData): string => {
  if (getEnv('REACT_APP_ENVIRONMENT') === 'local' && item[size] === 'file not exist')
    return `https://imobmobile.com.br/photos/${size}/${item.name}`;
  return String(item[size]);
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
