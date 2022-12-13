import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { login, logout } from '@actions/user';

interface IUser {
  email: string;
  password: string;
}

export interface IUserState {
  value: IUser;
}

// api연결되면 data안에 넣어 한곳에서 받을 수 있도록한다.
const initialState = {
  // me: null, // 내 정보
  // loginLoading: false, // 로그인 시도중
  // loginDone: false,
  // loginError: null,
  // logoutLoading: false, // 로그아웃 시도중
  // logoutDone: false,
  // logoutError: null,
  value: {
    email: '',
    password: '',
  } as IUser,
} as IUserState;

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {
    login: (state: IUserState, action: PayloadAction<IUser>) => {
      state.value = action.payload;
    },

    logout: (state: IUserState) => {
      state.value = initialState.value;
    },
  },
  // extraReducers: (builder) =>
  //   builder
  //     // login
  //     .addCase(login.pending, (state) => {
  //       state.loginLoading = true;
  //       state.loginDone = false;
  //       state.loginError = null;
  //     })
  //     .addCase(login.fulfilled, (state, action) => {
  //       state.loginLoading = false;
  //       state.me = action.payload;
  //       state.loginDone = true;
  //     })
  //     .addCase(login.rejected, (state, action) => {
  //       state.loginLoading = false;
  //       state.loginError = action.payload;
  //     })
  //     // logout
  //     .addCase(logout.pending, (state) => {
  //       state.logoutLoading = true;
  //       state.logoutDone = false;
  //       state.logoutError = null;
  //     })
  //     .addCase(logout.fulfilled, (state) => {
  //       state.logoutLoading = false;
  //       state.logoutDone = true;
  //       state.me = null;
  //     })
  //     .addCase(logout.rejected, (state, action) => {
  //       state.logoutLoading = false;
  //       state.logoutError = action.payload;
  //     }),
});

// export const { login, logout } = userSlice.actions;
// export default userSlice.reducer;

export default userSlice;
