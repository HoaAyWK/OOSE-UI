import { configureStore } from '@reduxjs/toolkit';
import { combineReducers } from 'redux'
import authReducer from '../slices/auth';
import messageReducer from '../slices/message';
import avatarReducer from '../slices/avatar';
import userReducer from '../slices/users/userReducer';
import postReducer from '../slices/posts/postRecuder';
import categoryReducer from '../slices/categories/categoryReducer';

const reducer = combineReducers({
  auth: authReducer,
  message: messageReducer,
  avatar: avatarReducer,
  users: userReducer,
  jobs: postReducer,
  categoriesJob: categoryReducer,
})


export const store = configureStore({
  reducer: reducer,
  devTools: true,
});

