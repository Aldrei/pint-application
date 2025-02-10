import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

/**
 * Response.
*/
// Payment confirmation
export type ISubscriptionPaymentResponse = {
  status?: string;
  error?: any;
  paymentIntent?: any
}

export type ISubscriptionPaymentServiceRequest = {
  stripe: any;
  clientSecret: any;
  cardElement: any;
  billingDetails?: any;
  paymentIntentId: any;
  paymentAvailableId: number;
}

// Payment intent
export interface ISubscriptionPaymentIntentResponse {
  success?: boolean;
  paymentIntentId?: string;
  clientSecret?: string;
  status?: string;
  error?: any;
}

export type ISubscriptionPaymentIntentServiceRequest = any

export type ISubscriptionPaymentAvailableIntentServiceRequest = {
  paymentIntentId: string;
}

/**
 * Revoke.
*/
export interface IAuthServiceRevokeResponse {
  message?: string;
}

export interface IAuthServiceRevokeRequest {
  token: string;
}

export const subscriptionService = {
  payment: (data: ISubscriptionPaymentServiceRequest) => api.post(API.SUBSCRIPTION.PAYMENT, {}),
  paymentIntent: (data: ISubscriptionPaymentIntentServiceRequest) => api.post(API.SUBSCRIPTION.PAYMENT_INTENT, {}),
  setPaymentAvailableIntent: (data: ISubscriptionPaymentAvailableIntentServiceRequest) => api.put(API.SUBSCRIPTION.PAYMENT_AVAILABLE_INTENT, {
    paymentIntentId: data.paymentIntentId
  }),
  setPaymentAvailableIntentConfirm: (data: ISubscriptionPaymentAvailableIntentServiceRequest) => api.put(API.SUBSCRIPTION.PAYMENT_AVAILABLE_INTENT_CONFIRM, {
    paymentIntentId: data.paymentIntentId
  }),
};
