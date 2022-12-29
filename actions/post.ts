import userSlice from '@features/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendURL } from '../config/url';
import { IArticle } from '@features/postSlice';

import { IReply } from '../features/postSlice';

import { TypeAxios } from '@typings/db';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;
const AxiosType: TypeAxios = axios;
// const headers = { 'Content-Type': 'application/json' };

export type addPostRequestData = { content: string };

export type errorMessage = { message: string };

export type reportArticle = {
  articlereporterId: number;
  articleId: number;
  articleReportContext: string | unknown;
};

// export const addPost = createAsyncThunk('post/article', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('/article/wirte', data);
//     thunkAPI.dispatch(userSlice.actions.(response.data.mid));
//     return response.data;
//   } catch (error) {
//     return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
//   }
// });

export const loadPosts = createAsyncThunk<IArticle>('article/loadPosts', async (data, { rejectWithValue }) => {
  try {
    const response: AxiosRequestConfig<any> = await AxiosType.post('/api/article/list', data);
    return response.data;
    // let tmp = [...response.data];
    // let result = Promise.all(
    //   tmp.map(async (v: IArticle) => {
    //     await axios
    //       .post(`/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
    //       .then((res) => {
    //         v.replys = [...res.data];
    //       });
    //     return v;
    //   }),
    // );
    // return result as any;
  } catch (error) {
    console.error(error);
    // return rejectWithValue(error.response.data);
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

// export const loadReplyList = createAsyncThunk<any, any>('article/loadReplyList', async (data, { rejectWithValue }) => {
//   try {
//     const response: AxiosRequestConfig<any> = await AxiosType.post(`/api/article/reply/${data.articleId}`, {
//       requestedPageNumber: 0,
//       requestedPageSize: 5,
//     });
//     return response.data;
//   } catch (error: any) {
//     return rejectWithValue(error.response.data);
//   }
// });

// 신고
export const reportPost = createAsyncThunk<reportArticle, reportArticle>(
  'article/reportPost',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/report/article`, { ...data });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const likePost = createAsyncThunk('article/likePost', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await axios.post(`/api/like`, { data });
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});
