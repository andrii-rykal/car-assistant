import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/authSlice';
import registerReducer from '../features/registerSlice';
import addCarReducer from '../features/addCarSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    registration: registerReducer,
    addCar: addCarReducer,
  },
});

// export type RootState = ReturnType<typeof store.getState>;
// export type AppDispatch = typeof store.dispatch;
