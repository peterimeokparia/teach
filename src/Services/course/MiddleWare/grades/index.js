import { 
ADD_NEW_GRADE_SUCCESS } from 'services/course/actions/grades';

import {
updateUserAfterAddingNewGrades } from 'services/course/middleware/grades/helpers';

export const grades = store => next =>  action => {
    switch(action.type){
        
        case ADD_NEW_GRADE_SUCCESS:
            updateUserAfterAddingNewGrades( action.payload, store ); 
            next(action);
        return;
        default:
            next(action);
        return;
        
    };
};