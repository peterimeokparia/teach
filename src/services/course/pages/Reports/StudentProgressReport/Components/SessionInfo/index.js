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
    const [ tutoringSession, setTutoringSession ] = useState(0);
    const [ subject, setSubject ] = useState('');
    const [ tutorsName, setTutorsName ] = useState('');
    const [ tutorsRemarks, setTutorsRemarks ] = useState('');
    const [ promptness, setPromptness ] = useState( false );
    const [ preparedness, setPreparedness ] = useState( false );
    const [ behavior, setBehavior ] = useState( false );
    const [ attitude, setAttitude ] = useState( false );
    const [ onTask, setOnTask ] = useState( false );
    const [ assignmentUpToDateInClass, setAssignmentUpToDateInClass ] = useState( false );
    const [ studentsCurrentGradePercentage, setStudentsCurrentGradePercentage ] = useState(0);
    const [ studentsPreviousGradePercentage, setStudentsPreviousGradePercentage ] = useState(0);
    const [ studentsCurrentLetterGrade, setStudentsCurrentLetterGrade ] = useState('');
    const [ studentsPreviousLetterGrade, setStudentsPreviousLetterGrade ] = useState('');
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
            Tutoring Session:  
            <input
                type="number"
                disabled={saveInProgress} 
                value={tutoringSession} 
                onChange={(e) => setTutoringSession(e.target.value)}
            />        
            </label>
            <label>
            Subject:  
            <input
                type="dropdown"
                disabled={saveInProgress} 
                value={subject} 
                onChange={(e) => setSubject(e.target.value)}
            />        
            </label>
            <label>
             Regularly on time to tutoring sessions?:
             <Switch checked={promptness} onChange={setPromptness} name="gilad" />
            </label>
            <label>
             Materials brought regularly to tutoring sessions?:  
             <Switch checked={preparedness} onChange={setPreparedness} name="gilad" />
            </label>
            <label>
              Displays consistent appropriate behavior during tutoring sessions?: 
             <Switch checked={behavior} onChange={setBehavior} name="gilad" />
            </label>
            <label>
             Shows a consistent positive attitude during tutoring sessions?: 
             <Switch checked={attitude} onChange={setAttitude} name="gilad" />
            </label>
            <label>
             Usually on task during tutoring sessions?: 
             <Switch checked={onTask} onChange={setOnTask} name="gilad" />
            </label>
            <label>
             In-Class assignments are upto date?: 
             <Switch checked={assignmentUpToDateInClass} onChange={setAssignmentUpToDateInClass} name="gilad" />
            </label>
            <label>
            Previous Qtr Letter Grade:  
            <input
                type="text"
                disabled={saveInProgress} 
                value={studentsPreviousLetterGrade} 
                onChange={(e) => setStudentsPreviousLetterGrade(e.target.value)}
            />        
            </label>
            <label>
            Previous Qtr Percentage Grade %:  
            <input
                type="number"
                disabled={saveInProgress} 
                value={studentsPreviousGradePercentage} 
                onChange={(e) => setStudentsPreviousGradePercentage(e.target.value)}
            />        
            </label>
            <label>
            Current Qtr Letter Grade:  
            <input
                type="text"
                disabled={saveInProgress} 
                value={studentsCurrentLetterGrade} 
                onChange={(e) => setStudentsCurrentLetterGrade(e.target.value)}
            />        
            </label>
            <label>
            Current Qtr Percentage Grade %:  
            <input
                type="number"
                disabled={saveInProgress} 
                value={studentsCurrentGradePercentage} 
                onChange={(e) => setStudentsCurrentGradePercentage(e.target.value)}
            />        
            </label>
            <label>
            Tutors Name:
            <Select 
                inputProps={{ 'aria-label': 'Without label' }}
                className={'space-between-select'}
                value={ tutorsName } onChange={ e => setTutorsName( e.target.value) } 
                >
                <option key={"Default"} value={"Default"} className="space-between-select"> {"Select"} </option>
                <option key={"Present"} value={"Present"} className="space-between-select"> {"Present"} </option>
                <option key={"Absent"} value={"Absent"} className="space-between-select"> {"Absent"} </option> 
                <option key={"Tardy"} value={"Tardy"} className="space-between-select">  {"Tardy"} </option>    
            </Select>
            </label>
            <label>
            Tutors Remarks:  
            <input
                type="text"
                disabled={saveInProgress} 
                value={tutorsRemarks} 
                onChange={(e) => setTutorsRemarks(e.target.value)}
            />        
            </label>
            <label>
            Overall Remarks:  
            <input
                type="text"
                disabled={saveInProgress} 
                value={overallRemarks} 
                onChange={(e) => setOverallRemarks(e.target.value)}
            />        
            </label>
                <label>
                    {"Sign & Date:"}  
                <input
                    type="date"
                    disabled={saveInProgress} 
                    value={signatureDate} 
                    onChange={(e) => setSignatureDate(e.target.value)}
                />        
                </label>
                <label>
                    { "Sign & Date Select Name:"}
                <Select 
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={'space-between-select'}
                    value={ signee } onChange={ e => setSignee( e.target.value) } 
                    >
                    <option key={"Default"} value={"Default"} className="space-between-select"> {"Select"} </option>
                    <option key={"Present"} value={"Present"} className="space-between-select"> {"Present"} </option>
                    <option key={"Absent"} value={"Absent"} className="space-between-select"> {"Absent"} </option> 
                    <option key={"Tardy"} value={"Tardy"} className="space-between-select">  {"Tardy"} </option>    
                </Select>
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