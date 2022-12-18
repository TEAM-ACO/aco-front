import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { Reducer } from 'redux';
import backendURL from '../config/url';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type LogInRequestData = { email: string; password: string };
export type LogInErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

export const loadMyInfo = createAsyncThunk('member/loadMyInfo', async () => {
  const response = await axios.get('/user');
  return response.data;
});

export const loadUser = createAsyncThunk('member/loadUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`/user/${data}`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const login = createAsyncThunk<LogInRequestData>('member/login', async (data, { rejectWithValue }) => {
  console.log('=============>', data);
  try {
    const response = await axios.post('/api/login', data);
    return response.data;
  } catch (error: LogInErrorData) {
    console.error(error);
    return rejectWithValue(error.response.data);
  }
});

export const logout = createAsyncThunk('member/logout', async () => {
  try {
    const response = await axios.post('/api/logout');
    return response.data;
  } catch (error) {
    console.error(error);
  }
});
