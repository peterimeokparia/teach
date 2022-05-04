import {
add,
get,
update,
remove, 
getById } from 'services/course/api';

export const ADD_NEW_NOTE_BEGIN = "ADD NEW NOTE BEGIN";
export const ADD_NEW_NOTE_SUCCESS = "ADD NEW NOTE SUCCESS";
export const ADD_NEW_NOTE_ERROR = "ADD NEW NOTE ERROR";
export const SAVE_NOTE_BEGIN = "SAVE NOTE BEGIN";
export const SAVE_NOTE_SUCCESS = "SAVE NOTE SUCCESS";
export const SAVE_NOTE_ERROR = "SAVE NOTE ERROR";
export const LOAD_NOTES = "LOAD NOTES";
export const LOAD_NOTES_BEGIN = "LOAD NOTES BEGIN";
export const LOAD_NOTES_SUCCESS = "LOAD NOTES SUCCESS";
export const LOAD_NOTES_ERROR = "LOAD NOTES ERROR";
export const DELETE_NOTE_BEGIN = "DELETE NOTE BEGIN";
export const DELETE_NOTE_SUCCESS = "DELETE NOTE SUCCESS";
export const DELETE_NOTE_ERROR = "DELETE NOTE ERROR";
export const SET_NOTES_MARKDOWN = "SET NOTES MARKDOWN";
export const LESSONNOTES = "lessonNotes";
export const STUDENTNOTES = "studentNotes";

export const addNotes = ( notes ) => {
    return dispatch => {
            dispatch({ type: ADD_NEW_NOTE_BEGIN });
    return add( notes, '/notes')
        .then( noteData => {
            dispatch({ type: ADD_NEW_NOTE_SUCCESS, payload: noteData });
            return noteData; 
        })
        .catch( error => {
            dispatch({ type: ADD_NEW_NOTE_ERROR, payload: error });
            console.log( error );
            return error;
        });
    };
};

export const saveNotes = ( notes )  => {
    return dispatch => {
         dispatch({ type: SAVE_NOTE_BEGIN });
         return update( notes, `/notes/` )
             .then( noteData => {  
                dispatch({ type: SAVE_NOTE_SUCCESS, payload: noteData });
                return noteData; 
             })
             .catch( error => {
                dispatch({ type: SAVE_NOTE_ERROR , error });
                return error;
         });  
    };
 };

 export const deleteNotes = ( note ) => {
    return dispatch => {
        dispatch({ type: DELETE_NOTE_BEGIN });
         return remove( note, `/notes/` )
         .then( resp => {
             dispatch({ type: DELETE_NOTE_SUCCESS, payload: note  });
             return note;
         }).catch( error => {
            dispatch({ type: DELETE_NOTE_ERROR , error });
            return error;
        });
    };
};

export const loadAllNotes = () => {
    return dispatch => {
        dispatch({ type: LOAD_NOTES_BEGIN });
        return get(`/notes`)
         .then( notes => {
             dispatch({ type: LOAD_NOTES_SUCCESS, payload: notes });
             return notes;
         }).catch( error => {
            dispatch({ type: LOAD_NOTES_ERROR , error });
            return error;
        });
    };
};

export const loadNotesByNoteId = ( noteId ) => {
    return dispatch => {
        dispatch({ type: LOAD_NOTES_BEGIN });
        return getById(noteId, `/notes?noteId=`)
         .then( notes => {
             dispatch({ type: LOAD_NOTES_SUCCESS, payload: notes });
             return notes;
         })
         .catch( error => {
            dispatch({ type: LOAD_NOTES_ERROR , error });
            return error;
        });
    };
};

export const loadNotesByUserId = ( user ) => {
    return dispatch => {
        return getById( user?._id, `/user/notes?userId=`)
         .then( notes => {
            dispatch({ type: LOAD_NOTES_SUCCESS, payload: notes });
            return notes;
        })
        .catch( error => {
            dispatch({ type: LOAD_NOTES_ERROR , error });
            return error;
        });
    };
};
