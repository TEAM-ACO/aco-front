import { all, fork } from 'redux-saga/effects';

// rootReducer 처럼 각각의 saga 파일들을 컴바인 역할을 해준다.
export default function* rootSaga() {
    yield all([
        // 설정한 saga
    ]);
}