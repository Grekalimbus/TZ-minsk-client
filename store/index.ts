import {  configureStore } from '@reduxjs/toolkit';
import usersReducer from './usersSlice'
import todosReducer from './todosSlice'
import commentsReducer from './commentsSlice'
import friendsReducer from './friendsSlice'

export function makeStore() {
  return configureStore({
    reducer: {
      users: usersReducer,
      todos: todosReducer,
      comments: commentsReducer,
      friends: friendsReducer
    },
  });
}

export const store = makeStore();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;