import { 
useEffect } from 'react';

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

import StudentDisplayViewComponent from '../Components/StudentDisplayViewComponent';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetailPage = ({
    operatorBusinessName,
    studentId,
    courseId,
    lessonId,
    users,
    children }) => {

    useEffect(() => {
    loadGrades( studentId );
    loadSessions();
    loadAttendance();

        if ( courseId ) {
            loadLessons( courseId );
        }
    }, [  courseId, studentId, loadLessons ]); 
    
    let props = {
        operatorBusinessName,
        selectedStudents: users?.find(usr => usr?._id === studentId),
        childrenProps: children
    };

return (     
    <StudentDisplayViewComponent props={props}/>             
    );
};

const mapDispatch = {
    loadGrades,
    loadAttendance,
    loadSessions,
    loadLessons 
};

const mapState = (state, ownProps) => {
    return {
        courseTutor: state.courses.courseTutor,
        users: Object.values(state?.users?.users),
    };
};

export default connect(mapState, mapDispatch)(StudentDetailPage);