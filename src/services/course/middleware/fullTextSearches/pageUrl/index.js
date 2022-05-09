import { 
SET_ONLINEQUESTION_MARKDOWN,
SET_EXPLANATION_ANSWER_MARKDOWN } from 'services/course/actions/onlinequestions';

import { 
SET_ONLINEANSWERS_MARKDOWN } from 'services/course/actions/onlineanswers';

import { 
SET_ONLINECOMMENTS_MARKDOWN } from 'services/course/actions/onlinecomments';

import {
SET_FORMFIELDANSWERS_MARKDOWN } from 'services/course/actions/formfieldanswers';

import {
SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';

import { 
SET_NOTES_MARKDOWN,
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

export const pageUrl = ( action, element ) => {
    switch(action.type){
        case SET_ONLINEQUESTION_MARKDOWN: 
        case SET_ONLINEANSWERS_MARKDOWN:    
        case SET_ONLINECOMMENTS_MARKDOWN: 
        case SET_FORMFIELDANSWERS_MARKDOWN:
        case SET_FORMFIELDS_MARKDOWN:  
        case ADD_FORMFIELDS_SUCCESS:
        case SAVE_FORMFIELDS_SUCCESS:
        case SET_EXPLANATION_ANSWER_MARKDOWN:     
            return `/${sessionStorage.getItem('operatorBusinessName')}/formBuilder/${element?.formType}/${element?.formName}/${element?.courseId}/${element?.formUuId}/${element?.userId}/${element?.formBuilderStatus}/${element?.eventId}/${element?._id}`;
        case SAVE_NOTE_SUCCESS:
            return `/${sessionStorage.getItem('operatorBusinessName')}/board/${element?.eventId}`;
        case ADD_COURSE_SUCCESS:
        case SAVE_COURSE_SUCCESS:
            return `/${sessionStorage.getItem('operatorBusinessName')}/courses`;
        case SET_NOTES_MARKDOWN:
            return `/teach/notes/${element?._id}/noteType/${element?.noteType}/course/${element?.courseId}/lesson/${element?.lessonId}`;
            //return `/${sessionStorage.getItem('operatorBusinessName')}/courses`;
        case ADD_NEW_LESSON_SUCCESS:
        case SAVE_LESSON_SUCCESS:    
            return `/${sessionStorage.getItem('operatorBusinessName')}/tutor/${element?.selectedTutorId}/courses/${element?.courseId}/lessons/${element?.lessonId}`;
        default:
            return `/${sessionStorage.getItem('operatorBusinessName')}/courses`;;
    };
}