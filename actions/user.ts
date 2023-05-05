import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import backendURL from '../config/url';
import { ChangeNicknameRequest, ChangePassRequest, IWithdraw, TypeAxios } from '@typings/db';
import { IForgotPass, IUser } from '@features/userSlice';
import { signupRequestData } from './signup';

const AxiosType: TypeAxios = axios;
axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
// axios.defaults.withCredentials = true;

export type LogInRequestData = { email: string; password: string };

export type findPasswordEmailRequestData = { email: string };

export type findpassAuthRequestData = { email: string; authNum?: number; };

// 로그인
export const login = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/login', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 구글 로그인
export const googleLogin = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/googlelogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/oauth/chrome', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 카카오 로그인
export const kakaoLogin = createAsyncThunk<LogInRequestData, signupRequestData>(
  'member/kakaologin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/oauth/kakao', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const changeNickname = createAsyncThunk<ChangeNicknameRequest, ChangeNicknameRequest>(
  'user/changeNickname',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/setting/changenickname', data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const changePassword = createAsyncThunk<ChangePassRequest, ChangePassRequest>(
  'user/changePassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/setting/changepassword', data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const findPasswordEmail = createAsyncThunk<findPasswordEmailRequestData, findPasswordEmailRequestData>(
  'member/findpasswordemail',
  async (data, { rejectWithValue }) => {
    try {
      const check = await AxiosType.post('/api/member/signup/emailcheck', data);
      if (check.data === false) {
        alert('존재하지 않는 이메일입니다.');
        return;
      } else {
        try {
          const response = await axios.post('/api/member/emailauth', data);
          alert('이메일이 발송되었습니다.');
          return response.data;
        } catch (error) {
          alert('이메일 발송에 실패했습니다.');
          console.error(error);
          return rejectWithValue((error as AxiosError).response?.data);
        }
      }
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const findpassAuthRequest = createAsyncThunk<findpassAuthRequestData, findpassAuthRequestData>(
  'member/findpassAuthRequest',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/forgotpassemailverify', data);
      return response.data;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const changeForgotPassword = createAsyncThunk<any, IForgotPass>(
  'member/changeForgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosType.post('/api/setting/changefindpassword', data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const userWithdraw = createAsyncThunk<IUser, IWithdraw>(
  'member/userWithdraw',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/resign', data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
