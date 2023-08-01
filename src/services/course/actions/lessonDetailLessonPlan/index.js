import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_LESSON_DETAIL_LESSONPLAN_BEGIN = "ADD NEW LESSON DETAIL LESSONPLAN BEGIN";
export const ADD_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS = "ADD NEW LESSON DETAIL LESSONPLAN SUCCESS";
export const ADD_NEW_LESSON_DETAIL_LESSONPLAN_ERROR = "ADD NEW LESSON DETAIL LESSONPLAN ERROR";
export const LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN = "LOAD LESSON DETAIL LESSONPLANS BEGIN";
export const LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS = "LOAD LESSON DETAIL LESSONPLANS SUCCESS";
export const LOAD_LESSON_DETAIL_LESSONPLANS_ERROR = "LOAD LESSON DETAIL LESSONPLANS ERROR";
export const SAVE_LESSON_DETAIL_LESSONPLAN_BEGIN = "SAVE LESSON DETAIL LESSONPLAN BEGIN";
export const SAVE_LESSON_DETAIL_LESSONPLAN_SUCCESS = "SAVE LESSON DETAIL LESSONPLAN SUCCESS";
export const SAVE_LESSON_DETAIL_LESSONPLAN_ERROR = "SAVE LESSON DETAIL LESSONPLAN ERROR";
export const RESET_LESSON_DETAIL_LESSONPLAN_ERROR = "RESET LESSON DETAIL LESSONPLAN ERROR";
export const DELETE_LESSON_DETAIL_LESSONPLAN_SUCCESS = "DELETE LESSON DETAIL LESSONPLAN SUCCESS";
export const DELETE_LESSON_DETAIL_LESSONPLAN_BEGIN = "DELETE LESSON DETAIL LESSONPLAN BEGIN";
export const DELETE_LESSON_DETAIL_LESSONPLAN_ERROR = "DELETE LESSON DETAIL LESSONPLAN ERROR";
export const SET_LESSON_DETAIL_LESSONPLAN_MARKDOWN = "SET LESSON DETAIL LESSONPLAN MARKDOWN";
export const SELECTED_LESSON_DETAIL_LESSONPLAN_VIDEO_URL = "SELECTED LESSON DETAIL LESSONPLAN VIDEO URL";
export const SELECTED_LESSON_DETAIL_LESSONPLAN_LESSON = "SELECTED LESSON DETAIL LESSONPLAN LESSON";
export const SELECTED_LESSON_DETAIL_LESSONPLAN = "SELECTED LESSON DETAIL LESSONPLAN";
export const VIDEO_URL = "VIDEO URL";
export const LESSON_DETAIL_LESSONPLAN_URL = "LESSON DETAIL LESSONPLAN URL";
export const LESSON_DETAIL_LESSONPLAN_IN_PROGRESS = "LESSON DETAIL LESSONPLAN IN PROGRESS";
export const LESSON_DETAIL_LESSONPLAN_COURSE = "LESSON DETAIL LESSONPLAN COURSE";
export const START_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS = "START NEW LESSON DETAIL LESSONPLAN SUCCESS";
export const HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_MEETING = "HANDLE CURRENT LESSON DETAIL LESSONPLAN MEETING";
export const HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_ITEMS = "HANDLE CURRENT LESSON DETAIL LESSONPLAN ITEMS";

export const addNewLessonDetailLessonPlan = ( lessonDetailLessonPlan ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSONPLAN_BEGIN });
        return add( lessonDetailLessonPlan, '/lessondetailplan')  
        .then( lessondetailplan => { 
            dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS, payload: lessondetailplan }); 
            return lessondetailplan;
        }).catch( error => {
            dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSONPLAN_ERROR , payload: { error, title: lessonDetailLessonPlan?.title } });
        });
    };
};

