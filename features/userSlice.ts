import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  changeForgotPassword,
  changeNickname,
  changePassword,
  findPasswordEmail,
  findpassAuthRequest,
  googleLogin,
  kakaoLogin,
  login,
  userWithdraw,
} from '@actions/user';
import _remove from 'lodash';
import { ChangeNicknameRequest, ChangePassRequest } from '@typings/db';

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

export interface IForgotPass {
  upassword: string;
  email: string;
}

export interface IUserState {
  me: any; // reponse받으면 me 입력
  auth: number | null;
  userInfo: IMe | null; // 유저 정보
  loadUserLoading: boolean; // 유저 정보 조회
  loadUserDone: boolean;
  loadUserError: unknown | null;
  loginLoading: boolean;
  loginDone: boolean;
  loginError: unknown | null;

  googleLoginLoading: boolean;
  googleLoginDone: boolean;
  googleLoginError: unknown | null;
  kakaoLoginLoading: boolean;
  kakaoLoginDone: boolean;
  kakaoLoginError: unknown | null;
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
  changeForgotPasswordLoading: boolean; // 비밀번호 찾기 비번 변경
  changeForgotPasswordDone: boolean;
  changeForgotPasswordError: unknown | null;
  userWithdrawLoading: boolean; // 회원탈퇴
  userWithdrawDone: boolean;
  userWithdrawError: unknown | null;
}

// api연결되면 data안에 넣어 한곳에서 받을 수 있도록합니다.
const initialState: IUserState = {
  me: null, // 내 정보
  userInfo: null, // 유저 정보
  auth: null,

  loadUserLoading: false, // 유저 정보 조회
  loadUserDone: false,
  loadUserError: null,

  loginLoading: false, // 로그인
  loginDone: false,
  loginError: null,

  googleLoginLoading: false, // 구글 로그인
  googleLoginDone: false,
  googleLoginError: null,

  kakaoLoginLoading: false, // 구글 로그인
  kakaoLoginDone: false,
  kakaoLoginError: null,

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

  changeForgotPasswordLoading: false, // 비밀번호 찾기 비번 변경
  changeForgotPasswordDone: false,
  changeForgotPasswordError: null,

  userWithdrawLoading: false, // 회원탈퇴
  userWithdrawDone: false,
  userWithdrawError: null,
};

const userSlice = createSlice({
  name: 'member',
  initialState,
  reducers: {},
  // 동기는 reducers에 비동기는 extraReducers에 작성합니다.
  extraReducers: (builder) =>
    builder
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
      // Google login
      .addCase(googleLogin.pending, (state: IUserState) => {
        state.googleLoginLoading = true;
        state.googleLoginDone = false;
        state.googleLoginError = null;
      })
      .addCase(googleLogin.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
        state.googleLoginLoading = false;
        state.me = action.payload;
        state.googleLoginDone = true;
      })
      .addCase(googleLogin.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.googleLoginLoading = false;
        state.googleLoginError = action.payload;
      })
      // Kakao login
      .addCase(kakaoLogin.pending, (state: IUserState) => {
        state.kakaoLoginLoading = true;
        state.kakaoLoginDone = false;
        state.kakaoLoginError = null;
      })
      .addCase(kakaoLogin.fulfilled, (state: IUserState, action: PayloadAction<IUser>) => {
        state.kakaoLoginLoading = false;
        state.me = action.payload;
        state.kakaoLoginDone = true;
      })
      .addCase(kakaoLogin.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.kakaoLoginLoading = false;
        state.kakaoLoginError = action.payload;
      })
      // changeNickname
      .addCase(changeNickname.pending, (state: IUserState) => {
        state.changeNicknameLoading = true;
        state.changeNicknameDone = false;
        state.changeNicknameError = null;
      })
      .addCase(changeNickname.fulfilled, (state: IUserState, action: PayloadAction<ChangeNicknameRequest>) => {
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
      .addCase(changePassword.fulfilled, (state: IUserState, action: PayloadAction<ChangePassRequest>) => {
        state.changePasswordLoading = false;
        state.changePasswordDone = true;
        state.me = action.payload.upassword;
      })
      .addCase(changePassword.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.changePasswordLoading = false;
        state.changePasswordError = action.payload;
      })
      // FindPassword
      .addCase(findPasswordEmail.pending, (state: IUserState) => {
        state.findpasswordLoading = true;
        state.findpasswordDone = false;
        state.findpasswordError = null;
      })
      .addCase(findPasswordEmail.fulfilled, (state: IUserState) => {
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
      })
      // changeForgotPassword
      .addCase(changeForgotPassword.pending, (state: IUserState) => {
        state.changeForgotPasswordLoading = true;
        state.changeForgotPasswordDone = false;
        state.changeForgotPasswordError = null;
      })
      .addCase(changeForgotPassword.fulfilled, (state: IUserState) => {
        state.changeForgotPasswordLoading = false;
        state.changeForgotPasswordDone = true;
      })
      .addCase(changeForgotPassword.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.changeForgotPasswordLoading = false;
        state.changeForgotPasswordError = action.payload;
      })
      // userWithdraw
      .addCase(userWithdraw.pending, (state: IUserState) => {
        state.userWithdrawLoading = true;
        state.userWithdrawDone = false;
        state.userWithdrawError = null;
      })
      .addCase(userWithdraw.fulfilled, (state: IUserState) => {
        state.userWithdrawLoading = false;
        state.userWithdrawDone = true;
      })
      .addCase(userWithdraw.rejected, (state: IUserState, action: PayloadAction<unknown | null>) => {
        state.userWithdrawLoading = false;
        state.userWithdrawError = action.payload;
      }),
});

export default userSlice;
