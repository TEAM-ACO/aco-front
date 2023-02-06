import { createAsyncThunk } from '@reduxjs/toolkit';
import axios, { AxiosError, AxiosRequestConfig } from 'axios';
import { backendURL } from '../config/url';
import { IArticle } from '@features/postSlice';
import {
  ArticleLoadPosts,
  ArticleSearch,
  IAddComment,
  ILikePost,
  IMenu,
  IPageNumber,
  ISearchPosts,
  IUpdateComment,
  IloadUserPosts,
  TypeAxios,
  IReportMember,
  IDeleteComment,
  IRandomTip,
} from '@typings/db';

axios.defaults.baseURL = backendURL;
// 프론트 - 백 쿠키공유
// axios.defaults.withCredentials = true;
const AxiosType: TypeAxios = axios;
// const headers = { 'Content-Type': 'application/json' };

export type addPostRequestData = { content: string };

export type errorMessage = { message: string };

export type articleId = { articleId: number };

export type reportArticle = {
  articlereporterId: number;
  articleId: number;
  articleReportContext: string | unknown;
};

export const addPost = createAsyncThunk<FormData, any>('article/addPost', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/api/article/write', data, {
      headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
    });
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

export const uploadImages = createAsyncThunk<FormData, any>(
  'article/uploadImages',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/setting/changeuserimg`, data, {
        headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

export const loadInitPosts = createAsyncThunk<ArticleLoadPosts, IPageNumber | undefined>(
  'article/loadInitPosts',
  async (data, { rejectWithValue }) => {
    try {
      const response: AxiosRequestConfig<any> = await AxiosType.post(`http://acoapi.hyns.co.kr/api/article/list`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`http://acoapi.hyns.co.kr/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
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
);

export const loadPosts = createAsyncThunk<ArticleLoadPosts, IPageNumber | undefined>(
  'article/loadPosts',
  async (data, { rejectWithValue }) => {
    try {
      const response: AxiosRequestConfig<any> = await AxiosType.post(`/api/article/list`, data);
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
);

// 검색
export const searchPosts = createAsyncThunk<ArticleSearch, ISearchPosts>(
  'article/searchPosts',
  async (data, { rejectWithValue }) => {
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

// 검색 SSR용
export const searchInitPosts = createAsyncThunk<ArticleSearch, ISearchPosts>(
  'article/searchInitPosts',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://acoapi.hyns.co.kr/api/article/search/${data.keywords}`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`http://acoapi.hyns.co.kr/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
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

// 각 user의 게시글 SSR용
export const loadUserInitPosts = createAsyncThunk<IArticle, IloadUserPosts>(
  'article/loadUserInitPosts',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`http://acoapi.hyns.co.kr/api/article/list/${data.memberId}`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`http://acoapi.hyns.co.kr/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
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

// 게시글 신고
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

// 멤버 신고
export const reportMember = createAsyncThunk<IArticle, IReportMember>(
  'article/reportMember',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/report/member`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 좋아요
export const likePost = createAsyncThunk<IArticle, ILikePost>('article/likePost', async (data, { rejectWithValue }) => {
  console.log(data);
  try {
    const response = await axios.post(`/api/like`, data);
    return response.data;
  } catch (error) {
    console.error(error);
    return rejectWithValue((error as AxiosError).response?.data);
  }
});

// 댓글쓰기
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

// 댓글 삭제 후 업데이트
export const UpdateDeleteComment = createAsyncThunk<IArticle, IUpdateComment>(
  'article/reply/updateDeleteComment',
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

// 각 메뉴별 게시글
export const loadMenu = createAsyncThunk<IArticle, IMenu | undefined>(
  'article/postMenu',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/article/menu/${data?.num}`, data);
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

// 각 메뉴별 게시글 SSR용
export const loadInitMenu = createAsyncThunk<IArticle, IMenu | undefined>(
  'article/loadInitMenu',
  async (data, { rejectWithValue }) => {
    try {
      const response = await axios.post(`http://acoapi.hyns.co.kr/api/article/menu/${data?.num}`, data);
      let tmp = [...response.data];
      let result = Promise.all(
        tmp.map(async (v: IArticle) => {
          await axios
            .post(`http://acoapi.hyns.co.kr/api/article/reply/${v.articleId}`, { requestedPageNumber: 0, requestedPageSize: 5 })
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

// 게시글 수정
export const editPost = createAsyncThunk<IArticle, FormData>(
  'article/editPost',
  async (data: FormData, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/article/modify`, data, {
        headers: { 'Content-Type': 'multipart/form-data;charset=UTF-8' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 게시글 삭제
export const deletePost = createAsyncThunk<IArticle, articleId>(
  'article/deletePost',
  async (data, { rejectWithValue }) => {
    // console.log(data);
    try {
      const response = await axios.post(`/api/article/delete`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// 댓글 삭제
export const deleteComment = createAsyncThunk<IArticle, IDeleteComment>(
  'article/deleteComment',
  async (data, { rejectWithValue }) => {
    console.log(data);
    try {
      const response = await axios.post(`/api/article/reply/delete`, data);
      return response.data;
    } catch (error) {
      return rejectWithValue((error as AxiosError).response?.data);
    }
  },
);

// Tip랜덤 생성
export const randomTip = createAsyncThunk<IRandomTip>('article/randomTip', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.get(`api/article/random`);
    return response.data;
  } catch (error) {
    return rejectWithValue((error as AxiosError).response?.data);
  }
});
