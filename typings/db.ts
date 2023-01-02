import { AxiosError, AxiosResponse } from 'axios';

export interface Config<D = any> {
  method?: 'post' | 'get' | 'put' | 'patch' | 'delete' | 'head' | 'options';
  url?: string;
  data?: D;
}
export interface TypeAxios {
  // await붙는 애들은 return이 Promise
  get: <T, R = AxiosResponse<T>>(url: string) => Promise<R>;
  post: <T, R = AxiosResponse<T>, D = any>(url: string, data: D) => Promise<R>;
  isAxiosError: (error: unknown) => error is AxiosError;
  (config: Config): void;
  (url: string, config: Config): void;
}

export interface IPageNumber {
  requestedPageNumber: number;
  requestedPageSize: number;
}

export interface IloadUserPosts extends IPageNumber {
  memberId: string | string[];
}

export interface ISearchPosts extends IPageNumber {
  keywords: string | string[];
}

export interface IAddComment {
  articleId: number;
  memberId: number;
  replyContext: string;
}

export interface ILikePost {
  articleId: number;
  liked: boolean;
  liker: number;
}
