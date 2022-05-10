import {
add,
update,
remove,
get,
updateUser } from 'services/course/api';

export const ADD_COURSE_BEGIN = "ADD COURSE BEGIN";
export const ADD_COURSE_SUCCESS = "ADD COURSE SUCCESS";
export const ADD_COURSE_ERROR = "ADD COURSE ERROR";
export const LOAD_COURSES_BEGIN = "LOAD COURSES BEGIN";
export const LOAD_COURSES_SUCCESS = "LOAD COURSES SUCCESS";
export const LOAD_COURSES_ERROR = "LOAD COURSES ERROR";
export const OPEN_NEW_COURSE_MODAL = "OPEN NEW COURSE MODAL";
export const CLOSE_NEW_COURSE_MODAL = "CLOSE NEW COURSE MODAL";
export const SAVE_COURSE_BEGIN = "SAVE COURSE BEGIN";    
export const SAVE_COURSE_SUCCESS = "SAVE COURSE SUCCESS";
export const SAVE_COURSE_ERROR = "SAVE COURSE ERROR";
export const DELETE_COURSE_SUCCESS = "DELETE COURSE SUCCESS";
export const DELETE_COURSE_BEGIN = "DELETE LESSON BEGIN";
export const DELETE_COURSE_ERROR = "DELETE LESSON ERROR";
export const USER_UPDATED = "USER UPDATED";
export const LAST_LOGGEDIN_USER = "LAST LOGGEDIN USER";
export const LESSONPLAN_DROPDOWN_COURSE = "LESSONPLAN DROPDOWN COURSE";
export const COURSES = "COURSES";

export const addNewCourse = ( newCourse ) => {
    return dispatch => {   
       dispatch({ type: ADD_COURSE_BEGIN });
       return add(newCourse, '/courses')
        .then(course => {
           dispatch({ type: ADD_COURSE_SUCCESS, payload: { course, user: newCourse?.user } }); 
        })
         .catch(error => { 
            dispatch({ type: ADD_COURSE_ERROR, error });
        });
    };
};

export const saveCourse = ( course ) => {
    return dispatch => {
        dispatch({ type: SAVE_COURSE_BEGIN });
        return update( course, `/courses/`)
            .then( course => {  
                dispatch({        
                type: SAVE_COURSE_SUCCESS, payload: course }); 
            }).catch( error => {
                dispatch({ type: SAVE_COURSE_ERROR , error });
        });
    };
};

export const deleteCourse = course => {
   return dispatch => {
       dispatch({ type: DELETE_COURSE_BEGIN });
        return remove( course, `/courses/`)
        .then( () => {
            dispatch({ type: DELETE_COURSE_SUCCESS, payload: course });
        })
          .catch( error => {
              dispatch({ type: DELETE_COURSE_ERROR , error });
        });
   };
};

export const loadCourses = () => {
    return dispatch => {
        dispatch({ type: LOAD_COURSES_BEGIN });
        get(`/courses`)
        .then( course => {
            dispatch({ type: LOAD_COURSES_SUCCESS, payload: course });
        })
        .catch( error => {
            dispatch({ type: LOAD_COURSES_ERROR , error });
        });
    };
};

export const unSubscribeFromCourse = ( currentUser, courseId, sessionId ) => {
    return dispatch => {
        let courseList = currentUser?.courses?.filter(id => id !== courseId);
        let sessions = currentUser?.sessions?.filter(id => id !== sessionId);

        updateUser({ ...currentUser, courses: courseList, sessions: sessions })
         .then( user => {
            dispatch({ type: LAST_LOGGEDIN_USER, payload: user });   
         })
          .catch( error => console.log( error )); 
    };
};

export const selectCourseFromLessonPlanCourseDropDown = course => ({
    type: LESSONPLAN_DROPDOWN_COURSE,
    payload: course
});

 
export const openNewCourseModal = () => ({
    type: OPEN_NEW_COURSE_MODAL
});

export const closeNewCourseModal = () => ({
   type: CLOSE_NEW_COURSE_MODAL
});
