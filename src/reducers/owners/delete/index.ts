import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ownersService } from '../../../services/owners';
import { RootState } from '../../../stores';

import { 
  IServiceRequest,
  IServiceError 
} from '../../../types';

const initialState: IServiceRequest = {
  name: 'ownersDeleteReducer',
  status: 'idle',
};

export const ownersDeleteThunk = createAsyncThunk(
  'owner/delete',
  async (id: string) => {
    const response = await ownersService.delete(id);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const ownerDeleteSlice = createSlice({
  name: 'owner-delete',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Access token */
      .addCase(ownersDeleteThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(ownersDeleteThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data as object;
      })
      .addCase(ownersDeleteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload as IServiceError;
      });
  },
});

export const selectOwnersDeleteReducer = (state: RootState) => state.ownersDeleteReducer;

export default ownerDeleteSlice.reducer;
