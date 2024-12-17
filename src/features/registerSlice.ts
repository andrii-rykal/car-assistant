import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegistrationData } from '../types';
import { createUser } from '../api/createUser';
import { AxiosError } from 'axios';

// const BASE_URL = 'https://car-assistant-app-production.up.railway.app/api'

interface RegistrationState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegistrationState = {
  isLoading: false,
  error: null,
  success: false,
};

export const registerUser = createAsyncThunk<
  void,
  RegistrationData,
  { rejectValue: string }
  >(
  'registration/registerUser',
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      await createUser(userData);
    } catch (error: unknown) {
      const err = error as AxiosError<{ message: string }>;

      return rejectWithValue(err.response?.data?.message || 'Registration failed. Please try again.');
    }
  },
);

const registerSlice = createSlice({
  name: 'registration',
  initialState,
  reducers: {
    resetState: state => {
      state.isLoading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, state => {
        state.isLoading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
