import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCar } from '../types';
import { AddCarResponse } from '../types/AddCarResponse';
import { createCar } from '../api/createCar';
import { AxiosError } from 'axios';

interface CreatingCarState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  newCar: AddCarResponse | null;
}

const initialState: CreatingCarState = {
  isLoading: false,
  error: null,
  success: false,
  newCar: null,
};

export const creatingCar = createAsyncThunk<
  AddCarResponse,
  AddNewCar,
  { rejectValue: string }
>('cars/createCar', async (addCarData, { rejectWithValue }) => {
  try {
    const response = await createCar(addCarData);
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data.message || 'The car is not created. Please try again.',
    );
  }
});

const addCarSlice = createSlice({
  name: 'createCar',
  initialState,
  reducers: {
    resetStateCar: state => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
      state.newCar = null;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(creatingCar.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        creatingCar.fulfilled,
        (state, action: PayloadAction<AddCarResponse>) => {
          state.isLoading = false;
          state.newCar = action.payload;
        },
    )
      .addCase(creatingCar.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload ?? 'Unknown error';
    })
  },
});

export const { resetStateCar } = addCarSlice.actions;
export default addCarSlice.reducer;
