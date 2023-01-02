import _concat from 'lodash/concat';
import _find from 'lodash/concat';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { addComment, addPost, likePost, loadPosts, loadUserPosts, searchPosts, uploadImages } from '@actions/post';
import { ArticleLoadPosts } from '@typings/db';

export interface IArticle {
  articleId: number;
  articleContext: string;
  articleLike: number;
  member: IMember;
  tags: string[];
  visitors: number;
  reported: number;
  replys: IReply[];
  articleImagesNames: string[];
}

export interface IArticleReply {
  articleId: number;
}

export interface IMember {
  memberId: number;
  email: string;
  nickname: string;
}

export interface IReply {
  replyId: number;
  replyContext: string[];
  replyGroup: number;
  member: IMember;
  totalCount: number;
  replySort: number;
}

export interface IArticleState {
  mainPosts: IArticle[];
  hasMorePosts: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: unknown | null;
  requestedPageNumber: number;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: unknown | null;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  uploadImagesError: unknown | null;
  imagePaths: string[] | null;
  searchPostsLoading: boolean;
  searchPostsDone: boolean;
  searchPostsError: unknown | null;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: unknown | null;
  reportPostLoading: boolean;
  reportPostDone: boolean;
  reportPostError: unknown | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: unknown | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: unknown | null;
}

export const initialState: IArticleState = {
  mainPosts: [],
  hasMorePosts: true,
  loadPostsLoading: false, // post 로드
  loadPostsDone: false,
  loadPostsError: null,
  requestedPageNumber: 0, // 페이지네이션
  addPostLoading: false, // 글쓰기
  addPostDone: false,
  addPostError: null,
  uploadImagesLoading: false, // 이미지첨부
  uploadImagesDone: false,
  uploadImagesError: null,
  imagePaths: null,
  searchPostsLoading: false, // 검색
  searchPostsDone: false,
  searchPostsError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  reportPostLoading: false, // 신고
  reportPostDone: false,
  reportPostError: null,
  likePostLoading: false, // 좋아요
  likePostDone: false,
  likePostError: null,
  addCommentLoading: false, // 댓글 쓰기
  addCommentDone: false,
  addCommentError: null,
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
      .addCase(loadPosts.fulfilled, (state: IArticleState, action: PayloadAction<ArticleLoadPosts>) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 5;
      })
      .addCase(loadPosts.rejected, (state: IArticleState, action: PayloadAction<unknown | null>) => {
        state.loadPostsLoading = false;
        state.loadPostsError = action.payload;
      })
      // addPost
      .addCase(addPost.pending, (state: IArticleState) => {
        state.addPostLoading = true;
        state.addPostDone = false;
        state.addPostError = null;
      })
      .addCase(addPost.fulfilled, (state: IArticleState, action) => {
        state.addPostLoading = false;
        state.addPostDone = true;
        state.mainPosts.unshift(action.payload);
        // state.articleimage = []; // 이미지 처리 어떻게 할건지 의논
      })
      .addCase(addPost.rejected, (state: IArticleState, action) => {
        state.addPostLoading = false;
        state.addPostError = action.error.message;
      })
      // uploadImages
      .addCase(uploadImages.pending, (state: IArticleState) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
        state.uploadImagesError = null;
      })
      .addCase(uploadImages.fulfilled, (state: IArticleState, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
        state.imagePaths = _concat(state.imagePaths, action.payload);
      })
      .addCase(uploadImages.rejected, (state: IArticleState, action) => {
        state.uploadImagesLoading = false;
        state.uploadImagesError = action.error.message;
      })
      // Search
      .addCase(searchPosts.pending, (state: IArticleState) => {
        state.searchPostsLoading = true;
        state.searchPostsDone = false;
        state.searchPostsError = null;
      })
      .addCase(searchPosts.fulfilled, (state: IArticleState, action) => {
        state.searchPostsLoading = false;
        state.searchPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 5;
      })
      .addCase(searchPosts.rejected, (state: IArticleState, action) => {
        state.searchPostsLoading = false;
        state.searchPostsError = action.error.message;
      })
      // // loadUserPosts
      // .addCase(loadUserPosts.pending, (state: IArticleState) => {
      //   state.loadPostsLoading = true;
      //   state.loadPostsDone = false;
      //   state.loadPostsError = null;
      // })
      // .addCase(loadUserPosts.fulfilled, (state: IArticleState, action) => {
      //   state.loadPostsLoading = false;
      //   state.loadPostsDone = true;
      //   state.mainPosts = _concat(state.mainPosts, action.payload);
      //   state.hasMorePosts = action.payload.length === 5;
      // })
      // .addCase(loadUserPosts.rejected, (state: IArticleState, action) => {
      //   state.loadPostsLoading = false;
      //   state.loadPostsError = action.error.message;
      // })
      // likePost
      .addCase(likePost.pending, (state: IArticleState) => {
        state.likePostLoading = true;
        state.likePostDone = false;
        state.likePostError = null;
      })
      .addCase(likePost.fulfilled, (state: any, action: PayloadAction<any>) => {
        const post: any = _find(state.mainPosts, { articleId: action.payload.articleId });
        state.likePostLoading = false;
        state.likePostDone = true;
        post.Liker = action.payload.memberId;
      })
      .addCase(likePost.rejected, (state: IArticleState, action) => {
        state.likePostLoading = false;
        state.likePostError = action.error.message;
      })
      // addComment
      .addCase(addComment.pending, (state: IArticleState) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
        state.addCommentError = null;
      })
      .addCase(addComment.fulfilled, (state: any, action: PayloadAction<IArticleReply>) => {
        const post: any = _find(state.mainPosts, { articleId: action.payload.articleId });
        state.addCommentLoading = false;
        state.addCommentDone = true;
        // post.replys.unshift(action.payload);
        post.replys = _concat(post.replys, action.payload);
      })
      .addCase(addComment.rejected, (state: IArticleState, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      }),
});

// export const { addPosts, loadPosts } = postSlice.actions;
export default postSlice;
