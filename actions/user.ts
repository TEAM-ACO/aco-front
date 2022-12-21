import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reducer } from 'redux';
import backendURL from '../config/url';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type LogInRequestData = { email: string; password: string };
export type LogInErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

// createSlice의 name이 member입니다.
export const loadMyInfo = createAsyncThunk('member/loadMyInfo', async () => {
  // Api - SpringBoot의 Controller와 맞추시면 됩니다.
  const response = await axios.get('/member');
  return response.data;
});

export const loadUser = createAsyncThunk('member/loadUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/member/${data}`);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

// 인증이 되었다면 비밀번호 변경 페이지로 갈 것.
export const findPassword = createAsyncThunk('member/findpassword', async (data, { rejectWithValue }) => {
  console.log('=============>', data);
  try {
    const response = await axios.post('/api/setting/findpassword', data);
    console.log('발송완료');
    return response.data;
  } catch (error: any) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk<LogInRequestData, LogInRequestData>(
  'member/login',
  async (data, { rejectWithValue }) => {
    console.log('=============>', data);
    try {
      const response = await axios.post('/api/member/login', data);
      return response.data;
    } catch (error: LogInErrorData) {
      console.error(error);
      return rejectWithValue(error.response.data);
    }
  },
);

export const logout = createAsyncThunk('member/logout', async () => {
  try {
    const response = await axios.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
