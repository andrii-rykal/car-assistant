import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { AddNewCar, FuelType } from '../types';
import { AddCarResponse } from '../types/AddCarResponse';
import { createCar } from '../api/createCar';
import { AxiosError } from 'axios';
import { getCars } from '../api/getCars';
import { getFuelTypes } from '../api/getFuelTypes';

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
  fetchFuelTypes: {
    isLoading: boolean;
    error: string | null;
    success: boolean;
  };
  newCar: AddCarResponse | null;
  cars: AddCarResponse[];
  isAddingCar: boolean;
  currentUserCar: AddCarResponse | null;
  fuelTypes: FuelType[];
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
  fetchFuelTypes: {
    isLoading: false,
    error: null,
    success: false,
  },
  newCar: null,
  cars: [],
  isAddingCar: false,
  currentUserCar: null,
  fuelTypes: []
};

export const creatingCar = createAsyncThunk<
  AddCarResponse,
  AddNewCar,
  { rejectValue: string }
>('addCar/createCar', async (addCarData, { rejectWithValue }) => {
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
>('addCar/fetchCars', async (_, { rejectWithValue }) => {
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

export const fetchFuelTypes = createAsyncThunk<
  FuelType[],
  void,
  { rejectValue: string }
>('addCar/fetchFuelTypes', async (_, { rejectWithValue }) => {
  try {
    const response = await getFuelTypes();
    return response.data;
  } catch (error: unknown) {
    const err = error as AxiosError<{ message: string }>;

    return rejectWithValue(
      err.response?.data.message || 'Failed to fetch fuel types. Please try again.',
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
      })
      .addCase(fetchFuelTypes.pending, state => {
        state.fetchFuelTypes.isLoading = true;
        state.fetchFuelTypes.error = null;
      })
      .addCase(
        fetchFuelTypes.fulfilled,
        (state, action: PayloadAction<FuelType[]>) => {
          state.fetchFuelTypes.isLoading = false;
          state.fuelTypes = action.payload;
        },
      )
      .addCase(fetchFuelTypes.rejected, (state, action) => {
        state.fetchFuelTypes.isLoading = false;
        state.fetchFuelTypes.error = action.payload ?? 'Unknown error';
      }); 
  },
});

export const { resetStateCar, showingForm, setSelectedCar } = addCarSlice.actions;
export default addCarSlice.reducer;
