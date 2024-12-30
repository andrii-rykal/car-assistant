import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { LoginData } from '../types';
import { getToken } from '../api/getToken';
import { setToken } from '../api/getTokenStore';

// interface UserType {
//   id: string;
//   name: string;
// }

interface AuthState {
  // user: null | UserType;
  token: null | string;
  isLoading: boolean;
  error: null | string;
}

const initialState: AuthState = {
  // user: null,
  token: null,
  isLoading: false,
  error: null,
};

export const login = createAsyncThunk<
  { token: string },
  LoginData,
  { rejectValue: string }
>('auth/login', async (credentials, { rejectWithValue }) => {
  try {
    const response = await getToken(credentials);
    return response.data;
  } catch (error: unknown) {
    return rejectWithValue((error as Error).message || 'Login failed');
  }
});

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: state => {
      // state.user = null;
      state.token = null;
      setToken(null);
    },
  },
  extraReducers: builder => {
    builder
      .addCase(login.pending, state => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<{ token: string }>) => {
          state.isLoading = false;
          // state.user = action.payload.user;
          state.token = action.payload.token;
          setToken(action.payload.token);
        },
      )
      .addCase(
        login.rejected,
        (state, action: PayloadAction<string | undefined>) => {
          state.isLoading = false;
          state.error = action.payload ?? 'Unknown error';
        },
      );
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
