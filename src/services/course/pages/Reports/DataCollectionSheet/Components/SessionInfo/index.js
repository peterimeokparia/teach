import { 
useState, 
useEffect, 
useRef } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewCourse } from 'services/course/actions/courses';

import { 
Validations } from  'services/course/helpers/Validations';

import { 
toast } from 'react-toastify';

import { 
role } from 'services/course/helpers/PageHelpers';

import Select from '@material-ui/core/Select';
import Switch from '@mui/material/Switch';
import './style.css';

//https://mui.com/components/switches/    
const SessionInfo = ({
    students,
    tutors,
    currentUsers,
    currentUser,
    courses,
    saveInProgress,
    onSaveError,
    onCoursesError,
    operatorBusinessName,
    operator,
    dispatch }) => {
    const [ period, setPeriod ] = useState('');
    const [ numberOfStudentsInClass, setNumberOfStudentsInClass ] = useState(0);
    const [ numberOfStudentsHelped, setNumberOfStudentsHelped ] = useState(0);
    const [ studentsPerformanceAfterSupport, setStudentsPerformanceAfterSupport ] = useState('');
    const [ summary, setSummary ] = useState('');
    const [ overallRemarks, setOverallRemarks ] = useState('');
    const [ studentsClassRoomGradeLevel, setStudentsClassRoomGradeLevel ] = useState('');
    const [ summaryGradeLevel, setSummaryGradeLevel ] = useState('');
    const inputRef = useRef();
  
    useEffect (() => {
        inputRef.current.focus();
    }, []); 

    if ( onSaveError ) {
        toast.error(`There was a problem.`);
        // return <div> { onCoursesError.message } </div> ;
    }

const handleSubmit = e => { 
    e.preventDefault(); 

    if ( (Validations.checkFormInputString("Students Name", studentsName)) && 
         (Validations.checkFormInputNumber("Evaluation Date", performanceDate)) &&
         (Validations.checkFormInputNumber("Classroom Grade Level", studentsClassRoomGrade)) ) {        
        if ( Validations.duplicateCheck( studentsName,  studentsClassRoomGrade, "students name", "class grade" ) ) {
            return;
        }

        let newCourse = { 
            name: courseName, 
            price: coursePrice, 
            description: courseDescription, 
            createdBy: currentUser?._id,
            user: currentUser, 
            operatorId: operator?._id,
            coursePushNotificationSubscribers: [ currentUser?._id ],
            courseEmailNotificationSubscribers: [ currentUser?._id ] 
        };

        dispatch( addNewCourse( newCourse ) );
    }
};

    if ( saveInProgress ) {
        return <div>...loading</div>;
    } 

return (
    <div className="NewCourse">
        <h1>{`Create new course.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
            Period:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
            />        
            </label>
            <label>
            Grade Level:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={studentsClassRoomGradeLevel} 
                onChange={(e) => setStudentsClassRoomGradeLevel(e.target.value)}
            />        
            </label>
            <label>
            Number of students in class:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={numberOfStudentsInClass} 
                onChange={(e) => setNumberOfStudentsInClass(e.target.value)}
            />        
            </label>
            <label>
            Number of students you helped class:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={numberOfStudentsHelped} 
                onChange={(e) => setNumberOfStudentsHelped(e.target.value)}
            />        
            </label>
            <label>
            Student's performance after support:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={studentsPerformanceAfterSupport} 
                onChange={(e) => setStudentsPerformanceAfterSupport(e.target.value)}
            />        
            </label>
            <label>
            Summary:  
            <input
                type="text"
                disabled={saveInProgress} 
                value={summary} 
                onChange={(e) => setSummary(e.target.value)}
            />        
            </label>
            <label>
            Grade Level:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={summaryGradeLevel} 
                onChange={(e) => setSummaryGradeLevel(e.target.value)}
            />        
            </label>
            <label>
            Remarks:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={overallRemarks} 
                onChange={(e) => setOverallRemarks(e.target.value)}
            />        
            </label>
            {
                <div>
                {
                    Validations?.setErrorMessageContainer()
                }
                </div>
                
            }
                
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
            <button type="submit" disabled={saveInProgress} >Create Course</button>
        </form>
    </div>
); };

const mapState = (state, ownProps ) => ({
    courses: Object.values(state?.courses?.courses)?.filter(crs => crs?.operatorId === ownProps.operator?._id),
    saveInProgress: state.courses.saveInProgress,
    onSaveError: state.courses.onSaveError,
    onCoursesError: state.courses.onCoursesError,
    currentUser: state.users.user,
    currentUsers: state.users.users,
    tutors: Object.values(state?.users?.users)?.filter(usr => usr?.role === role.Tutor),
    students: Object.values(state?.users?.users)?.filter(usr => usr?.role === role.Student)
});

export default connect(mapState)(SessionInfo);