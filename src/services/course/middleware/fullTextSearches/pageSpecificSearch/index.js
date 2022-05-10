import { 
navigate } from '@reach/router';

import {
COURSES } from 'services/course/actions/courses';

export const pageSpecificSearch = store => next =>  action => {
    switch(action.type){
        case COURSES:
            const course = action?.payload;
            navigateToContent(`/${course?.operatorBusinessName}/tutor/${course?.createdBy}/courses/${course?._id}`);
            next(action);
        return;
        default:
            next(action);
        return;
    };
};

function navigateToContent(path){
    navigate(path);
}