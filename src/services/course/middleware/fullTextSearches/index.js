import { 
SAVE_NOTE_SUCCESS } from 'services/course/actions/notes';

import { 
ADD_COURSE_SUCCESS,
SAVE_COURSE_SUCCESS } from 'services/course/actions/courses';

import { 
ADD_NEW_LESSON_SUCCESS,
SAVE_LESSON_SUCCESS } from 'services/course/actions/lessons';

import { 
ADD_FORMFIELDS_SUCCESS,
SAVE_FORMFIELDS_SUCCESS } from 'services/course/actions/formfields';

import {
saveEditorMarkDown } from 'services/course/middleware/editor/saveEditorMarkDown';

import {
buildSearchContent } from 'services/course/middleware/fullTextSearches/indexMarkDownContent';

import {
pageUrl } from 'services/course/middleware/fullTextSearches/pageUrl';

export const fullTextSearches = store => next =>  action => {
    switch(action.type){
        case SAVE_NOTE_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.title, action.payload?.content ), pageUrl( action, action.payload ) );
            next(action);
        return;
        case ADD_COURSE_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.name, action.payload?.description ), pageUrl( action, action.payload ) );
            next(action);
        return;
        case SAVE_COURSE_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.name, action.payload?.description ), pageUrl( action, action.payload ) );  
            next(action);
        return;
        case ADD_NEW_LESSON_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.title, action.payload?.introduction ), pageUrl( action, action.payload ) );  
            next(action);
        return;
        case SAVE_LESSON_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.title, action.payload?.introduction ), pageUrl( action, action.payload ) );
            next(action);
        return;
        case ADD_FORMFIELDS_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.formName, action.payload?.inputValue ), pageUrl( action, action.payload ) ); 
            next(action);
        return;
        case SAVE_FORMFIELDS_SUCCESS:
            saveEditorMarkDown( store, action.payload, 'fullTextSearchContent', buildSearchContent( action.payload?.formName, action.payload?.inputValue ), pageUrl( action, action.payload ) );  
            next(action);
        return;
            default:
            next(action);
        return;
    };
};