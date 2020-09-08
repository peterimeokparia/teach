import { createSelector }  from 'reselect';

const getLessons = state => state.lessons.lessons;
const getParsedCourseId = ( state, props ) => props.courseId;
const getCourses = state => state.courses.courses;
const parseCourseId = (state, props) => props.courseId;
const getCurrentUser = state => state.users.user;
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
