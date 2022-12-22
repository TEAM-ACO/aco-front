import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { findPassword, loadMyInfo, loadUser, login, logout } from '@actions/user';

export interface IUser {
  email: string;
  password: string;
}

export interface IUserState {
  me: any; // reponse받으면 me 입력
  value: IUser;
  userInfo: any | null; // 유저 정보
  loadMyInfoLoading: boolean; // 로그인 정보 조회
  loadMyInfoDone: boolean;
  loadMyInfoError: any | null;
  loadUserLoading: boolean; // 유저 정보 조회
  loadUserDone: boolean;
  loadUserError: any | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: any | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: any;
  findpasswordLoading: boolean; // 비밀번호 찾기
  findpasswordDone: boolean;
  findpasswordError: any | null;
}

// api연결되면 data안에 넣어 한곳에서 받을 수 있도록합니다.
const initialState = {
  me: null, // 내 정보
  userInfo: null, // 유저 정보

  loadMyInfoLoading: false, // 로그인 정보 조회
  loadMyInfoDone: false,
  loadMyInfoError: null,

  loadUserLoading: false, // 유저 정보 조회
  loadUserDone: false,
  loadUserError: null,

  loginLoading: false, // 로그인
  loginDone: false,
  loginError: null,

  logoutLoading: false, // 로그아웃
  logoutDone: false,
  logoutError: null,

  findpasswordLoading: false, // 비밀번호 찾기
  findpasswordDone: false,
  findpasswordError: null,
} as IUserState;

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  // 동기는 reducers에 비동기는 extraReducers에 작성합니다.
  extraReducers: (builder) =>
    builder
      // 로그인 유지하려면 서버사이드 렌더링을 해결해야 됨.
      // loadMyInfo, loadUser는 나중에 쓸 것.
      // loadMyInfo
      .addCase(loadMyInfo.pending, (state) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.payload;
      })
      // loadUser
      .addCase(loadUser.pending, (state) => {
        state.loadUserLoading = true;
        state.loadUserDone = false;
        state.loadUserError = null;
      })
      .addCase(loadUser.fulfilled, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserDone = true;
        state.userInfo = action.payload;
      })
      .addCase(loadUser.rejected, (state, action) => {
        state.loadUserLoading = false;
        state.loadUserError = action.payload;
      })
      // login
      .addCase(login.pending, (state: IUserState) => {
        state.loginLoading = true;
        state.loginDone = false;
        state.loginError = null;
      })
      .addCase(login.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
        state.loginLoading = false;
        state.me = action.payload;
        state.loginDone = true;
      })
      .addCase(login.rejected, (state: IUserState, action) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // logout
      .addCase(logout.pending, (state) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.me = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      })
      // FindPassword
      .addCase(findPassword.pending, (state) => {
        state.findpasswordLoading = true;
        state.findpasswordDone = false;
        state.findpasswordError = null;
      })
      .addCase(findPassword.fulfilled, (state, action) => {
        state.findpasswordLoading = false;
        state.me = action.payload;
        state.findpasswordDone = true;
      })
      .addCase(findPassword.rejected, (state, action) => {
        state.findpasswordLoading = false;
        state.findpasswordError = action.payload;
      }),
});

export default userSlice;
