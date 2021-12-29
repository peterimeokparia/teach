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
        
import './style.css';
import Select from '@material-ui/core/Select';
import { role } from 'services/course/helpers/PageHelpers';
    
const HeaderInfo = ({
    students,
    currentUsers,
    currentUser,
    courses,
    saveInProgress,
    onSaveError,
    onCoursesError,
    operatorBusinessName,
    operator,
    dispatch }) => {
    const [ tutorsName, setTutorsName ] = useState('');
    const [ timeIn, setTimeIn ] = useState(new Date());
    const [ timeOut, setTimeOut ] = useState(new Date());
    const [ subject, setSubject ] = useState('');
    const [ teacher, setTeacher ] = useState('');
    const [ grade, setGrade ] = useState('');
    const [ date, setDate ] = useState(new Date());
    const [ overview, setOverview ] = useState('');
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
                Tutors Name:
                <input
                    type="dropdown"
                    disabled={saveInProgress} 
                    value={tutorsName} 
                    onChange={(e) => setTutorsName(e.target.value)}
                />        
                </label>
                <label>
                    Time In:  
                <input
                    type="date"
                    disabled={saveInProgress} 
                    value={timeIn} 
                    onChange={(e) => setTimeIn(e.target.value)}
                />        
                </label>
                <label>
                    Time Out:  
                <input
                    type="date"
                    disabled={saveInProgress} 
                    value={timeOut} 
                    onChange={(e) => setTimeOut(e.target.value)}
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
                    School:  
                <input
                    type="dropdown"
                    disabled={saveInProgress} 
                    value={school} 
                    onChange={(e) => setSchool(e.target.value)}
                />        
                </label>
                <label>
                    Teacher:  
                <input
                    type="dropdown"
                    disabled={saveInProgress} 
                    value={teacher} 
                    onChange={(e) => setTeacher(e.target.value)}
                />        
                </label>
                <label>
                    Grade:  
                <input
                    type="dropdown"
                    disabled={saveInProgress} 
                    value={grade} 
                    onChange={(e) => setGrade(e.target.value)}
                />        
                </label>
                <label>
                    Date:  
                <input
                    type="date"
                    disabled={saveInProgress} 
                    value={date} 
                    onChange={(e) => setDate(e.target.value)}
                />        
                </label>
                <label>
                    Overview:  
                <input
                    type="text"
                    disabled={saveInProgress} 
                    value={overview} 
                    onChange={(e) => setOverview(e.target.value)}
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
    students: Object.values(state?.users?.users)?.filter(usr => usr?.role === role.Student)
});

export default connect(mapState)(HeaderInfo);