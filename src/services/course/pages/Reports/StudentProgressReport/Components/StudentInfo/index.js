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
    
const StudentInfo = ({
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
    const [ studentsName, setStudentsName ] = useState('');
    const [ performanceDate, setPerformanceDate ] = useState(new Date());
    const [ studentsClassRoomGrade, setStudentsClassRoomGrade ] = useState('');
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
                Students Name:
                <Select 
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={'space-between-select'}
                    value={ studentsName } onChange={ e => setStudentsName( e.target.value) } 
                    >
                    <option key={"Default"} value={"Default"} className="space-between-select"> {"Select"} </option>
                    <option key={"Present"} value={"Present"} className="space-between-select"> {"Present"} </option>
                    <option key={"Absent"} value={"Absent"} className="space-between-select"> {"Absent"} </option> 
                    <option key={"Tardy"} value={"Tardy"} className="space-between-select">  {"Tardy"} </option>    

                </Select>
                </label>
                <label>
                    Date:  
                <input
                    type="date"
                    disabled={saveInProgress} 
                    value={coursePrice} 
                    onChange={(e) => setPerformanceDate(e.target.value)}
                />        
                </label>
                <label>
                <Select 
                    inputProps={{ 'aria-label': 'Without label' }}
                    className={'space-between-select'}
                    value={ studentsClassRoomGrade } onChange={ e => setStudentsClassRoomGrade( e.target.value) } 
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
    students: Object.values(state?.users?.users)?.filter(usr => usr?.role === role.Student)
});

export default connect(mapState)(StudentInfo);