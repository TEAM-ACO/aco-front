import _concat from 'lodash/concat';
import _find from 'lodash/find';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import {
  addComment,
  addPost,
  deleteComment,
  deletePost,
  editPost,
  likePost,
  loadMenu,
  loadPosts,
  loadUserPosts,
  randomTip,
  reportMember,
  searchPosts,
  updateComment,
  uploadImages,
} from '@actions/post';
import { ArticleLoadPosts } from '@typings/db';

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
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  requestedPageNumber: number;
  addPostLoading: boolean;
  addPostDone: boolean;
  uploadImagesLoading: boolean;
  uploadImagesDone: boolean;
  imagePaths: string[] | null;
  searchPostsLoading: boolean;
  searchPostsDone: boolean;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  reportPostLoading: boolean;
  reportPostDone: boolean;
  reportMemberLoading: boolean;
  reportMemberDone: boolean;
  likePostLoading: boolean;
  likePostDone: boolean;
  addCommentLoading: boolean;
  addCommentDone: boolean;
  updateCommentLoading: boolean;
  updateCommentDone: boolean;
  loadMenuLoading: boolean;
  loadMenuDone: boolean;
  editPostLoading: boolean;
  editPostDone: boolean;
  deletePostLoading: boolean;
  deletePostDone: boolean;
  deleteCommentLoading: boolean;
  deleteCommentDone: boolean;
  randomTipLoading: boolean;
  randomTipDone: boolean;
  ranTip: string;
  reqPage: number;
  mainReqPage: number;
  searchValue: number;
}

export const initialState: IArticleState = {
  mainPosts: [],
  hasMorePosts: true,
  loadUserPostsLoading: false, // 개인 post 로드
  loadUserPostsDone: false,
  loadPostsLoading: false, // post 로드
  loadPostsDone: false,
  requestedPageNumber: 0, // 페이지네이션
  addPostLoading: false, // 글쓰기
  addPostDone: false,
  uploadImagesLoading: false, // 이미지첨부
  uploadImagesDone: false,
  imagePaths: null,
  reportMemberLoading: false, // 멤버 신고
  reportMemberDone: false,
  searchPostsLoading: false, // 검색
  searchPostsDone: false,
  updatePostLoading: false,
  updatePostDone: false,
  reportPostLoading: false, // 신고
  reportPostDone: false,
  likePostLoading: false, // 좋아요
  likePostDone: false,
  addCommentLoading: false, // 댓글 쓰기
  addCommentDone: false,
  updateCommentLoading: false, // 댓글 변동시 로드
  updateCommentDone: false,
  loadMenuLoading: false, // 개인 post 로드
  loadMenuDone: false,
  editPostLoading: false, // edit 삭제
  editPostDone: false,
  deletePostLoading: false, // post 삭제
  deletePostDone: false,
  deleteCommentLoading: false, // comment 삭제
  deleteCommentDone: false,
  randomTipLoading: false, // randomTip
  randomTipDone: false,
  ranTip: '',
  reqPage: 0,
  mainReqPage: 0,
  searchValue: 0,
};

const postSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    editPostToMe(state, action) {
      const post = state.mainPosts.findIndex((v) => v.articleId === action.payload.articleId);
      state.mainPosts[post] = action.payload;
    },
    deletePostToMe(state, action) {
      state.mainPosts = state.mainPosts.filter((v) => v.articleId !== action.payload.articleId);
    },
    mainRequestPage(state, action) {
      state.mainReqPage = action.payload.mainReqPage + 1;
    },
    userRequestPage(state, action) {
      state.reqPage = action.payload.reqPage + 1;
    },
    searchRequestPage(state, action) {
      state.searchValue = action.payload.searchValue + 1;
    },
  },
  extraReducers: (builder) =>
    builder
      // loadPosts
      .addCase(loadPosts.pending, (state: IArticleState) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
      })
      .addCase(loadPosts.fulfilled, (state: IArticleState, action: PayloadAction<ArticleLoadPosts>) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadPosts.rejected, (state: IArticleState) => {
        state.loadPostsLoading = false;
      })
      // addPost
      .addCase(addPost.pending, (state: IArticleState) => {
        state.addPostLoading = true;
        state.addPostDone = false;
      })
      .addCase(addPost.fulfilled, (state: IArticleState) => {
        state.addPostLoading = false;
        state.addPostDone = true;
      })
      .addCase(addPost.rejected, (state: IArticleState) => {
        state.addPostLoading = false;
      })
      // uploadImages
      .addCase(uploadImages.pending, (state: IArticleState) => {
        state.uploadImagesLoading = true;
        state.uploadImagesDone = false;
      })
      .addCase(uploadImages.fulfilled, (state: IArticleState) => {
        state.uploadImagesLoading = false;
        state.uploadImagesDone = true;
      })
      .addCase(uploadImages.rejected, (state: IArticleState) => {
        state.uploadImagesLoading = false;
      })
      // reportMember
      .addCase(reportMember.pending, (state: IArticleState) => {
        state.reportMemberLoading = true;
        state.reportMemberDone = false;
      })
      .addCase(reportMember.fulfilled, (state: IArticleState) => {
        state.reportMemberLoading = false;
        state.reportMemberDone = true;
      })
      .addCase(reportMember.rejected, (state: IArticleState) => {
        state.reportMemberLoading = false;
      })
      // Search
      .addCase(searchPosts.pending, (state: IArticleState) => {
        state.searchPostsLoading = true;
        state.searchPostsDone = false;
      })
      .addCase(searchPosts.fulfilled, (state: IArticleState, action) => {
        state.searchPostsLoading = false;
        state.searchPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(searchPosts.rejected, (state: IArticleState) => {
        state.searchPostsLoading = false;
      })
      // loadUserPosts
      .addCase(loadUserPosts.pending, (state: IArticleState) => {
        state.loadUserPostsLoading = true;
        state.loadUserPostsDone = false;
      })
      .addCase(loadUserPosts.fulfilled, (state: IArticleState, action: PayloadAction<any>) => {
        state.loadUserPostsLoading = false;
        state.loadUserPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadUserPosts.rejected, (state: IArticleState) => {
        state.loadUserPostsLoading = false;
      })
      // likePost
      .addCase(likePost.pending, (state: IArticleState) => {
        state.likePostLoading = true;
        state.likePostDone = false;
      })
      .addCase(likePost.fulfilled, (state) => {
        state.likePostLoading = false;
        state.likePostDone = true;
      })
      .addCase(likePost.rejected, (state: IArticleState) => {
        state.likePostLoading = false;
      })
      // addComment
      .addCase(addComment.pending, (state: IArticleState) => {
        state.addCommentLoading = true;
        state.addCommentDone = false;
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
      .addCase(addComment.rejected, (state: IArticleState) => {
        state.addCommentLoading = false;
      })
      // UpdateComment
      .addCase(updateComment.pending, (state: IArticleState) => {
        state.updateCommentLoading = true;
        state.updateCommentDone = false;
      })
      .addCase(updateComment.fulfilled, (state: any, action: PayloadAction<any>) => {
        state.updateCommentLoading = false;
        state.updateCommentDone = true;
        state.mainPosts = _concat(
          state.mainPosts.map((v: IArticle) => {
            if (v.articleId == action.payload[action.payload.length - 1]?.article.articleId) {
              let tmp = v;
              tmp.replys = action.payload;
              return tmp;
            } else {
              return v;
            }
          }),
        );
      })
      .addCase(updateComment.rejected, (state: IArticleState) => {
        state.updateCommentLoading = false;
      })
      // loadMenu
      .addCase(loadMenu.pending, (state: IArticleState) => {
        state.loadMenuLoading = true;
        state.loadMenuDone = false;
      })
      .addCase(loadMenu.fulfilled, (state: IArticleState, action: PayloadAction<any>) => {
        state.loadMenuLoading = false;
        state.loadMenuDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
        state.hasMorePosts = action.payload.length === 10;
      })
      .addCase(loadMenu.rejected, (state: IArticleState) => {
        state.loadMenuLoading = false;
      })
      // editPost
      .addCase(editPost.pending, (state: IArticleState) => {
        state.editPostLoading = true;
        state.editPostDone = false;
      })
      .addCase(editPost.fulfilled, (state: IArticleState, action: PayloadAction<IArticle>) => {
        const post = _find(state.mainPosts, { articleId: action.payload });
        state.editPostLoading = false;
        state.editPostDone = true;
      })
      .addCase(editPost.rejected, (state: IArticleState) => {
        state.editPostLoading = false;
      })
      // deletePost
      .addCase(deletePost.pending, (state: IArticleState) => {
        state.deletePostLoading = true;
        state.deletePostDone = false;
      })
      .addCase(deletePost.fulfilled, (state: IArticleState, action) => {
        state.deletePostLoading = false;
        state.deletePostDone = true;
        state.mainPosts = state.mainPosts.filter((v) => v.articleId !== action.payload.articleId);
      })
      .addCase(deletePost.rejected, (state: IArticleState) => {
        state.deletePostLoading = false;
      })
      // deleteComment
      .addCase(deleteComment.pending, (state: IArticleState) => {
        state.deleteCommentLoading = true;
        state.deleteCommentDone = false;
      })
      .addCase(deleteComment.fulfilled, (state: IArticleState) => {
        state.deleteCommentLoading = false;
        state.deleteCommentDone = true;
      })
      .addCase(deleteComment.rejected, (state: IArticleState) => {
        state.deleteCommentLoading = false;
      })
      // randomTip
      .addCase(randomTip.pending, (state: IArticleState) => {
        state.randomTipLoading = true;
        state.randomTipDone = false;
      })
      .addCase(randomTip.fulfilled, (state: IArticleState, action: any) => {
        state.randomTipLoading = false;
        state.randomTipDone = true;
        state.ranTip = action.payload;
      })
      .addCase(randomTip.rejected, (state: IArticleState) => {
        state.randomTipLoading = false;
      }),
});

export const { deletePostToMe, editPostToMe, mainRequestPage, userRequestPage, searchRequestPage } = postSlice.actions;
export default postSlice;
