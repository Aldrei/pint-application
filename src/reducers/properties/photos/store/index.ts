import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { propertiesPhotosService } from '../../../../services/properties';
import { RootState } from '../../../../stores';

import { IServiceRequest, IPaginateDefault, IServiceError, IPhotoUploadPayload } from '../../../../types';

export interface IPropertiesPhotosUploadServiceRequest extends IServiceRequest {
  data?: IPaginateDefault | IServiceError
}

const initialState: IPropertiesPhotosUploadServiceRequest = {
  name: 'propertiesPhotosUploadReducer',
  status: 'idle',
};

interface IPropertiesPhotosUploadThunk {
  code: string;
  file: IPhotoUploadPayload;
}

export const propertiesPhotosUploadThunk = createAsyncThunk(
  'properties/photos-update-positions',
  async ({ code, file }: IPropertiesPhotosUploadThunk) => {
    const response = await propertiesPhotosService.store(code, file);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const propertiesPhotosUploadSlice = createSlice({
  name: 'properties-photos-update-positions',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {},
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Access token */
      .addCase(propertiesPhotosUploadThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(propertiesPhotosUploadThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data;
      })
      .addCase(propertiesPhotosUploadThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.data = action.payload as IServiceError;
      });
  },
});

export const selectPropertiesPhotosUploadReducer = (state: RootState) => state.propertiesPhotosUploadReducer;

export default propertiesPhotosUploadSlice.reducer;
