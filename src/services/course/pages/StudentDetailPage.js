import React, { 
useEffect, 
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
loadGrades,
loadAttendance,
loadSessions, 
loadLessons} from '../actions';

import { 
getLessonsByCourseIdSelector, 
getCoursesByCourseIdSelector,
getOperatorFromOperatorBusinessName } from '../Selectors';

import { 
emailMessageOptions, 
emailInputOptions } from  '../../../helpers/courseDetailPageHelpers';

import { 
toast } from 'react-toastify';

import NotFoundPage from './NotFoundPage';
import Loading from './Loading';
import StudentDisplayViewComponent from './StudentDisplayViewComponent';
import SessionComponent from './SessionComponent';
import GradeComponent from './GradeComponent';
import AttendanceComponent from './AttendanceComponent';

import 'react-toastify/dist/ReactToastify.css';

import './CourseDetailPage.css';



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
children    }) => {

   

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