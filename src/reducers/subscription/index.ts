import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ISubscriptionPaymentResponse, ISubscriptionPaymentServiceRequest, subscriptionService } from '../../services/subscription';
import { AppThunk } from '../../stores';

import { IServiceRequest } from '../../types';

export interface ISubscriptionState extends IServiceRequest {
  payment: ISubscriptionPaymentResponse;
}

const initialState: ISubscriptionState = {
  name: 'subscriptionReducer',
  status: 'idle',
  payment: {} as ISubscriptionPaymentResponse,
};

export const subscriptionPaymentServiceThunk = createAsyncThunk(
  'subscription/payment',
  async (data: ISubscriptionPaymentServiceRequest) => {
    const response = await subscriptionService.payment(data);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const subscriptionSlice = createSlice({
  name: 'auth',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    clearAccessToken: (state) => {
      state.payment = {} as ISubscriptionPaymentResponse;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Payment */
      .addCase(subscriptionPaymentServiceThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(subscriptionPaymentServiceThunk.fulfilled, (state, action) => {
        console.log('DEBUG action.payload:', action.payload);
        state.status = 'success';
        state.data = action.payload.data;
      })
      .addCase(subscriptionPaymentServiceThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload as object;
        state.payment = {};
      });
  },
});

const { clearAccessToken } = subscriptionSlice.actions;

export const clearAccessTokenReducer = (): AppThunk => (dispatch) => {
  dispatch(clearAccessToken());
};

export default subscriptionSlice.reducer;