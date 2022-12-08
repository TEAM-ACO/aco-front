import { all, fork } from 'redux-saga/effects';

// import postSaga from './post'
// import userSaga from './user'

// rootReducer 처럼 각각의 saga 파일들을 컴바인 역할을 해준다.
export default function* rootSaga() {
    yield all([
        // 설정한 saga
        // fork(postSaga),
        // fork(userSaga),
    ]);
}