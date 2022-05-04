import { 
SET_ONLINEQUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN } from 'services/course/actions/onlinequestions';

import { 
SET_ONLINEANSWERS_MARKDOWN } from 'services/course/actions/onlineanswers';

import { 
SET_ONLINECOMMENTS_MARKDOWN } from 'services/course/actions/onlinecomments';

import { 
SET_USER_BIO_MARKDOWN } from 'services/course/actions/users';

import { 
SET_LESSON_MARKDOWN } from 'services/course/actions/lessons';

import {
SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';

import {
SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';

import { 
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

import {
saveEditorMarkDown } from 'services/course/middleware/editor/saveEditorMarkDown';

import {
pageUrl } from 'services/course/middleware/fullTextSearches/pageUrl';

export const editor = store => next =>  action => {
    switch(action.type){
        case SET_ONLINEQUESTION_MARKDOWN: 
        case SET_ONLINEANSWERS_MARKDOWN:    
        case SET_ONLINECOMMENTS_MARKDOWN: 
        case SET_USER_BIO_MARKDOWN:
        case SET_LESSON_MARKDOWN:   
        case SET_FORMFIELDANSWERS_MARKDOWN:
        case SET_FORMFIELDS_MARKDOWN:  
        case SET_NOTES_MARKDOWN:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchMarkDownContent', action.payload?.element?.markDownContent, pageUrl( action, action.payload?.element ) ); 
            next(action);
        return;
        case SET_EXPLANATION_ANSWER_MARKDOWN:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchExplanationMarkDownContent', action.payload?.element?.answerExplanationMarkDownContent, pageUrl( action, action.payload?.element ) ); 
            next(action);
        return;
            default:
            next(action);
        return;
    };
};