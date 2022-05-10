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
    const [ period, setPeriod ] = useState(0);
    const [ classGradeLevel, setClassGradeLevel ] = useState('');
    const [ attendance, setAttendance ] = useState( false );
    const [ assignmentsCurrent, setAssignmentsCurrent ] = useState( false );
    const [ assignmentsNotCompletedComment, setAssignmentsNotCompletedComment ] = useState( false );
    const [ behavior, setBehavior ] = useState( false );
    const [ currentGrades, setCurrentGrades ] = useState('');
    const [ signature, setSignature ] = useState( '' );

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
                type="number"
                disabled={saveInProgress} 
                value={period} 
                onChange={(e) => setPeriod(e.target.value)}
            />        
            </label>
            <label>
            Class:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={classGradeLevel} 
                onChange={(e) => setClassGradeLevel(e.target.value)}
            />        
            </label>
            <label>
             Good Attendance?:
             <Switch checked={attendance} onChange={setAttendance} name="gilad" />
            </label>
            <label>
             Materials brought regularly to tutoring sessions?:  
             <Switch checked={preparedness} onChange={setPreparedness} name="gilad" />
            </label>
            <label>
              Assignments are upto date?: 
             <Switch checked={assignmentsCurrent} onChange={setAssignmentsCurrent} name="gilad" />
            </label>
            <label>
             Appropriate Behavior?: 
             <Switch checked={behavior} onChange={setBehavior} name="gilad" />
            </label>
            <label>
             Grade to date?: 
             <Switch checked={currentGrades} onChange={setCurrentGrades} name="gilad" />
            </label>
            <label>
            Assignments not completed/comments?: 
             <Switch checked={assignmentsNotCompletedComment} onChange={setAssignmentsNotCompletedComment} name="gilad" />
            </label>
            <label>
            Signature:
            <input
                type="text"
                disabled={saveInProgress} 
                value={signature} 
                onChange={(e) => setSignature(e.target.value)}
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