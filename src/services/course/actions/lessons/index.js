import {
add,
remove,
update,
getById } from 'services/course/api';

export const ADD_NEW_LESSON_BEGIN = "ADD NEW LESSON BEGIN";
export const ADD_NEW_LESSON_SUCCESS = "ADD NEW LESSON SUCCESS";
export const ADD_NEW_LESSON_ERROR = "ADD NEW LESSON ERROR";
export const LOAD_LESSONS_BEGIN = "LOAD LESSONS BEGIN";
export const LOAD_LESSONS_SUCCESS = "LOAD LESSONS SUCCESS";
export const LOAD_LESSONS_ERROR = "LOAD LESSONS ERROR";
export const SAVE_LESSON_BEGIN = "SAVE LESSON BEGIN";
export const SAVE_LESSON_SUCCESS = "SAVE LESSON SUCCESS";
export const SAVE_LESSON_ERROR = "SAVE LESSON ERROR";
export const RESET_LESSON_ERROR = "RESET LESSON ERROR";
export const DELETE_LESSON_SUCCESS = "DELETE LESSON SUCCESS";
export const DELETE_LESSON_BEGIN = "DELETE LESSON BEGIN";
export const DELETE_LESSON_ERROR = "DELETE LESSON ERROR";
export const SET_LESSON_MARKDOWN = "SET LESSON MARKDOWN";
export const SELECTED_LESSON_URL = "SELECTED LESSON URL";
export const LESSON_IN_PROGRESS = "LESSON IN PROGRESS";
export const TOGGLE_BOARD_OR_EDITOR = "TOGGLE BOARD OR EDITOR";
export const VIDEO_URL = "VIDEO URL";
export const SELECTED_LESSONPLAN_LESSON = "SELECTED LESSONPLAN LESSON";
export const LESSONPLAN_URL = "LESSONPLAN URL";
export const LESSONPLAN_COURSE = "LESSONPLAN COURSE";
export const LESSONPLAN_DROPDOWN_LESSON = "LESSONPLAN DROPDOWN LESSON";
export const START_NEW_LESSON_SUCCESS = "START NEW LESSON SUCCESS";

export const addNewLesson = ( title, introduction,  courseId, lessonDate, userId ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_LESSON_BEGIN });
        return add({ title, introduction, courseId, lessonDate, userId }, '/lessons')  
        .then( lesson => { 
            dispatch({ type: ADD_NEW_LESSON_SUCCESS, payload: lesson }); 
            return lesson;
        }).catch( error => {
            dispatch({ type: ADD_NEW_LESSON_ERROR , payload: { error, title } });
        });
    };
};

export const saveLesson = ( lesson ) => {
   return dispatch => {
        dispatch({ type: SAVE_LESSON_BEGIN });
        return update( lesson, `/lessons/` )
            .then( lesson => {  
                dispatch({        
                type: SAVE_LESSON_SUCCESS, payload: lesson }); 
                return lesson;
            }).catch( error => {
                dispatch({ type: SAVE_LESSON_ERROR , error });
        });  
   };
};

export const loadLessons = ( courseId ) => {
    return dispatch => {
        dispatch({ type: LOAD_LESSONS_BEGIN });
        return getById( courseId, `/lessons?courseId=`)
            .then( lesson => {
                dispatch({ type: LOAD_LESSONS_SUCCESS, payload: lesson });
                return lesson;
            })
            .catch( error => {
                dispatch({ type: LOAD_LESSONS_ERROR , error });
        });
    };
};

export const deleteLesson = lesson => {
    return dispatch => {
        dispatch({ type: DELETE_LESSON_BEGIN });
         return remove( lesson, `/lessons/` )
         .then( () => {
             dispatch({ type: DELETE_LESSON_SUCCESS, payload: lesson });
         }).catch( error => {
            dispatch({ type: DELETE_LESSON_ERROR , error });
        });
    };
};

export const selectLessonFromLessonPlanDropDown = lesson => ({
    type: LESSONPLAN_DROPDOWN_LESSON,
    payload: lesson
});

export const setLessonInProgressStatus = () => ({
    type: LESSON_IN_PROGRESS
});

export const getLessonVideoUrl = ( lesson, videoUrl) => {
    return dispatch => {
        dispatch({ type: SELECTED_LESSON_URL, payload: { lesson, videoUrl } });
    };
};

export const toggleTeachBoardOrEditor = () => ({
    type: TOGGLE_BOARD_OR_EDITOR
});

export const resetLessonError = () => ({
    type: RESET_LESSON_ERROR
});

export const setCurrentLesson = lesson => ({
    type: SELECTED_LESSONPLAN_LESSON,
    payload: lesson
});

export const setLessonPlanUrl = link => ({
    type: LESSONPLAN_URL,
    payload: link
});

export const setLessonCourse = course => ({
    type: LESSONPLAN_COURSE,
    payload: course
});

export const startLesson = startLessonProps => ({
    type: START_NEW_LESSON_SUCCESS,
    payload: startLessonProps
});