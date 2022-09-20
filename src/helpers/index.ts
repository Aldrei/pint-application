import { IPaginatePropertyData } from '../types';

export const isEquivalentRoute = (route: string, compareRoute: string): boolean => {
  if (route === compareRoute) return true;
  return false;
};

export const hasFeature = (item: IPaginatePropertyData, feature: keyof IPaginatePropertyData) => (item[feature] === 1 || item[feature] === true);

export const getValorPub = (item: IPaginatePropertyData): string => (item?.valorPub ? `R$ ${item.valorPub}` : 'R$ --');