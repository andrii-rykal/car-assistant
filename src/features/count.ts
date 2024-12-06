import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
  count: number;
  history: number[];
}

const initialState: CounterState = {
  count: 0,
  history: [],
};

export const counterSlice = createSlice({
  name: 'count',
  initialState,
  reducers: {
    addCount: (state, action: PayloadAction<number>) => {
      state.count += action.payload;
    },
    history: state => {
      state.history.push(state.count);
    },
  },
});

export const { addCount, history } = counterSlice.actions;
export default counterSlice.reducer;
