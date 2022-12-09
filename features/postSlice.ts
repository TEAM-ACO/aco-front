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
  isLoading: boolean;
}

// Image를 mainPosts 밖으로 빼서 따로 받아야 할까?
export const initialState = {
  mainPosts: dummy,
  postAdded: false,
  isLoading: true,
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
  name: 'post',
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
});

export const { addPosts, loadPosts } = postSlice.actions;
export default postSlice.reducer;
