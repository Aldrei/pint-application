import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

/**
 * Response.
*/
export type ISubscriptionPaymentServiceRequest = {
  stripe: any;
  clientSecret: any;
  cardElement: any;
  billingDetails?: any;
  paymentIntentId: any;
  paymentAvailableId: number;
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
  setPaymentAvailableIntent: (code: string, data: ISubscriptionPaymentAvailableIntentServiceRequest) => api.put(API.SUBSCRIPTION.PAYMENT_AVAILABLE_INTENT(code), {
    paymentIntentId: data.paymentIntentId
  }),
  setPaymentAvailableIntentConfirm: (code: string, data: ISubscriptionPaymentAvailableIntentServiceRequest) => api.put(API.SUBSCRIPTION.PAYMENT_AVAILABLE_INTENT_CONFIRM(code), {
    paymentIntentId: data.paymentIntentId
  }),
  availablePayments: () => api.get(API.SUBSCRIPTION.AVAILABLE_PAYMENTS),
};
