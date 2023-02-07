import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import {
  Action,
  AnyAction,
  CombinedState,
  Reducer,
  ThunkDispatch,
  combineReducers,
  configureStore,
} from '@reduxjs/toolkit';
import { HYDRATE, createWrapper } from 'next-redux-wrapper';
import { createLogger } from 'redux-logger';

import userReducer, { IUserState } from '../features/userSlice';
import postReducer, { IArticleState } from '../features/postSlice';
import signupReducer, { ISignupState } from '../features/signupSlice';
import adminReducer, { IAdminState } from '../features/adminSlice';

const isDev = process.env.NODE_ENV === 'development';
const logger = createLogger();

export interface IState {
  user: IUserState;
  post: IArticleState;
  signup: ISignupState;
  admin: IAdminState;
}

const rootReducer = (state: IState, action: AnyAction): CombinedState<IState> => {
  switch (action.type) {
    case HYDRATE:
      return {
        ...state,
        ...action.payload,
      };
    default: {
      const combinedReducer = combineReducers({
        user: userReducer.reducer,
        post: postReducer.reducer,
        signup: signupReducer.reducer,
        admin: adminReducer.reducer,
      });
      return combinedReducer(state, action);
    }
  }
};

const makeStore = () => {
  // store는 state와 reducer를 포함한다고 볼 것.
  const store = configureStore({
    reducer: rootReducer as Reducer<IState, AnyAction>,
    // middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
    devTools: isDev,
  });
  return store;
};

export type AppStore = ReturnType<typeof makeStore>;
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = AppStore['dispatch'];

export type ThunkAppDispatch = ThunkDispatch<RootState, void, Action>;
export const useAppThunkDispatch = () => useDispatch<ThunkAppDispatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch = () => useDispatch<AppDispatch>();

export const wrapper = createWrapper<AppStore>(makeStore, {
  debug: isDev,
  serializeState: (state) => JSON.stringify(state),
  deserializeState: (state) => JSON.parse(state),
});

export default wrapper;
