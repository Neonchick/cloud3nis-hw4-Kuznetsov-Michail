export const types = {
    CREATE_NOTE: "CREATE_NOTE",
    EDIT_NOTE: "EDIT_NOTE",
    DELETE_NOTE: "DELETE_NOTE",
    LOAD_NOTES_REQUEST: 'LOAD_NOTES_REQUEST',
    LOAD_NOTES_SUCCESS: 'LOAD_NOTES_SUCCESS',
    LOAD_NOTES_FAILURE: 'LOAD_NOTES_FAILURE',
    CREATE_NOTE_FAILURE: 'CREATE_NOTE_FAILURE',
    EDIT_NOTE_FAILURE: "EDIT_NOTE_FAILURE",
    DELETE_NOTE_FAILURE: "DELETE_NOTE_FAILURE",
}

export const createNote = (note) =>
({
    type: types.CREATE_NOTE,
    note,
})

export const editNote = (note) =>
({
    type: types.EDIT_NOTE,
    note,
})

export const deleteNote = (note) =>
({
    type: types.DELETE_NOTE,
    note,
})

export const loadNotes = () => ({ type: types.LOAD_NOTES_REQUEST });

export const loadNotesSuccess = (notes) =>
({
    type: types.LOAD_NOTES_SUCCESS,
    notes,
});

export const loadNotesFailure = (error) =>
({
    type: types.LOAD_NOTES_FAILURE,
    error,
});

export const createNoteFailure = (error) =>
({
    type: types.CREATE_NOTE_FAILURE,
    error,
});

export const editNoteFailure = (error) =>
({
    type: types.EDIT_NOTE_FAILURE,
    error,
});

export const deleteNoteFailure = (error) =>
({
    type: types.DELETE_NOTE_FAILURE,
    error,
});