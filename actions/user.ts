import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reducer } from 'redux';
import backendURL from '../url';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type LogInRequestData = { email: string; password: string };
export type LogInErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

export const login = createAsyncThunk('member/login', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/member/login', data);
    return response.data;
  } catch (error: LogInErrorData) {
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('member/logout', async () => {
  const response = await axios.post('/member/logout');
  return response.data;
});

export default {
  login,
  logout,
};
