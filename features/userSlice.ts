import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface IUser {
  email: string;
  password: string;
}

export interface IUserState {
  value: IUser;
}

const initialState = {
  value: {
    email: '',
    password: '',
  } as IUser,
} as IUserState;

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    login: (state: IUserState, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },

    logout: (state: IUserState) => {
      state.value = initialState.value;
    },
  },
});

export const { login, logout } = userSlice.actions;

export default userSlice.reducer;
