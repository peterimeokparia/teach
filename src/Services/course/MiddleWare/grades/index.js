import { 
ADD_NEW_GRADE_SUCCESS } from 'Services/course/Actions/Grades';

import {
updateUserAfterAddingNewGrades } from 'Services/course/MiddleWare/grades/helpers';

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