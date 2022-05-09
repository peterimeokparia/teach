import { 
createSelector}  from 'reselect';

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
elementMeta } from "services/course/pages/QuestionsPage/helpers";

import { 
role } from '../helpers/PageHelpers';

import {
LESSONNOTES,
STUDENTNOTES } from  "services/course/actions/notes";

const getUsers = state => state?.users?.users;
const getTutors = state => Object.values(state?.users?.users).filter(user => user?.role === role.Tutor);
const getCurrentUser = state => state.users.user;
const getLessons = state => state.lessons.lessons;
const getLessonId = (state, props) => props?.lessonId;
const getCalendars = state => state?.calendar?.calendars;
const getEvents = state => state?.events?.events;
const getEventId = (state, props) => props.eventId;
const getNoteType = (state, props) => props.noteType;
const getNoteId = (state, props) => props.noteId;
const getParsedCalendarId = ( state, props ) => props.calendarId;
const getParsedCourseId = ( state, props ) => props?.courseId;
const getParsedUserId = ( state, props ) => props?.currentUser?._id;
const getUserId = ( state, props ) => props?.userId;
const getQuestionId = ( state, props ) => props?.questionId;
const getFormFieldElementQuestionId = ( state, props ) => props?.formFieldElement?.questionId;
const getFormFieldElementId = ( state, props ) => props?.formFieldElement?._id;
const getFormFieldElementFormName = ( state, props ) => props?.formFieldElement?.formName;
const getFormFieldElementFieldPropsFormUuId = ( state, props ) => props?.fieldProps?.formUuId;
const getFormFieldElementFieldPropsUserId = ( state, props ) => props?.fieldProps?.userId;
const getCourseId = ( state, props ) => props?.courseId;
const getCalendarEventType = ( state, props ) => props?.calendarEventType;
const getCourses = state =>   state?.courses?.courses;
const getMeetings = state =>   state?.meetings?.meetings;
const getClassRoomGroups = state => state?.classrooms?.classrooms;
const getPushNotificationUsers = state => state?.notifications?.pushNotificationSubscribers;
const getOperators = state =>   state?.operators?.operators;
const getOperatorBusinessName = ( state, props ) => props?.operatorBusinessName;
const getTimeLines = state => state?.timeLines?.timeLines;
const getSessions = state => state?.sessions?.sessions;
const getOnlineAnswers = state => state?.onlineAnswers?.onlineAnswers;
const getFailedPushNotifications = state => state?.failedNotifications.failedPushNotifications;
const getFailedEmailNotifications = state => state?.failedNotifications.failedEmailNotifications;
const getFormFieldAnswers = state =>  state?.formFieldAnswers?.formFieldAnswers;
const getFormBuilders = state =>  state?.formBuilders?.formBuilders;
const getNotes = state => state?.notes?.notes;
// const getCurrentOperatorId = ( state, props ) => props?.operatorId;
// const parseCourseId = (state, props) => props.courseId;
// const getCurrentUser = state => state.users.user;
// const getParsedCourseId = ( state, props ) => parseInt( props.courseId, 10 );
// const parseCourseId = (state, props) => parseInt(props.courseId, 10);

export const failedOnlineQuestionNotificationQueueHasMessages = createSelector(
    getCurrentUser,
    getFailedPushNotifications,

    (user, failedPushNotifications) => {
        if ( ! user ) {
            return false;
        }
        console.log('user', user);
        return Object.values( failedPushNotifications )?.filter(notifications => notifications?.userId === user?._id )?.length > 0;
    }
);

export const getSortedRecords = (collection, itemKey) => {
    return collection?.sort((a, b) => {
        if( (b[itemKey] > a[itemKey]) ){
            return  -1;
        }
        else if( (b[itemKey] < a[itemKey]) ){
            return 1;
        }
        else{
            return 0;
        } 
    });
};

export const getSortedRecordsByDate = (collection, date) => {
    return collection?.sort((a, b) => {
        if( (new Date(b[date]) - new Date(a[date])) > 0 ){
            return  1;
        }
        else if( (new Date(b[date]) - new Date(a[date])) < 0 ){
            return -1;
        }
        else{
            return 0;
        } 
    });
};

