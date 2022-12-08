import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';

export interface DummyData {
  mainPosts: {
    id: number;
    User: {
      id: number;
      nickname: string;
    };
    content: string;
    Images: {
      src: string;
    }[];
    Comments: {
      User: {
        nickname: string;
      };
      content: string;
    }[];
  }[];
  imagePaths: never[];
  postAdded: boolean;
}

// export const reducerUtils = {
//   addPost: () => ({
//     addPostLoading: true,
//     addPostDone: false,
//     addPostError: null,
//   }),
// };

export const dummyUser = {
  mainPosts: [
    {
      id: 1,
      User: {
        id: 1,
        nickname: 'B-HS',
      },
      content: '헬스하는 남자',
      Images: [
        {
          src: 'https://images.unsplash.com/photo-1669181310799-fc929c93ed58?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY3MDMyODU5NA&ixlib=rb-4.0.3&q=80&w=1080',
        },
        {
          src: 'https://source.unsplash.com/random/300×300',
        },
        {
          src: 'https://source.unsplash.com/random/?programming',
        },
      ],
      Comments: [
        {
          User: {
            nickname: 'B-HS 구독자',
          },
          content: '후원했습니다.',
        },
        {
          User: {
            nickname: 'B-HS 멤버십회원',
          },
          content: '현피 한번 뜨죠',
        },
      ],
    },
  ],
  imagePaths: [],
  postAdded: false,
} as DummyData;

const postsSlice = createSlice({
  name: 'DummyData',
  initialState: { value: dummyUser },
  reducers: {
    addPost: (state, action: PayloadAction<DummyData>) => {
      state.value = action.payload;
    },
  },
});

const { actions, reducer } = postsSlice;
export const { addPost } = actions;
export default reducer;

// export const {} = postsSlice.actions;
// export default postsSlice.reducer;
