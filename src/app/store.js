import { configureStore } from '@reduxjs/toolkit';

import authReducer from '../slices/auth';
import messageReducer from '../slices/message';
import avatarReducer from '../slices/avatar';

const reducer = {
  auth: authReducer,
  message: messageReducer,
  avatar: avatarReducer,
}

export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

