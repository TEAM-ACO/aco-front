import userSlice from '@features/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { backendURL } from '../config/url';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;

export type addPostRequestData = { content: string };
export type addPostErrorData = any; // 에러 메세지 어떻게 보낼건지에 따라 바꿈

export type loadPostRequestData = { content: string };
export type loadPostErrorData = any;

// export const addPost = createAsyncThunk('post/article', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('/article', data);
//     thunkAPI.dispatch(userSlice.actions. /*내게 보일 post*/(response.data.mid));
//     return response.data;
//   } catch (error: addPostErrorData) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });

export const loadPosts = createAsyncThunk<any, any>('post/loadPosts', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`api/article/list`, data);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    return rejectWithValue(error.response.data);
  }
});

export const reportPost = createAsyncThunk('post/reportPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/article/report`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});

export const likePost = createAsyncThunk('post/likePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/article/${data}/like`);
    return response.data;
  } catch (error) {
    return rejectWithValue(error.response.data);
  }
});
