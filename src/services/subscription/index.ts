import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

/**
 * Response.
*/
// Payment confirmation
export interface ISubscriptionPaymentResponse {
  status?: string
}

export type ISubscriptionPaymentServiceRequest = any

// Payment intent
export interface ISubscriptionPaymentIntentResponse {
  success: boolean;
  paymentIntentId: string;
  clientSecret: string;
  status: string;
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
