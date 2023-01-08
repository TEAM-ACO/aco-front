import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  changeNickname,
  changePassword,
  findPasswordEmail,
  findpassAuthRequest,
  loadMyInfo,
  loadUser,
  login,
  logout,
} from '@actions/user';
import _remove from 'lodash';

export interface IUser {
  email: string;
  password: string;
}

export interface IMe {
  email: string;
  memberid: number;
  nickname: string;
  refresh: string;
  access: string;
}

export interface IAuth {
  auth: number;
}

export interface IUserState {
  me: any; // reponse받으면 me 입력
  auth: number | null;
  userInfo: IMe | null; // 유저 정보
  loadMyInfoLoading: boolean; // 로그인 정보 조회
  loadMyInfoDone: boolean;
  loadMyInfoError: unknown | null;
  loadUserLoading: boolean; // 유저 정보 조회
  loadUserDone: boolean;
  loadUserError: unknown | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: unknown | null;
  logoutLoading: boolean;
  logoutDone: boolean;
  logoutError: unknown | null;
  changeNicknameLoading: boolean; // 닉네임 변경 시도중
  changeNicknameDone: boolean;
  changeNicknameError: unknown | null;
  changePasswordLoading: boolean; // 닉네임 변경 시도중
  changePasswordDone: boolean;
  changePasswordError: unknown | null;
  findpasswordLoading: boolean; // 비밀번호 찾기
  findpasswordDone: boolean;
  findpasswordError: unknown | null;
  findpassAuthLoading: boolean; // 비밀번호 찾기 인증번호
  findpassAuthDone: boolean;
  findpassAuthError: unknown | null;
}

// api연결되면 data안에 넣어 한곳에서 받을 수 있도록합니다.
const initialState: IUserState = {
  me: null, // 내 정보
  userInfo: null, // 유저 정보
  auth: null,

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

  changeNicknameLoading: false, // 닉네임 변경
  changeNicknameDone: false,
  changeNicknameError: null,

  changePasswordLoading: false, // 비밀번호 변경
  changePasswordDone: false,
  changePasswordError: null,

  findpasswordLoading: false, // 비밀번호 찾기
  findpasswordDone: false,
  findpasswordError: null,

  findpassAuthLoading: false, // 비밀번호 찾기 인증번호
  findpassAuthDone: false,
  findpassAuthError: null,
};

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  // 동기는 reducers에 비동기는 extraReducers에 작성합니다.
  extraReducers: (builder) =>
    builder
      // 로그인 유지하려면 서버사이드 렌더링을 해결해야 됨.
      // loadMyInfo
      .addCase(loadMyInfo.pending, (state: IUserState) => {
        state.loadMyInfoLoading = true;
        state.loadMyInfoDone = false;
        state.loadMyInfoError = null;
      })
      .addCase(loadMyInfo.fulfilled, (state: IUserState, action) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoDone = true;
        state.me = action.payload;
      })
      .addCase(loadMyInfo.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.loadMyInfoLoading = false;
        state.loadMyInfoError = action.payload;
      })
      // loadUser
      .addCase(loadUser.pending, (state: IUserState) => {
        state.loadUserLoading = true;
        state.loadUserDone = false;
        state.loadUserError = null;
      })
      .addCase(loadUser.fulfilled, (state: IUserState, action: PayloadAction<IMe>) => {
        state.loadUserLoading = false;
        state.loadUserDone = true;
        state.userInfo = action.payload;
      })
      .addCase(loadUser.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
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
      .addCase(login.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.loginLoading = false;
        state.loginError = action.payload;
      })
      // logout
      .addCase(logout.pending, (state: IUserState) => {
        state.logoutLoading = true;
        state.logoutDone = false;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, (state: IUserState) => {
        state.logoutLoading = false;
        state.logoutDone = true;
        state.me = null;
      })
      .addCase(logout.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.logoutLoading = false;
        state.logoutError = action.payload;
      })
      // changeNickname
      .addCase(changeNickname.pending, (state) => {
        state.changeNicknameLoading = true;
        state.changeNicknameDone = false;
        state.changeNicknameError = null;
      })
      .addCase(changeNickname.fulfilled, (state: IUserState, action: PayloadAction<any>) => {
        state.changeNicknameLoading = false;
        state.changeNicknameDone = true;
        state.me = action.payload.nickname;
      })
      .addCase(changeNickname.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.changeNicknameLoading = false;
        state.changeNicknameError = action.payload;
      })
      // changePassword
      .addCase(changePassword.pending, (state: IUserState) => {
        state.changePasswordLoading = true;
        state.changePasswordDone = false;
        state.changePasswordError = null;
      })
      .addCase(changePassword.fulfilled, (state: IUserState, action: PayloadAction<any>) => {
        state.changePasswordLoading = false;
        state.changePasswordDone = true;
        state.me = action.payload.password;
      })
      .addCase(changePassword.rejected, (state, action) => {
        state.changePasswordLoading = false;
        state.changePasswordError = action.payload;
      })
      // FindPassword
      .addCase(findPasswordEmail.pending, (state: IUserState) => {
        state.findpasswordLoading = true;
        state.findpasswordDone = false;
        state.findpasswordError = null;
      })
      .addCase(findPasswordEmail.fulfilled, (state: IUserState, action) => {
        state.findpasswordLoading = false;
        // state.me = action.payload;
        state.findpasswordDone = true;
      })
      .addCase(findPasswordEmail.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.findpasswordLoading = false;
        state.findpasswordError = action.payload;
      })
      // FindPassword
      .addCase(findpassAuthRequest.pending, (state: IUserState) => {
        state.findpassAuthLoading = true;
        state.findpassAuthDone = false;
        state.findpassAuthError = null;
      })
      .addCase(findpassAuthRequest.fulfilled, (state: IUserState, action: PayloadAction<any>) => {
        state.findpassAuthLoading = false;
        state.auth = action.payload;
        state.findpassAuthDone = true;
      })
      .addCase(findpassAuthRequest.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.findpassAuthLoading = false;
        state.findpassAuthError = action.payload;
      }),
});

export default userSlice;
