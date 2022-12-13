import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import dummy from '../dummy';

export interface IPost {
  mid: number;
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
}

// Image를 mainPosts 밖으로 빼서 따로 받아야 할까?
export const initialState = {
  mainPosts: dummy, // 데이터 들어오면 배열로 바꿈
  // loadPostsLoading: false,
  // loadPostsDone: false,
  // loadPostsError: null,
  // addPostLoading: false,
  // addPostDone: false,
  // addPostError: null,
  // updatePostLoading: false,
  // updatePostDone: false,
  // updatePostError: null,
  postAdded: false,
} as IPostState;

const dummyPost = {
  mid: 7,
  title: '아임 더미',
  content: 'ADD POST 누르면 이게 나와야 한다.',
  writer: 'Naive',
  articleImage: '',
  Comments: [],
};

const postSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    addPosts: (state, action) => {
      state.mainPosts = [dummyPost, ...state.mainPosts];
      state.postAdded = true;
    },
    loadPosts: (state, action) => {
      state.mainPosts.forEach((post) => {});
    },
  },
  extraReducers: (builder) => builder,
  // // loadPosts
  // .addCase(loadPosts.pending, (state) => {
  //   state.loadPostsLoading = true;
  //   state.loadPostsDone = false;
  //   state.loadPostsError = null;
  // })
  // .addCase(loadPosts.fulfilled, (state, action) => {
  //   state.loadPostsLoading = false;
  //   state.loadPostsDone = true;
  //   state.mainPosts = _concat(state.mainPosts, action.payload);
  // })
  // .addCase(loadPosts.rejected, (state, action) => {
  //   state.loadPostsLoading = false;
  //   state.loadPostsError = action.error.message;
  // })
  //  // addPost
  //  .addCase(addPost.pending, (state) => {
  //   state.addPostLoading = true;
  //   state.addPostDone = false;
  //   state.addPostError = null;
  // })
  // .addCase(addPost.fulfilled, (state, action) => {
  //   state.addPostLoading = false;
  //   state.addPostDone = true;
  //   state.mainPosts.unshift(action.payload);
  //   state.articleimage = []; // 이미지 처리 어떻게 할건지 의논
  // })
  // .addCase(addPost.rejected, (state, action) => {
  //   state.addPostLoading = false;
  //   state.addPostError = action.error.message;
  // })
});

export const { addPosts, loadPosts } = postSlice.actions;
export default postSlice.reducer;
