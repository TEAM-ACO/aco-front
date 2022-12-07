// import { AnyAction, CombinedState, Draft } from "@reduxjs/toolkit";
// import { HYDRATE } from 'next-redux-wrapper';
// import { combineReducers } from 'redux';
// import { DummyData } from 'slices/postSlice';

// interface ReducerStates {
//     mainPosts: DummyData
// }

// import user from './user';
// import post from './post';
// import { RootState } from 'store/config';

// // combineReducers를 사용하여 reducer들을 하나로 합쳐 하나의 Reducer로 관리할 수 있습니다.

// /**
// (이전상태, 액션) => 다음상태
// 이전상태 state(user.tsx, post.tsx의 initialState)를 action에 따라 다음 상태를 리턴
// */
// const rootReducer = (
//     state: ReducerStates,
//     action: AnyAction
// ): CombinedState<ReducerStates> => {
//     // Next.js 서버사이드렌더링시 필요
//     switch (action.type) {
//         case HYDRATE:
//         	return action.payload;
//         default: {
//         	const combinedReducer = combineReducers({
//             	counter: counterSlice.reducer
//             })
//             return combinedReducer(state, action);
//         }
//     }
// };

// export type ReducerType = ReturnType<typeof rootReducer>;
// export default rootReducer;