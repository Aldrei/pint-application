import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { resolveEmployeeStorePayload } from '../../../helpers';
import { employeesService } from '../../../services/employees';
import { RootState } from '../../../stores';

import { ROLES } from '../../../constants';
import { IEmployeeData, IEmployeesServiceThunk, IServiceRequestStatus, IServiceRequestTemp } from '../../../types';

const initialState: IServiceRequestTemp = {
  name: 'employeesListReducer',
  status: 'idle',
  crud: {
    create: {
      name: 'employeesCreateReducer',
      status: 'idle',
    },
    read: {
      name: 'employeesReadReducer',
      status: 'idle',
    },
    update: {
      name: 'employeesUpdateReducer',
      status: 'idle',
    },
    delete: {
      name: 'employeesDeleteReducer',
      status: 'idle',
    },
  }
};

export const employeesServiceThunk = createAsyncThunk(
  'employees/list',
  async ({ page }: IEmployeesServiceThunk) => {
    const response = await employeesService.list({ page });
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const employeesStoreThunk = createAsyncThunk(
  'employees/store',
  async (dataStore: IEmployeeData) => {
    dataStore.roles = prepareRoles(dataStore);

    const response = await employeesService.store(resolveEmployeeStorePayload(dataStore));
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const employeesUpdateThunk = createAsyncThunk(
  'employees/update',
  async (dataStore: IEmployeeData) => {
    dataStore.roles = prepareRoles(dataStore);

    const response = await employeesService.update(String(dataStore.id), resolveEmployeeStorePayload(dataStore));
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const employeesDeleteThunk = createAsyncThunk(
  'employees/delete',
  async (dataUpdate: IEmployeeData) => {
    const response = await employeesService.delete(String(dataUpdate.id));
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const employeesShowThunk = createAsyncThunk(
  'employees/show',
  async (id: string) => {
    const response = await employeesService.show(id);
    // The value we return becomes the `fulfilled` action payload

    return response;
  }
);

export const employeesListSlice = createSlice({
  name: 'employees-list',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setStatusStore: (state, action: PayloadAction<IServiceRequestStatus>) => {
      state.crud.create.status = action.payload;
    },
    setStatusUpdate: (state, action: PayloadAction<IServiceRequestStatus>) => {
      state.crud.update.status = action.payload;
    }
  },
  // The `extraReducers` field lets the slice handle actions defined elsewhere,
  // including actions generated by createAsyncThunk or in other slices.
  extraReducers: (builder) => {
    builder
      /** Start List Action */
      .addCase(employeesServiceThunk.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(employeesServiceThunk.fulfilled, (state, action) => {
        state.status = 'success';
        state.data = action.payload.data;
      })
      .addCase(employeesServiceThunk.rejected, (state, action) => {
        state.status = 'failed';
        state.crud.create.data = action.payload as object;
      })
      /** End List Action */
      /** Start Store Action */
      .addCase(employeesStoreThunk.pending, (state) => {
        state.crud.create.status = 'loading';
      })
      .addCase(employeesStoreThunk.fulfilled, (state, action) => {
        state.crud.create.status = 'success';
        state.crud.create.data = action.payload.data;
      })
      .addCase(employeesStoreThunk.rejected, (state, action) => {
        state.crud.create.status = 'failed';
        state.crud.create.data = action.payload as object;
      })
      /** End Store Action */
      /** Start Update Action */
      .addCase(employeesUpdateThunk.pending, (state) => {
        state.crud.update.status = 'loading';
      })
      .addCase(employeesUpdateThunk.fulfilled, (state, action) => {
        state.crud.update.status = 'success';
        state.crud.update.data = action.payload.data;
      })
      .addCase(employeesUpdateThunk.rejected, (state, action) => {
        state.crud.update.status = 'failed';
        state.crud.update.data = action.payload as object;
      })
      /** End Update Action */
      /** Start Delete Action */
      .addCase(employeesDeleteThunk.pending, (state) => {
        state.crud.delete.status = 'loading';
      })
      .addCase(employeesDeleteThunk.fulfilled, (state, action) => {
        state.crud.delete.status = 'success';
        state.crud.delete.data = action.payload.data;
      })
      .addCase(employeesDeleteThunk.rejected, (state, action) => {
        state.crud.delete.status = 'failed';
        state.crud.delete.data = action.payload as object;
      })
      /** End Delete Action */
      /** Start Show Action */
      .addCase(employeesShowThunk.pending, (state) => {
        state.crud.read.status = 'loading';
      })
      .addCase(employeesShowThunk.fulfilled, (state, action) => {
        state.crud.read.status = 'success';
        state.crud.read.data = action.payload.data;
      })
      .addCase(employeesShowThunk.rejected, (state, action) => {
        state.crud.read.status = 'failed';
        state.crud.read.data = action.payload as object;
      });
  },
});

export const { setStatusStore, setStatusUpdate } = employeesListSlice.actions;

export const selectEmployeesListReducer = (state: RootState) => state.employeesListReducer;

export default employeesListSlice.reducer;

const prepareRoles = (dataStore: IEmployeeData) => {
  const roles: string[] = [];
  if (dataStore.manager) roles.push(ROLES.MANAGER.VALUE);
  return roles;
};
