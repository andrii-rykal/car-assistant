import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { RegistrationData } from '../types';

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

export const registerUser = createAsyncThunk(
  'registration/registerUser',
  async (userData: RegistrationData, { rejectWithValue }) => {
    try {
      const response = await fetch('api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });

      if (!response.ok) {
        throw new Error('Registration failed. Please try again.');
      }

      return await response.json();
    } catch (error: unknown) {
      return rejectWithValue((error as Error).message);
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