export const getSortedLessonsSelector = createSelector( 
    getLessons,
    lessons  => Object.values(lessons)?.sort((a, b) => {
        if( a.id < b.id ){
            return  -1;
        }
        else if( a.id > b.id ){
            return 1;
        }
        else{
            return 0;
        } 
    }),           
);

export const getLessonByLessonIdSelector = createSelector( 
    getSortedLessonsSelector,
    getLessonId,
    (lessons , lessonId) => 
           lessons?.find(lesson =>  lesson?._id === lessonId)        
);

export const getLessonsByCourseIdSelector = createSelector( 
    getSortedLessonsSelector,
    getParsedCourseId,
    (lessons , courseId) => 
           lessons?.filter(lesson =>  lesson?.courseId === courseId)        
);

export const getCoursesByCourseIdSelector = createSelector( 
    getCourses,
    getParsedCourseId,
    (courses , courseId) => 
        Object.values(courses)?.find(course =>  course?._id === courseId)      
);

export const getCoursesByCreatedByIdSelector = createSelector( 
    getCourses,
    getParsedUserId,
    (courses , userId) => 
        Object.values(courses)?.find(course =>  course?.createdBy === userId)         
);

export const getMyCourseList = createSelector( 
    getCourses,
    getCurrentUser,
    (courses , user) => 
        Object.values(courses)?.filter(course => user?.courses?.includes(course?._id))         
);

export const getOperatorFromOperatorBusinessName = createSelector( 
    getOperators,
    getOperatorBusinessName,
    (operators , operatorBusinessName) => {
        let operator = Object.values(operators)?.find(operator =>  operator?.businessName === operatorBusinessName);
        
        if ( operator && operator !== null && operator !== "" && operator !== undefined  ) {
            setItemInSessionStorage('operator', operator);
        }

        if ( operatorBusinessName && operatorBusinessName !== null && operatorBusinessName !== "" && operatorBusinessName !== undefined  ) {
            setItemInSessionStorage('operatorBusinessName', operatorBusinessName);
        }
        return operator;
    }        
);

export const getUsersByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getUsers,
    (operators , operatorBusinessName, users) => 
         Object.values(users)?.filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)        
);

export const getCoursesByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getCourses,
    (operators , operatorBusinessName, courses) => 
       Object?.values(courses)?.filter(usr => usr?.operatorId === Object?.values(operators)?.find(operator =>  operator?.businessName === operatorBusinessName)?._id)       
);

export const getMeetingsByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getMeetings,
    (operators , operatorBusinessName, meetings) => 
       Object.values(meetings)?.filter(meeting => meeting?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
);

export const getSessionsByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getSessions,
    (operators , operatorBusinessName, sessions) => 
    {
        if ( sessions ) {
            return Object.values(sessions)?.filter(session => session?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)  
        }
    }       
);

export const getClassRoomGroupsByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getClassRoomGroups,
    (operators , operatorBusinessName, classRoomGroups) => 
         Object.values(classRoomGroups).filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)
);

export const getPushNotificationUsersByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getPushNotificationUsers,
    (operators , operatorBusinessName, pushNotificationUsers) => 
        Object.values(pushNotificationUsers).filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id) 
);

export const getCalendarEventsByCalendarIdSelector = createSelector( 
    getCalendars,
    getParsedCalendarId,
    (calendars , calendarId) => 
        Object.values(calendars)?.find(calendar =>  calendar?._id === calendarId)      
);

export const getCalendarByCalendarEventType = createSelector( 
    getCalendars,
    getCalendarEventType,
    (calendars, calendarEventType) => 
        Object.values(calendars)?.find(calendar =>  calendar?.calendarEventType === calendarEventType)      
);

export const getCalendarsByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getCalendars,
    (operators , operatorBusinessName, calendars) => 
         Object.values(calendars).filter(calendar => calendar?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
);

export const getEventsByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getEvents,
    getCalendarEventType,
    (operators , operatorBusinessName, events, calendarEventType) => 
         Object.values(events).filter(event => event?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id && event.calendarEventType === calendarEventType )       
);

export const getEventsByUserIdSelector = createSelector( 
    getEvents,
    getUserId,
    getCalendarEventType,
    (events , userId, calendarEventType) => 
        Object.values(events)?.find(event =>  event?.userId === userId && event?.calendarEventType === calendarEventType)      
);

