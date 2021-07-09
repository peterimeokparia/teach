import {
updateUser } from 'Services/course/Api';

import { 
LAST_LOGGEDIN_USER } from 'Services/course/Actions/Users';

export const updateCourseCreatorAfterAddingNewCourse = ( course, store ) => {
    try {
        let user = { ...course?.user, courses: [ ...course?.user?.courses, course?.course?._id ]};

        updateUser( user );
        store?.dispatch({ type: LAST_LOGGEDIN_USER, payload: user });        
    } catch (error) {
        throw Error(`Problem with adding a course: ${ error }`);
    }
};