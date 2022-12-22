import _concat from 'lodash/concat';
import _find from 'lodash/concat';

import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { likePost, loadPosts, reportPost } from '@actions/post';

export interface IPost {
  memberId: number;
  writer: string;
  title: string;
  content: string;
  articleImage: string;
  Comments: {
    User: {
      nickname: string;
    };
    content: string;
  }[];
}

export interface IComments {
  Comments: {
    User: {
      nickname: string;
    };
    content: string;
  }[];
}

export interface IPostState {
  mainPosts: IPost[];
  postAdded: boolean;
  loadPostsLoading: boolean;
  loadPostsDone: boolean;
  loadPostsError: any | null;
  addPostLoading: boolean;
  addPostDone: boolean;
  addPostError: any | null;
  updatePostLoading: boolean;
  updatePostDone: boolean;
  updatePostError: any | null;
  reportPostLoading: boolean;
  reportPostDone: boolean;
  reportPostError: any | null;
  likePostLoading: boolean;
  likePostDone: boolean;
  likePostError: any | null;
}

// Image를 mainPosts 밖으로 빼서 따로 받아야 할까?
export const initialState: IPostState = {
  mainPosts: [], // 데이터 들어오면 배열로 바꿈
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
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

// const dummyPost = {
//   mid: 7,
//   title: '아임 더미',
//   content: 'ADD POST 누르면 이게 나와야 한다.',
//   writer: 'Naive',
//   articleImage: '',
//   Comments: [],
// };

const postSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    // extraReducer로 넘길 것
    // addPosts: (state, action) => {
    //   state.mainPosts = [dummyPost, ...state.mainPosts];
    //   state.postAdded = true;
    // },
    // loadPosts: (state, action) => {
    //   state.mainPosts.forEach((post) => {});
    // },
  },
  extraReducers: (builder) =>
    builder
      // loadPosts
      .addCase(loadPosts.pending, (state: IPostState) => {
        state.loadPostsLoading = true;
        state.loadPostsDone = false;
        state.loadPostsError = null;
      })
      .addCase(loadPosts.fulfilled, (state: IPostState, action: PayloadAction<IPost, any>) => {
        state.loadPostsLoading = false;
        state.loadPostsDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
      })
      .addCase(loadPosts.rejected, (state: IPostState, action) => {
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
      .addCase(reportPost.pending, (state) => {
        state.reportPostLoading = true;
        state.reportPostDone = false;
        state.reportPostError = null;
      })
      .addCase(reportPost.fulfilled, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostDone = true;
        state.mainPosts = _concat(state.mainPosts, action.payload);
      })
      .addCase(reportPost.rejected, (state, action) => {
        state.reportPostLoading = false;
        state.reportPostError = action.error.message;
      })
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
