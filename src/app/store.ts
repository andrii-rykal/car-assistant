import { configureStore } from '@reduxjs/toolkit';
// import countReducer from '../features/count';
import authReducer from '../features/authSlice';

export const store = configureStore({
  reducer: {
    // count: countReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
