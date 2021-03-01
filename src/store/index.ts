import { configureStore } from '@reduxjs/toolkit';
import userReducer from './reducers/usersSlice';

export const store = configureStore({
  reducer: {
    user: userReducer,
  },
});
