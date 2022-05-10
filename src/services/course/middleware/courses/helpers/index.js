import {
    updateUser } from 'services/course/api';
    
    import { 
    LAST_LOGGEDIN_USER } from 'services/course/actions/users';
    
    export const updateCourseCreatorAfterAddingNewCourse = ( course, store ) => {
        try {
            let user = { ...course?.user, courses: [ ...course?.user?.courses, course?.course?._id ]};
    
            updateUser( user );
            store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: user });        
        } catch (error) {
            throw Error(`Problem with adding a course: ${ error }`);
        }
    };