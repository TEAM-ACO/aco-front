import _concat from 'lodash/concat';
import _find from 'lodash/concat';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { likePost, loadPosts, reportPost } from '@actions/post';

export interface IArticle {
  articleId: number;
  articleContext: string;
  member: IMember;
  tags: string[];
  visitors: number;
  recomends: number;
  reported: number;
  replys: IReply[];
  articleImagesNames: string[];
}

export interface IMember {
  memberId: number;
  email: string;
  nickname: string;
}

export interface IReply {
  replyId: number;
  replyContext: string[];
  hide: number;
  member: IMember;
}

export interface IArticleState {
  mainPosts: IArticle[];
  hasMorePosts: boolean;
  postAdded: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: unknown | null;
  // requestedPageNumber: number;
  // requestedPageSize: number;
  // responsedPageNumber: number;
  // totalPageSize: number;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: unknown | null;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: unknown | null;
  reportPostLoading: boolean;
  reportPostDone: boolean;
  reportPostError: unknown | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: unknown | null;
}

// Image를 mainPosts 밖으로 빼서 따로 받아야 할까?
export const initialState: IArticleState = {
  mainPosts: [], // 데이터 들어오면 배열로 바꿈
  hasMorePosts: true, // 다음 posts 여부
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  // requestedPageNumber: 0,
  // requestedPageSize: 1,
  // responsedPageNumber: 0,
  // totalPageSize: 0,
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  reportPostLoading: false,
  reportPostDone: false,
  reportPostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  postAdded: false,
};

const postSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {},
  extraReducers: (builder) =>
    builder
      // loadPosts
      .addCase(loadPosts.pending, (state: IArticleState) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state: IArticleState, action: PayloadAction<IArticle>) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        // typescript 어떻게 해야?
        // state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state: IArticleState, action) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.error.message;
      })
      // addPost
      // .addCase(addPost.pending, (state) => {
      //   state.addPostLoading = true;
      //   state.addPostDone = false;
      //   state.addPostError = null;
      // })
      // .addCase(addPost.fulfilled, (state, action) => {
      //   state.addPostLoading = false;
      //   state.addPostDone = true;
      //   state.mainPosts.unshift(action.payload);
      //   // state.articleimage = []; // 이미지 처리 어떻게 할건지 의논
      // })
      // .addCase(addPost.rejected, (state, action) => {
      //   state.addPostLoading = false;
      //   state.addPostError = action.error.message;
      // }),
      // likePost
      .addCase(likePost.pending, (state) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state, action) => {
        // const post = _find(state.mainPosts, { id: action.payload.articleId });
        state.likePostLoading = false;
        state.likePostDone = true;
        // post.Likers.push({ id: action.payload.memberId });
      })
      .addCase(likePost.rejected, (state, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      }),
});

// export const { addPosts, loadPosts } = postSlice.actions;
export default postSlice;
