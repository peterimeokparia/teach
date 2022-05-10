import produce from 'immer';

import { 
ADD_NEW_MEETINGNOTE_BEGIN,
ADD_NEW_MEETINGNOTE_SUCCESS,
ADD_NEW_MEETINGNOTE_ERROR,
LOAD_MEETINGNOTES_BEGIN,  
LOAD_MEETINGNOTES_SUCCESS,
LOAD_MEETINGNOTES_ERROR,
LOAD_SINGLE_MEETINGNOTE_SUCCESS,  
SAVE_MEETINGNOTE_BEGIN,
SAVE_MEETINGNOTE_SUCCESS,
SAVE_MEETINGNOTE_ERROR,  
DELETE_MEETINGNOTE_BEGIN, 
DELETE_MEETINGNOTE_SUCCESS, 
DELETE_MEETINGNOTE_ERROR } from 'services/course/actions/meetingNotes';

const initialState = {
    onMeetingNoteDelete: false,
    onMeetingNoteSaved: false,
    onMeetingNoteAdded: false,
    onMeetingNotesLoaded: false,
    onMeetingNoteFail: null,
    meetingNotes: {},
    meetingNote: {}  
};

const reducer =  produce( (draft, action) => {
    switch(action.type){
        
        case LOAD_MEETINGNOTES_BEGIN:
            draft.onMeetingNotesLoaded = true;
            draft.onMeetingNoteFail = null;
        return;    
        case LOAD_MEETINGNOTES_SUCCESS:
            action.payload?.forEach(note => {
                draft.meetingNotes[ note?._id ] = note; 
            });
        return;
        case LOAD_MEETINGNOTES_ERROR:
            draft.onMeetingNotesLoaded = false;
            draft.onMeetingNoteFail = action?.error;
        return;
        case LOAD_SINGLE_MEETINGNOTE_SUCCESS:
            if ( action?.payload === null ) return;
            draft.meetingNotes[action.payload?._id] = action.payload;
            draft.meetingNote[action.payload?._id] = action.payload;
        return;
        case ADD_NEW_MEETINGNOTE_BEGIN:   
             draft.onMeetingNoteAdded = true;   
             draft.onMeetingNoteFail = null;
        return;
        case ADD_NEW_MEETINGNOTE_SUCCESS:
             draft.onMeetingNoteAdded = false;     
             draft.meetingNotes[action.payload?._id] = action.payload;
             draft.meetingNote[action.payload?._id] = action.payload; 
        return;
        case ADD_NEW_MEETINGNOTE_ERROR:    
             draft.onMeetingNoteAdded = false;   
             draft.onMeetingNoteFail = action?.error;
        return;
        case SAVE_MEETINGNOTE_BEGIN: 
             draft.onMeetingNoteSaved = true; 
             draft.onMeetingNoteFail = null;
        return;
        case SAVE_MEETINGNOTE_SUCCESS: 
             draft.onMeetingNoteSaved = false; 
             draft.meetingNotes[action.payload?._id] = action.payload; 
        return;
        case SAVE_MEETINGNOTE_ERROR: 
             draft.onMeetingNoteSaved = false; 
             draft.onMeetingNoteFail = action?.error;
        return;
        case DELETE_MEETINGNOTE_BEGIN:
             draft.onMeetingNoteDelete = true;
             draft.onMeetingNoteFail = null;
        return; 
        case DELETE_MEETINGNOTE_SUCCESS:
            draft.onMeetingNoteDelete = false;
            delete draft.meetingNotes[action.payload?._id];
        return; 
        case DELETE_MEETINGNOTE_ERROR:
            draft.onMeetingNoteDelete = false;
            draft.onMeetingNoteFail = action?.error;
        return; 
        default:

    return;
    
    }
}, initialState);

export default reducer;