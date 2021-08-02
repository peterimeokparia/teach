import { 
    useEffect } from 'react';
    
    import { 
    connect } from 'react-redux';
    
    import { 
    loadGrades } from 'teach/src/services/course/actions/grades';
    
    import { 
    loadAttendance } from 'teach/src/services/course/actions/attendance';
    
    import { 
    loadSessions } from 'teach/src/services/course/actions/sessions';
    
    import {  
    loadLessons} from 'teach/src/services/course/actions/lessons';
    
    import StudentDisplayViewComponent from '../components/StudentDisplayViewComponent';
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