import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

/**
 * Response.
*/
// Payment confirmation
export type ISubscriptionPaymentResponse = {
  error?: any;
  paymentIntent?: any
}

export type ISubscriptionPaymentServiceRequest = {
  stripe: any;
  clientSecret: any;
  cardElement: any;
  billingDetails?: any;
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
};
