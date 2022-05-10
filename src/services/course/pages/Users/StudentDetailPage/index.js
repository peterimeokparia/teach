import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
loadGrades } from 'services/course/actions/grades';

import { 
loadAttendance } from 'services/course/actions/attendance';

import { 
loadSessions } from 'services/course/actions/sessions';

import {  
loadLessons} from 'services/course/actions/lessons';

import { 
loadLoginSessions } from 'services/course/actions/logins';

import { 
getOperatorFromOperatorBusinessName } from 'services/course/selectors';

import StudentDisplayViewComponent from '../components/StudentDisplayViewComponent';
import 'react-toastify/dist/ReactToastify.css';

const StudentDetailPage = ({
    operatorBusinessName,
    operator,
    studentId,
    courseId,
    users,
    children }) => {
    useEffect(() => {
    loadGrades( studentId );
    loadSessions();
    loadAttendance();
    loadLoginSessions();

        if ( courseId ) {
            loadLessons( courseId );
        }
        
    }, [  courseId, studentId, loadLessons ]); 
    
    let props = {
        operatorBusinessName,
        operator,
        courseId,
        studentId,
        selectedStudents: users?.find(usr => usr?._id === studentId),
        childrenProps: children
    };

return ( <StudentDisplayViewComponent props={props}/>  );
};

const mapDispatch = {
    loadGrades,
    loadAttendance,
    loadSessions,
    loadLessons,
    loadLoginSessions 
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        users: Object.values(state?.users?.users),
    };
};

export default connect(mapState, mapDispatch)(StudentDetailPage);