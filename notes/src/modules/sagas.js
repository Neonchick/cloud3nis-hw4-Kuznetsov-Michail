import notesSaga from "./notes/sagas";
import { fork } from 'redux-saga/effects';

export default function* rootSaga() {
    yield fork(notesSaga);
}