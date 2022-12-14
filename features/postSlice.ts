import _concat from 'lodash/concat';
import _find from 'lodash/concat';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  addComment,
  addPost,
  deletePost,
  editPost,
  likePost,
  loadMenu,
  loadPosts,
  loadUserPosts,
  reportMember,
  searchPosts,
  updateComment,
  uploadImages,
} from '@actions/post';
import { ArticleLoadPosts } from '@typings/db';
import _filter from 'lodash/concat';

export interface IArticle {
  articleId: number;
  articleContext: string;
  likes: number;
  menu: string;
  member: IMember;
  tags: string[];
  visitors: number;
  reported: number;
  date: string;
  replys: IReply[];
  articleImagesNames: string[];
}

export interface IArticleReply {
  articleId: number;
  replys: IReply[];
}

export interface IMember {
  memberId: number;
  email: string;
  nickname: string;
}

export interface IReply {
  article: { articleId: number };
  replyId: number;
  replyContext: string[];
  replyGroup: number;
  member: IMember;
  date: string;
  totalCount: number;
  replySort: number;
}

export interface IArticleState {
  mainPosts: IArticle[];
  hasMorePosts: boolean;
  loadUserPostsLoading: boolean;
  loadUserPostsDone: boolean;
  loadUserPostsError: unknown | null;
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
  reportMemberLoading: boolean;
  reportMemberDone: boolean;
  reportMemberError: unknown | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: unknown | null;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  addCommentError: unknown | null;
  updateCommentLoading: boolean;
  updateCommentDone: boolean;
  updateCommentError: unknown | null;
  loadMenuLoading: boolean;
  loadMenuDone: boolean;
  loadMenuError: unknown | null;
  editPostLoading: boolean;
  editPostDone: boolean;
  editPostError: unknown | null;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deletePostError: unknown | null;
}

export const initialState: IArticleState = {
  mainPosts: [],
  hasMorePosts: true,
  loadUserPostsLoading: false, // ?????? post ??????
  loadUserPostsDone: false,
  loadUserPostsError: null,
  loadPostsLoading: false, // post ??????
  loadPostsDone: false,
  loadPostsError: null,
  requestedPageNumber: 0, // ??????????????????
  addPostLoading: false, // ?????????
  addPostDone: false,
  addPostError: null,
  uploadImagesLoading: false, // ???????????????
  uploadImagesDone: false,
  uploadImagesError: null,
  imagePaths: null,
  reportMemberLoading: false, // ?????? ??????
  reportMemberDone: false,
  reportMemberError: null,
  searchPostsLoading: false, // ??????
  searchPostsDone: false,
  searchPostsError: null,
  updatePostLoading: false,
  updatePostDone: false,
  updatePostError: null,
  reportPostLoading: false, // ??????
  reportPostDone: false,
  reportPostError: null,
  likePostLoading: false, // ?????????
  likePostDone: false,
  likePostError: null,
  addCommentLoading: false, // ?????? ??????
  addCommentDone: false,
  addCommentError: null,
  updateCommentLoading: false, // ?????? ????????? ??????
  updateCommentDone: false,
  updateCommentError: null,
  loadMenuLoading: false, // ?????? post ??????
  loadMenuDone: false,
  loadMenuError: null,
  editPostLoading: false, // edit ??????
  editPostDone: false,
  editPostError: null,
  deletePostLoading: false, // post ??????
  deletePostDone: false,
  deletePostError: null,
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
        state.hasMorePosts = action.payload.length === 10;
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
      .addCase(addPost.fulfilled, (state: IArticleState) => {
        state.addPostLoading = false;
        state.addPostDone = true;
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
      // reportMember
      .addCase(reportMember.pending, (state: IArticleState) => {
        state.reportMemberLoading = true;
        state.reportMemberDone = false;
        state.reportMemberError = null;
      })
      .addCase(reportMember.fulfilled, (state: IArticleState, action) => {
        state.reportMemberLoading = false;
        state.reportMemberDone = true;
      })
      .addCase(reportMember.rejected, (state: IArticleState, action) => {
        state.reportMemberLoading = false;
        state.reportMemberError = action.error.message;
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
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(searchPosts.rejected, (state: IArticleState, action) => {
        state.searchPostsLoading = false;
        state.searchPostsError = action.error.message;
      })
      // loadUserPosts
      .addCase(loadUserPosts.pending, (state: IArticleState) => {
        state.loadUserPostsLoading = true;
        state.loadUserPostsDone = false;
        state.loadUserPostsError = null;
      })
      .addCase(loadUserPosts.fulfilled, (state: IArticleState, action: PayloadAction<any>) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state: IArticleState, action) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsError = action.error.message;
      })
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
        state.addCommentLoading = false;
        state.addCommentDone = true;
        state.mainPosts = _concat(
          state.mainPosts.map((v: IArticle) => {
            if (v.articleId == action.payload.articleId) {
              let tmp = v;
              tmp.replys = action.payload.replys;
              return tmp;
            } else {
              return v;
            }
          }),
        );
      })
      .addCase(addComment.rejected, (state: IArticleState, action) => {
        state.addCommentLoading = false;
        state.addCommentError = action.error.message;
      })
      // UpdateComment
      .addCase(updateComment.pending, (state: IArticleState) => {
        state.updateCommentLoading = true;
        state.updateCommentDone = false;
        state.updateCommentError = null;
      })
      .addCase(updateComment.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.updateCommentLoading = false;
        state.updateCommentDone = true;
        state.mainPosts = _concat(
          state.mainPosts.map((v: IArticle) => {
            console.log(state.mainPosts);
            if (v.articleId == action.payload[action.payload.length - 1].article.articleId) {
              let tmp = v;
              tmp.replys = action.payload;
              return tmp;
            } else {
              return v;
            }
          }),
        );
      })
      .addCase(updateComment.rejected, (state: IArticleState, action) => {
        state.updateCommentLoading = false;
        state.updateCommentError = action.error.message;
      })
      // loadMenu
      .addCase(loadMenu.pending, (state: IArticleState) => {
        state.loadMenuLoading = true;
        state.loadMenuDone = false;
        state.loadMenuError = null;
      })
      .addCase(loadMenu.fulfilled, (state: IArticleState, action: PayloadAction<any>) => {
        state.loadMenuLoading = false;
        state.loadMenuDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadMenu.rejected, (state: IArticleState, action) => {
        state.loadMenuLoading = false;
        state.loadMenuError = action.error.message;
      })
      // editPost
      .addCase(editPost.pending, (state: IArticleState) => {
        state.editPostLoading = true;
        state.editPostDone = false;
        state.editPostError = null;
      })
      .addCase(editPost.fulfilled, (state: IArticleState) => {
        state.editPostLoading = false;
        state.editPostDone = true;
      })
      .addCase(editPost.rejected, (state: IArticleState, action) => {
        state.editPostLoading = false;
        state.editPostError = action.error.message;
      })
      // deletePost
      .addCase(deletePost.pending, (state: IArticleState) => {
        state.deletePostLoading = true;
        state.deletePostDone = false;
        state.deletePostError = null;
      })
      .addCase(deletePost.fulfilled, (state: IArticleState) => {
        state.deletePostLoading = false;
        state.deletePostDone = true;
      })
      .addCase(deletePost.rejected, (state: IArticleState, action) => {
        state.deletePostLoading = false;
        state.deletePostError = action.error.message;
      }),
});

export default postSlice;
