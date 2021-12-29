import { 
createSelector}  from 'reselect';

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

const getUsers = state => state.users.users;
const getCurrentUser = state => state.users.user;
const getLessons = state => state.lessons.lessons;
const getCalendars = state => state?.calendar?.calendars;
const getEvents = state => state?.events?.events;
const getParsedCalendarId = ( state, props ) => props.calendarId;
const getParsedCourseId = ( state, props ) => props?.courseId;
const getParsedUserId = ( state, props ) => props?.currentUser?._id;
const getUserId = ( state, props ) => props?.userId;
const getQuestionId = ( state, props ) => props?.questionId;
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
       Object.values(courses)?.filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
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

export const getCalendarEventsByUserIdSelector = createSelector( 
    getCalendars,
    getUserId,
    getCalendarEventType,
    (calendars , userId, calendarEventType) => 
        Object.values(calendars)?.find(calendar =>  calendar?.userId === userId && calendar?.calendarEventType === calendarEventType)      
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
    (operators , operatorBusinessName, events) => 
         Object.values(events).filter(event => event?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
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