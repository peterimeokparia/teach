import 
React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
loadGrades } from 'Services/course/Actions/Grades';

import { 
loadAttendance } from 'Services/course/Actions/Attendance';

import { 
loadSessions } from 'Services/course/Actions/Sessions';

import {  
loadLessons} from 'Services/course/Actions/Lessons';

import { 
getLessonsByCourseIdSelector, 
getCoursesByCourseIdSelector,
getOperatorFromOperatorBusinessName } from 'Services/course/Selectors';

import { 
emailMessageOptions, 
emailInputOptions } from  'Services/course/Pages/Courses/helpers';

import StudentDisplayViewComponent from '../Components/StudentDisplayViewComponent';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetailPage = ({
operatorBusinessName,
operatorId,
operator,    
studentId,
courseId,
lessonId,
currentUser,
course,
lessons,
users,
sessions,
navigationHistory,
children }) => {

useEffect(() => {
loadGrades( studentId );
loadSessions();
loadAttendance();

if ( courseId ) {
    loadLessons( courseId );
}
    
}, [ loadGrades, loadSessions, loadAttendance, loadLessons ]);  

const [ currentPage, setCurrentPage ] = useState('');
const [ lessonPlanUrl, setLessonPlanUrl ] = useState('');

return (     
        <StudentDisplayViewComponent 
            operatorBusinessName={operatorBusinessName}
            operator={operator}       
            currentUser={currentUser}
            selectedStudents={users?.find(usr => usr?._id === studentId)}
            emailInputOptions={emailInputOptions}
            emailMessageOptions={emailMessageOptions}
            setLessonPlanUrl={setLessonPlanUrl}
            lessonPlanUrl={lessonPlanUrl}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            courseId={courseId}
            lessonId={lessonId}
            course={course}
            lessons={lessons}
            navigationHistory={navigationHistory}
            parentChild={children}
        />             
    );
}

const mapDispatch = {
    loadGrades,
    loadAttendance,
    loadSessions,
    loadLessons 
}

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        users: Object.values(state?.users?.users),
        course: getCoursesByCourseIdSelector( state, ownProps ),
        lessons: getLessonsByCourseIdSelector( state, ownProps ),
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        navigationHistory: state.users.navigationHistory
    }
}

export default connect(mapState, mapDispatch)(StudentDetailPage);