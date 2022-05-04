import { 
ADD_FORMFIELDANSWERS_SUCCESS,
SAVE_FORMFIELDANSWERS_SUCCESS,
ADD_ANSWER_POINTS } from 'services/course/actions/formfieldanswers';

import {
ADD_FORMBUILDER_SUCCESS,
SAVE_FORMBUILDER_SUCCESS } from 'services/course/actions/formbuilders';

import {
SAVE_FORMFIELDS_SUCCESS_MW } from 'services/course/actions/formfields';

import {
ADD_MISSED_ANSWERS_SUCCESS } from 'services/course/actions/missedanswers';

import {
assignPointsToQuestionForCorrectAnswer } from 'services/course/middleware/builder/formFields/points';

import {
getMissedAnswers } from 'services/course/middleware/builder/formFields/missedAnswers';

import {
redirectToFormAfterAddingNewFormBuilder } from 'services/course/middleware/builder/formFields/forms';

import {
updateFormFields } from 'services/course/middleware/builder/formFields/fields';

export const builder = store => next =>  action => {
    switch(action.type){
        
        case ADD_ANSWER_POINTS:  
            assignPointsToQuestionForCorrectAnswer( store, action.payload );  
            next(action);
        return;
        case ADD_FORMFIELDANSWERS_SUCCESS:  
            assignPointsToQuestionForCorrectAnswer( store, action.payload );  
            next(action);
        return;
        case SAVE_FORMFIELDANSWERS_SUCCESS:  
            assignPointsToQuestionForCorrectAnswer( store, action.payload  );  
            next(action);
        return;
        case ADD_FORMBUILDER_SUCCESS:  
        case SAVE_FORMBUILDER_SUCCESS:
            redirectToFormAfterAddingNewFormBuilder( store, action.type, action.payload  );  
            next(action);
        return;
        case SAVE_FORMFIELDS_SUCCESS_MW:
            updateFormFields( store, action.payload  );  
            next(action);
        return;
        case ADD_MISSED_ANSWERS_SUCCESS:
            getMissedAnswers( store, action.payload  );  
            next(action);
        return;
            default:
            next(action);
        return;
    };
};