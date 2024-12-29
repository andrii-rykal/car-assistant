import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCar } from '../types';
import { AddCarResponse } from '../types/AddCarResponse';
import { createCar } from '../api/createCar';
import { AxiosError } from 'axios';
import { getCars } from '../api/getCars';

interface CreatingCarState {
  createCar: {
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  fetchCars: {
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  newCar: AddCarResponse | null;
  cars: AddCarResponse[];
  isAddingCar: boolean;
  currentUserCar: AddCarResponse | null;
}

const initialState: CreatingCarState = {
  createCar: {
    isLoading: false,
    error: null,
    success: false,
  },
  fetchCars: {
    isLoading: false,
    error: null,
    success: false,
  },
  newCar: null,
  cars: [],
  isAddingCar: false,
  currentUserCar: null
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

export const fetchCars = createAsyncThunk<
  AddCarResponse[],
  void,
  { rejectValue: string }
>('cars/fetchCars', async (_, { rejectWithValue }) => {
  try {
    const response = await getCars();
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data.message || 'Failed to fetch cars. Please try again.',
    );
  }
});

const addCarSlice = createSlice({
  name: 'addCar',
  initialState,
  reducers: {
    resetStateCar: state => {
      state.createCar.isLoading = false;
      state.createCar.error = null;
      state.createCar.success = false;
      state.newCar = null;
    },
    showingForm: (state, action: PayloadAction<boolean>) => {
      state.isAddingCar = action.payload;
    },
    setSelectedCar: (state, action: PayloadAction<AddCarResponse | null>) => {
      state.currentUserCar = action.payload;
    }
  },
  extraReducers: builder => {
    builder
      .addCase(creatingCar.pending, state => {
        state.createCar.isLoading = true;
        state.createCar.error = null;
      })
      .addCase(
        creatingCar.fulfilled,
        (state, action: PayloadAction<AddCarResponse>) => {
          state.createCar.isLoading = false;
          state.createCar.success = true;
          state.newCar = action.payload;
        },
      )
      .addCase(creatingCar.rejected, (state, action) => {
        state.createCar.isLoading = false;
        state.createCar.error = action.payload ?? 'Unknown error';
      })
      .addCase(fetchCars.pending, state => {
        state.fetchCars.isLoading = true;
        state.fetchCars.error = null;
      })
      .addCase(
        fetchCars.fulfilled,
        (state, action: PayloadAction<AddCarResponse[]>) => {
          state.fetchCars.isLoading = false;
          state.cars = action.payload;
        },
      )
      .addCase(fetchCars.rejected, (state, action) => {
        state.fetchCars.isLoading = false;
        state.fetchCars.error = action.payload ?? 'Unknown error';
      }); 
  },
});

export const { resetStateCar, showingForm, setSelectedCar } = addCarSlice.actions;
export default addCarSlice.reducer;
