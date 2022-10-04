import { IPropertyData } from '../types';

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
export const hasFeature = (item: IPropertyData, feature: keyof IPropertyData) => Boolean((item[feature] && (item[feature] === 1 || item[feature] === true)));

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
 * Formatations.
*/

/**
 * getValorPub(item)
 * 
 * @param IPropertyData item: data property
*/
export const getValorPub = (item: IPropertyData): string => (item?.valorPub ? `R$ ${item.valorPub}` : 'R$ --');

/**
 * Number.prototype.format(n, x, s, c)
 * 
 * @param integer n: length of decimal
 * @param integer x: length of whole part
 * @param mixed   s: sections delimiter
 * @param mixed   c: decimal delimiter
 */

declare global {
  interface Number {
    formatNumber(n: number, x: number, s: string, c: string): string;
    toCurrencyBR(): string | number;
  }
}

Number.prototype.formatNumber = function(n: number, x: number, s: string, c: string) {
  const re = '\\d(?=(\\d{' + (x || 3) + '})+' + (n > 0 ? '\\D' : '$') + ')',
    num = this.toFixed(Math.max(0, ~~n));
  
  return (c ? num.replace('.', c) : num).replace(new RegExp(re, 'g'), '$&' + (s || ','));
};

Number.prototype.toCurrencyBR = function() {
  return this.formatNumber(2, 3, '.', ',');
};

/**
 * String.prototype.toDateBR()
*/
declare global {
  interface String {
    toDateBR(): string;
  }
}

String.prototype.toDateBR = function() {
  if (isValidDate(String(this)))
    return this.split('-').reduceRight((acc, cur, i) => `${acc}${i < 2 ? '/' : ''}${cur}`, '');
  return '';
};


/**
 * isValidDate(str)
 * 
 * @param string str: string to check is a valid date.
*/
const isValidDate = (str: string): boolean => !!(str && !isNaN(Date.parse(str)));
