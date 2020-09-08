import produce from 'immer';
import { 
  ADD_NEW_MEETING_BEGIN,
  ADD_NEW_MEETING_SUCCESS,
  ADD_NEW_MEETING_ERROR,
  LOAD_MEETINGS_BEGIN,
  LOAD_MEETINGS_SUCCESS,
  LOAD_MEETINGS_ERROR,  
  SAVE_MEETING_BEGIN,  
  SAVE_MEETING_SUCCESS,  
  SAVE_MEETING_ERROR,  
  DELETE_MEETING_SUCCESS,  
  DELETE_MEETING_BEGIN,  
  DELETE_MEETING_ERROR,
  UPDATE_INVITEE_LIST
} from '../services/course/actions';


//invitees: Array, userId: Number, timeStarted: Date, timeEnded: Date, duration: String, courseId: String, lessonId: String, courseTitle: String, lessonTitle: String, meetingUrl: String 

const initialState = {
    meetings:{}  
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
             
            //  action.payload.forEach( meeting => {
            //     draft.meetings[meeting.id] = meeting;
            //  })
             draft.meetings = action.payload;
              
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