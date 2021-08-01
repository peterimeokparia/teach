import produce from 'immer';

import { 
  LOAD_MEETINGS_BEGIN,  
  ADD_NEW_MEETING_SUCCESS,
  LOAD_MEETINGS_SUCCESS,
  LOAD_SINGLE_MEETING_SUCCESS,  
  SAVE_MEETING_SUCCESS,  
  UPDATE_INVITEE_LIST } from 'services/course/actions/meetings';

const initialState = {
    meetingsLoaded:false,
    onMeetingFail:null,
    meetings:{},
    meeting:{}  
};

const reducer =  produce( (draft, action) => {
    switch(action.type){
        
        case LOAD_MEETINGS_BEGIN:
            draft.meetingsLoaded = true;
            draft.onMeetingFail = null;
        return;    
        case ADD_NEW_MEETING_SUCCESS:    
             draft.meetings[action.payload?._id] = action.payload; 
        return;
        case SAVE_MEETING_SUCCESS: 
             draft.meetings[action.payload?._id] = action.payload; 
        return;
        case LOAD_MEETINGS_SUCCESS:
             draft.meetings = action.payload;
        return;
        case LOAD_SINGLE_MEETING_SUCCESS:
             if ( action?.payload === null ) return;
             draft.meetings[action.payload?._id] = action.payload;
             draft.meeting[action.payload?._id] = action.payload;
        return;     
        case UPDATE_INVITEE_LIST:
            draft.invitees = action.payload; 
       return;
        default:

    return;
    
    }
}, initialState);

export default reducer;