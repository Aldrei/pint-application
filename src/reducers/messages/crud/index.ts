import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../../stores';

import { messagesService } from '../../../services/messages';
import { IPaginationServiceThunk, IServiceRequest } from '../../../types';

const initialState: IServiceRequest = {
  name: 'messagesListReducer',
  status: 'idle',
};

export const messagesServiceThunk = createAsyncThunk(
  'messages/list',
  async ({ page }: IPaginationServiceThunk) => {
    const response = await messagesService.list({ page });
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const messagesListSlice = createSlice({
  name: 'messages-list',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Start List Action */
      .addCase(messagesServiceThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(messagesServiceThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data;
      })
      .addCase(messagesServiceThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload as object;
      });
  },
});

// export const {} = messagesListSlice.actions;

export const selectMessagesListReducer = (state: RootState) => state.messagesListReducer;

export default messagesListSlice.reducer;