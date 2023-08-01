import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_LESSON_DETAIL_LESSON_BEGIN = "ADD NEW LESSON DETAIL LESSON BEGIN";
export const ADD_NEW_LESSON_DETAIL_LESSON_SUCCESS = "ADD NEW LESSON DETAIL LESSON SUCCESS";
export const ADD_NEW_LESSON_DETAIL_LESSON_ERROR = "ADD NEW LESSON DETAIL LESSON ERROR";
export const LOAD_LESSON_DETAIL_LESSONS_BEGIN = "LOAD LESSON DETAIL LESSONS BEGIN";
export const LOAD_LESSON_DETAIL_LESSONS_SUCCESS = "LOAD LESSON DETAIL LESSONS SUCCESS";
export const LOAD_LESSON_DETAIL_LESSONS_ERROR = "LOAD LESSON DETAIL LESSONS ERROR";
export const SAVE_LESSON_DETAIL_LESSON_BEGIN = "SAVE LESSON DETAIL LESSON BEGIN";
export const SAVE_LESSON_DETAIL_LESSON_SUCCESS = "SAVE LESSON DETAIL LESSON SUCCESS";
export const SAVE_LESSON_DETAIL_LESSON_ERROR = "SAVE LESSON DETAIL LESSON ERROR";
export const RESET_LESSON_DETAIL_LESSON_ERROR = "RESET LESSON DETAIL LESSON ERROR";
export const DELETE_LESSON_DETAIL_LESSON_SUCCESS = "DELETE LESSON DETAIL LESSON SUCCESS";
export const DELETE_LESSON_DETAIL_LESSON_BEGIN = "DELETE LESSON DETAIL LESSON BEGIN";
export const DELETE_LESSON_DETAIL_LESSON_ERROR = "DELETE LESSON DETAIL LESSON ERROR";
export const SET_LESSON_DETAIL_LESSON_MARKDOWN = "SET LESSON DETAIL LESSON MARKDOWN";
export const SELECTED_LESSON_DETAIL_LESSON_URL = "SELECTED LESSON DETAIL LESSON URL";
export const SELECTED_LESSON_DETAIL_LESSON = "SELECTED LESSON DETAIL LESSON";
export const LESSON_DETAIL_LESSON_URL = "LESSON DETAIL LESSON URL";
export const LESSON_DETAIL_LESSON_IN_PROGRESS = "LESSON_DETAIL LESSON IN PROGRESS";
export const TOGGLE_BOARD_OR_EDITOR = "TOGGLE BOARD OR EDITOR";
export const LESSON_DETAIL_LESSON_COURSE = "LESSON DETAIL LESSON COURSE";
export const START_NEW_LESSON_DETAIL_LESSON_SUCCESS = "START NEW LESSON DETAIL LESSON SUCCESS";
export const HANDLE_CURRENT_LESSON_DETAIL_LESSON_MEETING = "HANDLE CURRENT LESSON DETAIL LESSON MEETING";
export const HANDLE_CURRENT_LESSON_DETAIL_LESSON_ITEMS = "HANDLE CURRENT LESSON DETAIL LESSON ITEMS";

export const addNewLessonDetailLesson = ( lessonDetail ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSON_BEGIN });
        return add( lessonDetail, '/lessondetail')  
        .then( lessondetail => { 
            dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSON_SUCCESS, payload: lessondetail }); 
            return lessondetail;
        }).catch( error => {
            dispatch({ type: ADD_NEW_LESSON_DETAIL_LESSON_ERROR , payload: { error, title: lessonDetail?.title } });
        });
    };
};

export const saveLessonDetailLesson = ( lessonDetail ) => {
   return dispatch => {
        dispatch({ type: SAVE_LESSON_DETAIL_LESSON_BEGIN });
        return update( lessonDetail, `/lessondetail/` )
            .then( lessondetail => {  
                dispatch({        
                type: SAVE_LESSON_DETAIL_LESSON_SUCCESS, payload: lessondetail }); 
                return lessondetail;
            }).catch( error => {
                dispatch({ type: SAVE_LESSON_DETAIL_LESSON_ERROR , error });
        });  
   };
};

export const loadLessonDetailLessonsById = ( lessonDetailId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_BEGIN });
        return getById( lessonDetailId, `/lessondetail?lessonDetailId=`)
            .then( lessondetail => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_SUCCESS, payload: lessondetail });
                return lessondetail;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonsByCourseId = ( courseId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_BEGIN });
        return getById( courseId, `/lessondetail?courseId=`)
            .then( lessondetail => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_SUCCESS, payload: lessondetail });
                return lessondetail;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonsByLessonId = ( lessonId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_BEGIN });
        return getById( lessonId, `/lessondetail?lessonId=`)
            .then( lessondetail => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_SUCCESS, payload: lessondetail });
                return lessondetail;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_ERROR , error });
        });
    };
};

export const loadLessonDetailLessonsByUserId = ( userId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_BEGIN });
        return getById( userId, `/lessondetail?userId=`)
            .then( lessondetail => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_SUCCESS, payload: lessondetail });
                return lessondetail;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSON_DETAIL_LESSONS_ERROR , error });
        });
    };
};

export const deleteLessonDetailLesson = lessonDetail => {
    return dispatch => {
        dispatch({ type: DELETE_LESSON_DETAIL_LESSON_BEGIN });
         return remove( lessonDetail, `/lessondetail/` )
         .then( () => {
             dispatch({ type: DELETE_LESSON_DETAIL_LESSON_SUCCESS, payload: lessonDetail });
         }).catch( error => {
            dispatch({ type: DELETE_LESSON_DETAIL_LESSON_ERROR , error });
        });
    };
};

export const setLessonDetailLessonInProgressStatus = () => ({
    type: LESSON_DETAIL_LESSON_IN_PROGRESS
});

export const getLessonDetailLessonVideoUrl = ( lessonDetail, videoUrl) => {
    return dispatch => {
        dispatch({ type: SELECTED_LESSON_DETAIL_LESSON_URL, payload: { lessonDetail, videoUrl } });
    };
};

export const toggleTeachBoardOrEditor = () => ({
    type: TOGGLE_BOARD_OR_EDITOR
});

export const resetLessonDetailLessonError = () => ({
    type: RESET_LESSON_DETAIL_LESSON_ERROR
});

export const setCurrentLessonDetailLesson = lesson => ({
    type: SELECTED_LESSON_DETAIL_LESSON,
    payload: lesson
});

export const setLessonDetailLessonUrl = link => ({
    type: LESSON_DETAIL_LESSON_URL,
    payload: link
});

export const setLessonDetailLessonCourse = course => ({
    type: LESSON_DETAIL_LESSON_COURSE,
    payload: course
});

export const startLessonDetailLesson = startLessonDetailLessonProps => ({
    type: START_NEW_LESSON_DETAIL_LESSON_SUCCESS,
    payload: startLessonDetailLessonProps
});

export const handleCurrentLessonDetailLessonMeeting = meetingProps => ({
    type: HANDLE_CURRENT_LESSON_DETAIL_LESSON_MEETING,
    payload: meetingProps
});

export const handleCurrentLessonDetailLessonItems = lessonDetailLessonProps => ({
    type: HANDLE_CURRENT_LESSON_DETAIL_LESSON_ITEMS,
    payload: lessonDetailLessonProps
});
