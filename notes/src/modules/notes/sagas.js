import { takeEvery, put, call } from 'redux-saga/effects';
import * as api from '../../lib/api-client';
import {
    createNoteFailure,
    editNoteFailure, 
    deleteNoteFailure, 
    loadNotesFailure, 
    loadNotesSuccess, 
    types as t
} from './actions';

function* loadNotesSaga() {
    try {
        const res = yield api.getNotes();
        const notes = res.data;

        yield put(loadNotesSuccess(notes));
    } catch (error) {
        yield put(loadNotesFailure(error.toString()));
    }
}

function* createNoteSaga(action) {
    try {
        console.log('saga cerate')
        console.log(action)
        yield api.createNote(action.note);
    } catch (error) {
        yield put(createNoteFailure(error.toString()));
    }
}

function* editNoteSaga(action) {
    try {
        console.log('saga edit')
        console.log(action)
        yield api.editNote(action.note);
    } catch (error) {
        yield put(editNoteFailure(error.toString()));
    }
}

function* deleteNoteSaga(action) {
    try {
        console.log('saga delete')
        console.log(action)
        yield api.deleteNote(action.note);
    } catch (error) {
        yield put(deleteNoteFailure(error.toString()));
    }
}

function* notesSaga() {
    yield takeEvery(t.LOAD_NOTES_REQUEST, loadNotesSaga);
    yield takeEvery(t.CREATE_NOTE, createNoteSaga);
    yield takeEvery(t.EDIT_NOTE, editNoteSaga);
    yield takeEvery(t.DELETE_NOTE, deleteNoteSaga);
}

export default notesSaga;