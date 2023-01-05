import userSlice from '@features/userSlice';
import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { backendURL } from '../config/url';
import { IArticle } from '@features/postSlice';
import {
  ArticleLoadPosts,
  ArticleSearch,
  IAddComment,
  ILikePost,
  IPageNumber,
  ISearchPosts,
  IUpdateComment,
  IloadUserPosts,
  TypeAxios,
} from '@typings/db';

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

// write부분의 Menu가 뭔지..
export const addPost = createAsyncThunk<FormData, any>('article/addPost', async (data, thunkAPI) => {
  const headerForMulti = { 'Content-Type': 'multipart/form-data;charset=UTF-8' };
  try {
    const response = await axios.post('/api/article/write', data ,{headers:{"Content-Type": "multipart/form-data"}});
    // thunkAPI.dispatch(userSlice.actions.addPostToMe(response.data.memberId));
    return response.data;
  } catch (error) {
    return thunkAPI.rejectWithValue((error as AxiosError).response?.data);
  }
});

export const uploadImages = createAsyncThunk('article/uploadImages', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post(`/api/image/images${data}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const loadPosts = createAsyncThunk<ArticleLoadPosts, IPageNumber | undefined>(
  'article/loadPosts',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response: AxiosRequestConfig<any> = await AxiosType.post('/api/article/list', data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
            .then((res) => {
              v.replys = [...res.data];
            });
          return v;
        }),
      );
      return result as any;
    } catch (error) {
      console.error(error);
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
  // {
  //   condition: (data, { getState }) => {
  //     const { post } = getState();

  //     if (post.loadPostsLoading) {
  //       // console.warn('중복 요청 취소');
  //       return false;
  //     }
  //     return true;
  //   },
  // }
);

// 검색
export const searchPosts = createAsyncThunk<ArticleSearch, ISearchPosts>(
  'article/searchPosts',
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const response = await axios.post(`/api/article/search/${data.keywords}`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
            .then((res) => {
              v.replys = [...res.data];
            });
          return v;
        }),
      );
      return result as any;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 각 user의 게시글
export const loadUserPosts = createAsyncThunk<IArticle, IloadUserPosts>(
  'article/loadUserPosts',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/article/list/${data.memberId}`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
            .then((res) => {
              v.replys = [...res.data];
            });
          return v;
        }),
      );
      return result as any;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

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

export const likePost = createAsyncThunk<IArticle, ILikePost>('article/likePost', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await axios.post(`/api/article/like`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const addComment = createAsyncThunk<IArticle, IAddComment>(
  'article/addComment',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/article/reply/write`, data);
      if (response.data) {
        const result = await axios.post(`/api/article/reply/${data.article.articleId}`, {
          requestedPageNumber: 0,
          requestedPageSize: data.replyGroup + 5,
        });
        return { articleId: data.article.articleId, replys: result.data };
      } else {
        return [] as any;
      }
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 댓글 업데이트
export const updateComment = createAsyncThunk<IArticle, IUpdateComment>(
  'article/reply/updateComment',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/article/reply/${data.article.articleId}`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const loadMenu = createAsyncThunk<IArticle, IArticle>('article/postMenu', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await axios.post(`/api/article/menu/${data.menu}`, data);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});
