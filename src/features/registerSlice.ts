import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegistrationData, UserResponse } from '../types';
import { createUser } from '../api/createUser';
import { AxiosError } from 'axios';

interface RegistrationState {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  user: UserResponse | null;
}

const initialState: RegistrationState = {
  isLoading: false,
  error: null,
  success: false,
  user: null,
};

export const registerUser = createAsyncThunk<
  UserResponse,
  RegistrationData,
  { rejectValue: string }
  >(
  'registration/registerUser',
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      const response = await createUser(userData);
      return response.data;
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
      state.user = null;
    },
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.isLoading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.success = true;
        state.user = action.payload;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload as string;
      });
  },
});

export const { resetState } = registerSlice.actions;
export default registerSlice.reducer;
