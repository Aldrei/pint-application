import api from '../../hooks/useConfigAxios';

import { API } from '../../constants';

/**
 * Response.
*/
export interface ISubscriptionPaymentResponse {
  status?: string
}

export type ISubscriptionPaymentServiceRequest = any

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
};
