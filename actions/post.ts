import userSlice from '@features/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendURL } from '../config/url';
import { IArticle } from '@features/postSlice';
import { TypeAxios } from '@typings/db';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
axios.defaults.withCredentials = true;
const AxiosType: TypeAxios = axios;
// const headers = { 'Content-Type': 'application/json' };

export type addPostRequestData = { content: string };

export type errorMessage = { message: string };

export type reportArticle = {
  articlereporterId : number,
  articleId : number,
  articleReportContext : string | unknown
}

// export const addPost = createAsyncThunk('post/article', async (data, thunkAPI) => {
//   try {
//     const response = await axios.post('/article', data);
//     thunkAPI.dispatch(userSlice.actions. /*내게 보일 post*/(response.data.mid));
//     return response.data;
//   } catch (error: addPostErrorData) {
//     return thunkAPI.rejectWithValue(error.response.data);
//   }
// });


export const loadPosts = createAsyncThunk<IArticle>('article/loadPosts', async (data, { rejectWithValue }) => {
  const body = {
    requestedPageNumber: 0,
    requestedPageSize: 1,
  };
  try {
    const response = await AxiosType.post<IArticle, AxiosResponse<IArticle>>('/api/article/list', body);
    console.log(response.data);
    return response.data;
  } catch (error) {
    if (AxiosType.isAxiosError(error)) {
      console.error((error as AxiosError).response?.data);
    }
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

// export const loadPosts = createAsyncThunk(
//   'article/loadPosts',
//   async (data: any) => {
//     const response = await axios.post('/api/article/list', data);
//     return response.data;
//   },
//   {
//     condition: (data, { getState }): boolean | Promise<boolean> => {
//       const { article } = getState();

//       if (article.loadPostsLoading) {
//         // console.warn('중복 요청 취소');
//         return false;
//       }
//       return true;
//     },
//   },
// );

// 신고

export const reportPost = createAsyncThunk<reportArticle, reportArticle>('article/reportPost', async (data, { rejectWithValue }) => {

  try {
    const response = await axios.post(`/api/report/article`, {...data});
    return response.data;

  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);

  }
});

export const likePost = createAsyncThunk('article/likePost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/article/${data}/like`);
    return response.data;

  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);

  }
});
