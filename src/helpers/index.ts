import { IPropertyData } from '../types';

export const isEquivalentRoute = (route: string, compareRoute: string): boolean => {
  if (route === compareRoute) return true;
  return false;
};

export const hasFeature = (item: IPropertyData, feature: keyof IPropertyData) => (item[feature] === 1 || item[feature] === true);

export const getValorPub = (item: IPropertyData): string => (item?.valorPub ? `R$ ${item.valorPub}` : 'R$ --');