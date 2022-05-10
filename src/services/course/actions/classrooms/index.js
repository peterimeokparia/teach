import {
add,
update,
remove,
get,
updateUser } from 'services/course/api';

export const RESET_CLASSROOM_USER_ERROR = "RESET CLASSROOM USER ERROR";
export const ADD_CLASSROOM_BEGIN = "ADD CLASSROOM BEGIN";
export const ADD_CLASSROOM_SUCCESS = "ADD CLASSROOM SUCCESS";
export const ADD_CLASSROOM_ERROR = "ADD CLASSROOM ERROR";
export const LOAD_CLASSROOMS_BEGIN = "LOAD CLASSROOMS BEGIN";
export const LOAD_CLASSROOMS_SUCCESS = "LOAD CLASSROOMS SUCCESS";
export const OPEN_NEW_CLASSROOM_MODAL = "OPEN NEW CLASSROOM MODAL";
export const CLOSE_NEW_CLASSROOM_MODAL = "CLOSE NEW CLASSROOM MODAL";
export const LOAD_CLASSROOMS_ERROR = "LOAD CLASSROOMS ERROR";
export const SAVE_CLASSROOM_BEGIN = "SAVE CLASSROOM BEGIN";
export const SAVE_CLASSROOM_SUCCESS = "SAVE CLASSROOM SUCCESS";
export const SAVE_CLASSROOM_ERROR = "SAVE CLASSROOM ERROR";
export const DELETE_CLASSROOM_SUCCESS = "DELETE CLASSROOM SUCCESS";
export const DELETE_CLASSROOM_BEGIN = "DELETE CLASSROOM BEGIN";
export const DELETE_CLASSROOM_ERROR = "DELETE CLASSROOM ERROR";
export const UPDATE_CURRENT_CLASSROOM_TUTOR = "UPDATE CURRENT CLASSROOM TUTOR";
export const UPDATE_CURRENT_CLASSROOM_LESSON_PLAN = "UPDATE CURRENT CLASSROOM LESSON PLAN";
export const TOGGLE_SIDEBAR_DROPDOWN_MENU = "TOGGLE SIDEBAR DROPDOWN MENU";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const ENABLE_TEACH_PLATFORM = "ENABLE TEACH PLATFORM";
export const ADD_MEETING_EVENT_TO_CALENDAR = "ADD MEETING EVENT TO CALENDAR";

export const loadClassRooms = () => {
    return dispatch => {
        dispatch({ type: LOAD_CLASSROOMS_BEGIN });
        get('/classrooms')
         .then( classroom => {
            dispatch({ type: LOAD_CLASSROOMS_SUCCESS, payload: classroom });
         }).catch( error => {
            dispatch({ type: LOAD_CLASSROOMS_ERROR , error });
        });
    };
};

export const addNewClassRoom = ( name, description, classRoomUsers,  user, operator ) => {
    return dispatch => {
       user = { ...user,  classRooms: user?.classRooms, operatorId: operator?._id };
        dispatch({ type: ADD_CLASSROOM_BEGIN });
        return add( { name, description, classRoomUsers, userId: user?._id, operatorId: operator?._id} , '/classrooms')
        .then(classroom => {
           dispatch({ type: ADD_CLASSROOM_SUCCESS, payload: { classroom, user, classRoomUsers } });
        }).catch(error => { 
           dispatch({ type: ADD_CLASSROOM_ERROR, error });
     });
    };
};

export const saveClassRoom = ( classroom ) => {
   return dispatch => {
        dispatch({ type: SAVE_CLASSROOM_BEGIN });
        return update( classroom, `/classrooms/` )
         .then( classroom => {  
             dispatch({        
              type: SAVE_CLASSROOM_SUCCESS, payload: { classroom } }); 
          }).catch( error => {
              dispatch({ type: SAVE_CLASSROOM_ERROR , error });
        });        
   };
};

export const deleteClassRoom = classroom => {
   return dispatch => {
       dispatch({ type: DELETE_CLASSROOM_BEGIN });
        return remove( classroom, `/classrooms/` )
        .then( () => {
            dispatch({ type: DELETE_CLASSROOM_SUCCESS, payload: classroom });
        }).catch( error => {
            dispatch({ type: DELETE_CLASSROOM_ERROR , error });
        });
   };
};

export const unSubscribe = ( currentUser, itemId ) => {
    return dispatch => {
       let classRooms = currentUser.classRooms.filter( classroom => ! classroom.includes(itemId) );
       
        return updateUser({ ...currentUser, classRooms });
    };
};

export const enableTeachPlatform = ( meeting ) => {
    return dispatch => {
        dispatch( { type: ENABLE_TEACH_PLATFORM , payload: meeting });
    };
};

export const updateCurrentTutor = ( currentTutor ) => {
    return dispatch => {
       dispatch({ type: UPDATE_CURRENT_CLASSROOM_TUTOR, payload: currentTutor });
    };
};

export const updateCurrentClassRoomLessonPlan = ( lessonPlan ) => {
    return dispatch => {
       dispatch({ type: UPDATE_CURRENT_CLASSROOM_LESSON_PLAN, payload: lessonPlan });
    };
};

export const addMeetingEventToUsersCalendar = ( meeting ) => {
    return dispatch => {
       dispatch({ type: ADD_MEETING_EVENT_TO_CALENDAR, payload: meeting });
    };
};

export const toggleClassRoomSideBarDropDownDisplay = () => ({
    type: TOGGLE_SIDEBAR_DROPDOWN_MENU
});

export const resetClassRoomUserError = () => ({
    type: RESET_CLASSROOM_USER_ERROR
});

export const openNewClassRoomModal = () => ({
    type: OPEN_NEW_CLASSROOM_MODAL
});

export const closeNewClassRoomModal = () => ({
   type: CLOSE_NEW_CLASSROOM_MODAL
});