export const saveLessonDetailLessonPlan = ( lessonDetailLessonPlan ) => {
   return dispatch => {
        dispatch({ type: SAVE_LESSON_DETAIL_LESSONPLAN_BEGIN });
        return update( lessonDetailLessonPlan, `/lessondetailplan/` )
            .then( lessondetailplan => {  
                dispatch({        
                type: SAVE_LESSON_DETAIL_LESSONPLAN_SUCCESS, payload: lessondetailplan }); 
                return lessondetailplan;
            }).catch( error => {
                dispatch({ type: SAVE_LESSON_DETAIL_LESSONPLAN_ERROR , error });
        });  
   };
};

export const loadLessonDetailLessonPlanId = ( lessonDetailLessonPlanId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN });
        return getById( lessonDetailLessonPlanId, `/lessondetailplan?lessonDetailLessonPlanId=`)
            .then( lessondetailplan => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS, payload: lessondetailplan });
                return lessondetailplan;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonPlansByCourseId = ( courseId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN });
        return getById( courseId, `/lessondetailplan?courseId=`)
            .then( lessondetailplan => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS, payload: lessondetailplan });
                return lessondetailplan;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonPlansByLessonId = ( lessonId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN });
        return getById( lessonId, `/lessondetailplan?lessonId=`)
            .then( lessondetailplan => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS, payload: lessondetailplan });
                return lessondetailplan;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonPlansByUserId = ( userId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_BEGIN });
        return getById( userId, `/lessondetailplan?userId=`)
            .then( lessondetailplan => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_SUCCESS, payload: lessondetailplan });
                return lessondetailplan;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONPLANS_ERROR , error });
        });
    };
};

export const deleteLessonDetailLessonPlan = lessonDetailLessonPlan => {
    return dispatch => {
        dispatch({ type: DELETE_LESSON_DETAIL_LESSONPLAN_BEGIN });
         return remove( lessonDetailLessonPlan, `/lessondetailplan/` )
         .then( () => {
             dispatch({ type: DELETE_LESSON_DETAIL_LESSONPLAN_SUCCESS, payload: lessonDetailLessonPlan });
         }).catch( error => {
            dispatch({ type: DELETE_LESSON_DETAIL_LESSONPLAN_ERROR , error });
        });
    };
};


export const getLessonDetailLessonPlanVideoUrl = ( lessonDetailLessonPlan, videoUrl) => {
    return dispatch => {
        dispatch({ type: SELECTED_LESSON_DETAIL_LESSONPLAN_VIDEO_URL, 
            payload: { lessonDetailLessonPlan, videoUrl } });
    };
};

export const resetLessonDetailLessonPlanError = () => ({
    type: RESET_LESSON_DETAIL_LESSONPLAN_ERROR
});

export const setSelectedLessonDetailLessonPlanLesson = lesson => ({
    type: SELECTED_LESSON_DETAIL_LESSONPLAN_LESSON,
    payload: lesson
});

export const setCurrentLessonDetailLessonPlan = lessonPlan => ({
    type: SELECTED_LESSON_DETAIL_LESSONPLAN,
    payload: lessonPlan
});

export const setLessonDetailLessonPlanUrl = link => ({
    type: LESSON_DETAIL_LESSONPLAN_URL,
    payload: link
});

export const setLessonDetailLessonPlanCourse = course => ({
    type: LESSON_DETAIL_LESSONPLAN_COURSE,
    payload: course
});

export const setLessonDetailLessonPlanInProgress = toggleStatus => ({
    type: LESSON_DETAIL_LESSONPLAN_IN_PROGRESS,
    payload: toggleStatus
});

export const startLessonDetailLessonPlan = startLessonDetailLessonProps => ({
    type: START_NEW_LESSON_DETAIL_LESSONPLAN_SUCCESS,
    payload: startLessonDetailLessonProps
});

export const handleCurrentLessonDetailLessonPlanMeeting = meetingProps => ({
    type: HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_MEETING,
    payload: meetingProps
});

export const handleCurrentLessonDetailLessonPlanItems = lessonDetailLessonPlanLessonProps => ({
    type: HANDLE_CURRENT_LESSON_DETAIL_LESSONPLAN_ITEMS,
    payload: lessonDetailLessonPlanLessonProps
});
