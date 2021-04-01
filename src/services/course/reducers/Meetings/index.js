import produce from 'immer';

import { 
  ADD_NEW_MEETING_SUCCESS,
  LOAD_MEETINGS_SUCCESS,
  LOAD_SINGLE_MEETING_SUCCESS,  
  SAVE_MEETING_SUCCESS,  
  UPDATE_INVITEE_LIST } from 'Services/course/Actions/Meetings';

const initialState = {
    meetings:{},
    meeting:{}  
};

const reducer =  produce( (draft, action) => {
    switch(action.type){
        case ADD_NEW_MEETING_SUCCESS:
             console.log(action.payload)
             draft.meetings[action.payload?._id] = action.payload; 
        return;
        case SAVE_MEETING_SUCCESS: 
             console.log(action.payload)
             draft.meetings[action.payload?._id] = action.payload; 
        return;
        case LOAD_MEETINGS_SUCCESS:
             console.log(action.payload);
             draft.meetings = action.payload;
        return;
        case LOAD_SINGLE_MEETING_SUCCESS:
            console.log(action.payload);
             draft.meetings[action.payload?._id] = action.payload;
             draft.meeting[action.payload?._id] = action.payload;
        return;     
        case UPDATE_INVITEE_LIST:
            console.log(action.payload)
            draft.invitees = action.payload; 
       return;
        default:
    return;
    }
}, initialState);

export default reducer;