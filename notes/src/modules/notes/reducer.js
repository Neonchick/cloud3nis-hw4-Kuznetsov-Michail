import {types as t} from "./actions";

const initialState = {
    notes: new Map(),
    isLoaded: false,
};

export default (state = initialState, action) => {
    switch (action.type) {
        case t.CREATE_NOTE: 
        case t.EDIT_NOTE: {
            const { note } = action;
            var newNotes = new Map(state.notes);
            newNotes.set(note.id, note);
            return { ...state, notes: newNotes };
        }
        case t.DELETE_NOTE: {
            const { note } = action;
            var newNotes = new Map(state.notes);
            newNotes.delete(note.id);
            return { ...state, notes: newNotes };
        }
        case t.LOAD_NOTES_SUCCESS: {
            const { notes } = action;
            let notesMap = new Map()
            notes.forEach((note) => notesMap.set(note.id, note));
            return {
                ...state,
                notes: notesMap,
                isLoaded: true,
            };
        }
        case t.LOAD_NOTES_FAILURE: {
            console.log('Failed to load notes');
            console.log('Reason: ', action.error);
            return state;
        }
        case t.CREATE_NOTE_FAILURE: {
            console.log('Failed to create note');
            console.log('Reason: ', action.error);
            return state;
        }
        case t.EDIT_NOTE_FAILURE: {
            console.log('Failed to edit note');
            console.log('Reason: ', action.error);
            return state;
        }
        case t.DELETE_NOTE_FAILURE: {
            console.log('Failed to delete note');
            console.log('Reason: ', action.error);
            return state;
        }
        default:
            return state;
    }
}