import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import dummy from '../dummy';

export interface IPost {
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

export interface IPostState {
  mainPosts: IPost[];
  totalQuantity: number;
  totalValue: number;
  isLoading: boolean;
}

export const initialState = {
  mainPosts: dummy,
  totalQuantity: 0,
  totalValue: 0,
  isLoading: true,
} as IPostState;

const postSlice = createSlice({
  name: 'post',
  initialState,
  reducers: {
    loadPosts: (state, action) => {
      state.mainPosts.forEach((post) => {});
    },
  },
});

export const { loadPosts } = postSlice.actions;
export default postSlice.reducer;
