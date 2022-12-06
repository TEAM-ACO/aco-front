import { combineReducers } from 'redux';

// combineReducers를 사용하여 reducer들을 하나로 합쳐 하나의 Reducer로 관리할 수 있다.

const rootReducer = combineReducers({
    // 설정한 reducer
});

export type ReducerType = ReturnType<typeof rootReducer>;
export default rootReducer;