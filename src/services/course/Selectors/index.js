import { 
createSelector}  from 'reselect';

const getUsers = state => state.users.users;
const getLessons = state => state.lessons.lessons;
const getCalendars = state => state?.calendar?.calendarEvents;
const getParsedCalendarId = ( state, props ) => props.calendarId;
const getParsedCourseId = ( state, props ) => props.courseId;
const getParsedUserId = ( state, props ) => props?.currentUser?._id;
const getUserId = ( state, props ) => props?.userId;
const getCalendarEventType = ( state, props ) => props?.calendarEventType
const getCourses = state => state.courses.courses;
const getClassRoomGroups = state => state?.classrooms?.classrooms;
const getPushNotificationUsers = state => state?.notifications?.pushNotificationSubscribers;
const getOperators = state => state.operators.operators;
const getOperatorBusinessName = ( state, props ) => props?.operatorBusinessName;
const getTimeLines = state => state?.timeLines?.timeLines;
// const parseCourseId = (state, props) => props.courseId;
// const getCurrentUser = state => state.users.user;
// const getParsedCourseId = ( state, props ) => parseInt( props.courseId, 10 );
// const parseCourseId = (state, props) => parseInt(props.courseId, 10);


// export const userOwnsCourse = createSelector(
//     getCurrentUser,
//     parseCourseId,

//     (user, courseId) => {

//         if ( ! user ) {

//             return false;
//         }

//         if ( user.role === 'admin' ) {
    
//             return true;
//         }
    
//         console.log('user', user);

//         return user.courses.includes(parseInt(courseId));
//     }

// );

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
    })
}

export const getSortedLessonsSelector = createSelector( 
    getLessons,
    lessons  => Object.values(lessons).sort((a, b) => {

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
           lessons.filter(lesson =>  lesson.courseId === courseId)        
);

export const getCoursesByCourseIdSelector = createSelector( 
    getCourses,
    getParsedCourseId,
    (courses , courseId) => 
        Object.values(courses).find(course =>  course._id === courseId)      
);

export const getCoursesByCreatedByIdSelector = createSelector( 
    getCourses,
    getParsedUserId,
    (courses , userId) => 
        Object.values(courses).find(course =>  course.createdBy === userId)         
);

export const getOperatorFromOperatorBusinessName = createSelector( 
    getOperators,
    getOperatorBusinessName,
    (operators , operatorBusinessName) => 
        Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)       
);

export const getUsersByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getUsers,
    (operators , operatorBusinessName, users) => 
         Object.values(users).filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)        
);

export const getCoursesByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getCourses,
    (operators , operatorBusinessName, courses) => 
         Object.values(courses).filter(usr => usr?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
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

export const getTimeLinesByOperatorId = createSelector( 
    getOperators,
    getOperatorBusinessName,
    getTimeLines,
    (operators , operatorBusinessName, timeLines) => 
         Object.values(timeLines).filter(timeline => timeline?.operatorId === Object.values(operators).find(operator =>  operator.businessName === operatorBusinessName)?._id)       
);
