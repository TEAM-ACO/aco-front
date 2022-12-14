import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import backendURL from '../config/url';
import { TypeAxios } from '@typings/db';
import { IForgotPass } from '@features/userSlice';

const AxiosType: TypeAxios = axios;
axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type LogInRequestData = { email: string; password: string };
export type LogInErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

export type findPasswordEmailRequestData = { email: string };

export type findpassAuthRequestData = { email: string; authNum?: number };

// createSlice의 name이 member입니다.
export const loadMyInfo = createAsyncThunk('member/loadMyInfo', async () => {
  const response = await axios.post('/api/setting/getmember');
  return response.data;
});

export const loadUser = createAsyncThunk('member/loadUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/setting/getmember`);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const login = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/login',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/member/login', data);
      return response.data;
    } catch (error: LogInErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 로그아웃 쿠키만 삭제 이거 필요없음
export const logout = createAsyncThunk('member/logout', async () => {
  try {
    const response = await axios.post('/api/member/logout');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});

// 구글 로그인
export const googleLogin = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/googlelogin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.get('/api/oauth/chrome');
      return response.data;
    } catch (error: LogInErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

// 카카오 로그인
export const kakaoLogin = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/kakaologin',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post('/api/oauth/kakao', data);
      return response.data;
    } catch (error: LogInErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const changeNickname = createAsyncThunk<any, any>('user/changeNickname', async (data, { rejectWithValue }) => {
  try {
    const response = await AxiosType.post('/api/setting/changenickname', data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const changePassword = createAsyncThunk<any, any>('user/changePassword', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await AxiosType.post('/api/setting/changepassword', data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

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
  'user/changeForgotPassword',
  async (data, { rejectWithValue }) => {
    try {
      const response = await AxiosType.post('/api/setting/changefindpassword', data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);
