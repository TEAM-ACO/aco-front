import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action, ThunkDispatch, combineReducers, configureStore } from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';

import userReducer from '../features/userSlice';
import postReducer from '../features/postSlice';
import signupReducer from '../features/signupSlice';

export interface ReducerStates {}

const logger = createLogger();

const rootReducer = combineReducers({
  user: userReducer.reducer,
  post: postReducer.reducer,
  signup: signupReducer.reducer,
});

// const initialState = {};

// store는 state와 reducer를 포함한다고 볼 것.
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
  devTools: process.env.NODE_ENV !== 'production',
  //   preloadedState: initialState,
  enhancers: (defaultEnhancers) => [...defaultEnhancers],
});

// const wrapper = createWrapper(() => store);
// export default wrapper;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export default store;