export const getTimeLinesByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getTimeLines,
    (operators , operatorBusinessName, timeLines) => 
         Object.values(timeLines).filter(timeline => timeline?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
);

export const getSelectedOnlineAnswers = createSelector(
    getOperators,
    getOperatorBusinessName,
    getOnlineAnswers,
    (operators , operatorBusinessName, onlineAnswers) => 
         Object.values(onlineAnswers).filter(answer => answer?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
);

export const getSelectedOnlineAnswersByQuestionId = createSelector(
    getOperators,
    getOperatorBusinessName,
    getQuestionId,
    getOnlineAnswers,
    (operators , operatorBusinessName, questionId, onlineAnswers) => 
         Object.values(onlineAnswers).filter(answer => answer?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id 
          && answer?.questionId === questionId)       
);

export const getFormFieldAnswersByQuestionId = createSelector(
    getFormFieldAnswers,
    getFormFieldElementQuestionId,
    getFormFieldElementId,
    getFormFieldElementFormName,
    getFormFieldElementFieldPropsFormUuId,
    getFormFieldElementFieldPropsUserId,
    getParsedUserId,
    ( formFieldElementAnswers, fieldElementQuestionId, fieldElementId, fieldElementFormName, fieldPropsFormUuid, fieldPropsFormUserId, userId ) => 
         Object.values(formFieldElementAnswers).filter( answer => answer?.questionId === fieldElementQuestionId ).
          find( field =>  field?.fieldId ===  fieldElementId && field?.formName === fieldElementFormName && 
            field?.formUuId === fieldPropsFormUuid && field?.userId === (fieldPropsFormUserId ? fieldPropsFormUserId : userId ))       
);


export const getSelectedOnlineAnswersByCourseId = createSelector(
    getCourseId,
    getOnlineAnswers,
    (courseId, onlineAnswers) => 
         Object.values(onlineAnswers).filter(answer => answer?.courseId === courseId)       
);

export const getFailedPushNotificationQueue = createSelector(
    getFailedPushNotifications,
    getCurrentUser,
    getFailedPushNotifications,
    ( user, failedPushNotifications ) => 
         Object.values(failedPushNotifications).filter(failedSentPush => failedSentPush?.userId === user?._id)       
);

export const getFailedEmailNotificationQueue = createSelector(
    getParsedUserId,
    getFailedEmailNotifications,
    (userId, failedEmailNotifications) => 
         Object.values(failedEmailNotifications).filter(failedSentEmail => failedSentEmail?.userId === userId)       
);

export const getPublishedForms = createSelector(
    getCurrentUser,
    getFormBuilders,
    (user, formBuilders) => 
         Object.values(formBuilders).filter(form => form?.state === elementMeta.state.Manage && 
            (form?.status === elementMeta.status.Published || form?.status === elementMeta.status.Pending) && 
                (form?.role === "" || form?.role === user?.role) )   
);

export const getLessonUserNotesByNoteType = createSelector(
    getParsedUserId,
    getNotes,
    getLessonId,
    getNoteType,
    ( userId, notes, lessonId, noteType ) => 
        Object.values(notes).find(note => note?.lessonId === lessonId && note?.userId === userId && note?.noteType === noteType)       
);

export const getEventByEventId = createSelector(
    getEvents,
    getEventId,
    ( events, eventId ) => 
        Object.values(events).find(event => event?._id === eventId)       
);

export const getTutorsLessonUserNotesByLessonId = createSelector(
    getNotes,
    getLessonId,
    ( notes, lessonId ) => 
        Object.values(notes).find(note => note?.lessonId === lessonId && note?.noteType === LESSONNOTES)       
);

export const getStudentsLessonUserNotesByLessonId = createSelector(
    getParsedUserId,
    getNotes,
    getLessonId,
    ( userId, notes, lessonId  ) => 
        Object.values(notes).find(note => note?.lessonId === lessonId && note?.userId === userId && note?.noteType === STUDENTNOTES)       
);

export const getEventByCourseIdLessonIdUserId = createSelector(
    getEvents,
    getParsedCourseId,
    getLessonId,
    getParsedUserId,
    ( events, courseId, lessonId, userId  ) => 
        Object.values(events).find(event => event?.courseId === courseId && event?.lessonId === lessonId && event?.userId === userId)       
);