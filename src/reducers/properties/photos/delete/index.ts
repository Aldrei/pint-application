import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { propertiesPhotosService } from '../../../../services/properties';
import { RootState } from '../../../../stores';

import { IServiceRequest, IPaginateDefault, IServiceError, IServiceRequestStatus } from '../../../../types';

export interface IPropertiesPhotosDeleteServiceRequest extends IServiceRequest {
  data?: IPaginateDefault | IServiceError
}

const initialState: IPropertiesPhotosDeleteServiceRequest = {
  name: 'propertiesPhotosDeleteReducer',
  status: 'idle',
};

export interface IPropertiesPhotosDeleteThunk {
  code: string;
  photoId: string;
}

export const propertiesPhotosDeleteThunk = createAsyncThunk(
  'properties/photos-update',
  async ({ code, photoId }: IPropertiesPhotosDeleteThunk) => {
    const response = await propertiesPhotosService.delete(code, photoId);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const propertiesPhotosDeleteSlice = createSlice({
  name: 'properties-photos-delete',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPhotoDeleteStatus: (state, action: PayloadAction<IServiceRequestStatus>) => {
      state.status = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Access token */
      .addCase(propertiesPhotosDeleteThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(propertiesPhotosDeleteThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data;
      })
      .addCase(propertiesPhotosDeleteThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload as IServiceError;
      });
  },
});

export const { setPhotoDeleteStatus } = propertiesPhotosDeleteSlice.actions;

export const selectPropertiesPhotosDeleteReducer = (state: RootState) => state.propertiesPhotosDeleteReducer;

export default propertiesPhotosDeleteSlice.reducer;