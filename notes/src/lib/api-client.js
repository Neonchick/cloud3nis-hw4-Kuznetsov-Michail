import { doFetch } from "./do-fetch";

export function* getNotes() {
    try {
        const requestParams = {
            method: 'GET',
            url: '/notes',
        }

        return yield doFetch(requestParams);
    } catch (error) {
        return error;
    }
}

export function* createNote(note) {
    try {
        const requestParams = {
            method: 'POST',
            url: '/notes', 
            data: note
        }

        return yield doFetch(requestParams);
    } catch (error) {
        return error;
    }
}

export function* editNote(note) {
    try {
        const requestParams = {
            method: 'PATCH',
            url: '/notes/' + note.id, 
            data: note
        }

        return yield doFetch(requestParams);
    } catch (error) {
        return error;
    }
}

export function* deleteNote(note) {
    try {
        const requestParams = {
            method: 'DELETE',
            url: '/notes/' + note.id, 
        }

        return yield doFetch(requestParams);
    } catch (error) {
        return error;
    }
}