import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const ADD_NEW_MEETINGNOTE_BEGIN = "ADD NEW MEETINGNOTE BEGIN";
export const ADD_NEW_MEETINGNOTE_SUCCESS = "ADD NEW MEETINGNOTE SUCCESS";
export const ADD_NEW_MEETINGNOTE_ERROR = "ADD NEW MEETINGNOTE ERROR";
export const LOAD_MEETINGNOTES_BEGIN = "LOAD MEETINGNOTES BEGIN";
export const LOAD_MEETINGNOTES_SUCCESS = "LOAD MEETINGNOTES SUCCESS";
export const LOAD_MEETINGNOTES_ERROR = "LOAD MEETINGNOTES ERROR";
export const SAVE_MEETINGNOTE_BEGIN = "SAVE MEETINGNOTE BEGIN";
export const SAVE_MEETINGNOTE_SUCCESS = "SAVE MEETINGNOTE SUCCESS";
export const SAVE_MEETINGNOTE_ERROR = "SAVE MEETINGNOTE ERROR";
export const DELETE_MEETINGNOTE_SUCCESS = "DELETE MEETINGNOTE SUCCESS";
export const DELETE_MEETINGNOTE_BEGIN = "DELETE MEETINGNOTE BEGIN";
export const DELETE_MEETINGNOTE_ERROR = "DELETE MEETINGNOTE ERROR";
export const LOAD_SINGLE_MEETINGNOTE_SUCCESS = "LOAD SINGLE MEETINGNOTE SUCCESS";
export const ADD_TO_MEETINGNOTE = "ADD TO MEETINGNOTE";
export const SET_MEETINGNOTES_MARKDOWN = "SET MEETINGNOTES MARKDOWN";

export const addNewMeetingNote = ( noteConfig ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_MEETINGNOTE_BEGIN }); 
        return add( noteConfig, '/meetingnotes')
            .then( note => { 
                dispatch({type: ADD_NEW_MEETINGNOTE_SUCCESS, payload: note }); 
                return note;
            }).catch( error => {
                dispatch({ type: ADD_NEW_MEETINGNOTE_ERROR , error });
        });
    };
};

export const saveMeetingNote = ( noteId, meetingNote ) => {
    return dispatch => {
        return update( { ...meetingNote, _id: noteId }, `/meetingnotes/` )
        .then( note => {  
            dispatch({        
            type: SAVE_MEETINGNOTE_SUCCESS, payload: note }); 
        }).catch( error => {
            dispatch({ type: SAVE_MEETINGNOTE_ERROR , error });
        });
    };
};

export const loadMeetingNotes = () => {
    return dispatch => {
        dispatch({ type: LOAD_MEETINGNOTES_BEGIN });
        get(`/meetingnotes`)
        .then( note => {
            dispatch({ type: LOAD_MEETINGNOTES_SUCCESS, payload: note });
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGNOTES_ERROR , error });
        });
    };
};

export const loadMeetingNotesById = ( noteId ) => { 
    return dispatch => {
        return getById( noteId, `/meetingnotes/notes?noteId=`)
        .then( note => {
            dispatch({ type: LOAD_SINGLE_MEETINGNOTE_SUCCESS, payload: note });
            return note;
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGNOTES_ERROR , error });
            return error;
        });
    };
};

export const loadMeetingNotesByMeetingId = ( meetingId ) => { 
    return dispatch => {
        return getById( meetingId, `/meetingnotes/meeting?meetingId=`)
        .then( note => {
            dispatch({ type: LOAD_MEETINGNOTES_SUCCESS, payload: note });
            return note;
        }).catch( error => {
            dispatch({ type: LOAD_MEETINGNOTES_ERROR , error });
            return error;
        });
    };
};

export const deleteMeetingNote = note => {
    return dispatch => {
        dispatch({ type: DELETE_MEETINGNOTE_BEGIN });
        return remove( note, `/meetingnotes/`)
        .then( () => {
            dispatch({ type: DELETE_MEETINGNOTE_SUCCESS, payload: note });
        }).catch( error => {
            dispatch({ type: DELETE_MEETINGNOTE_ERROR , error });
        });
    };
};