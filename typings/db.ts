import { IArticle } from '@features/postSlice';
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

export interface IUpdateComment extends IPageNumber {
  article: { articleId: number };
}

export interface IMenu extends IPageNumber {
  menu: string;
  num: number;
}

export interface IAddComment {
  article: { articleId: number };
  member: { memberId: number };
  replyContext: string;
  replyGroup: number;
  replySort: number;
}

export interface ILikePost {
  article: { articleId: number };
  liker: number;
}

export interface ArticleSearch extends IArticle {
  length: number;
  keywords: string;
}

export interface ArticleLoadPosts extends IArticle {
  length: number;
}

export interface Members {
  memberId: number;
  email: string;
  nickname: string;
}

export interface IAdminDelete {
  which: string;
  number: number;
}

export interface IReportMember {
  targetUserId: number;
  reporterUserId: number;
  userReportContext: string | unknown;
}

export interface ChangeNicknameRequest {
  memberId: string;
  nickname: string;
}

export interface ChangePassRequest {
  memberId: string;
  cpassword: string;
  upassword: string;
}

export interface IDeleteComment {
  replyId: number;
  member: { memberId: number };
  article: { articleId: number };
}

export interface IWithdraw {
  memberId: string;
  password: string;
}

export interface IUploadImages {
  memberId: string;
  userimg: string;
  file?: string;
  Blob: Blob;
}

export interface IRandomTip {
  ranTip: string | null;
}
