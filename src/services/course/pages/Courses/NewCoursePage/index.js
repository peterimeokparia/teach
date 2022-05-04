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

const NewCoursePage = ({
    saveInProgress,
    onSaveError,
    onCoursesError,
    user,
    courses,
    operatorBusinessName,
    operator,
    dispatch }) => {
    const [ courseName, setCourseName ] = useState('');
    const [ coursePrice, setCoursePrice ] = useState('');
    const [ courseDescription, setCourseDescription ] = useState('');
    const inputRef = useRef();
    let currentUser = user;

    useEffect (() => {
        inputRef.current.focus();
    }, []); 

    if ( onSaveError ) {
        toast.error(`There was a problem while adding the new course: ${ courseName }: ${ onSaveError?.message }`);
        // return <div> { onCoursesError.message } </div> ;
    }

const handleSubmit = e => { 
    e.preventDefault(); 

    if ( (Validations.checkFormInputString("Course Title", courseName)) && 
            (Validations.checkFormInputNumber("Course Price", coursePrice))) {        
        if ( Validations.duplicateCheck( courseName,  courses, "course title", "name" ) ) {
            return;
        }

        let newCourse = { 
            name: courseName, 
            price: coursePrice, 
            description: courseDescription, 
            createdBy: currentUser?._id,
            user: currentUser, 
            operatorId: currentUser?.operatorId,
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
                Enter course name:
                <input
                    ref={inputRef} 
                    disabled={saveInProgress} 
                    value={courseName} 
                    onChange={(e) => setCourseName(e.target.value)}
                />
                </label>
                <label>
                    Enter course price:  
                <input
                    disabled={saveInProgress} 
                    value={coursePrice} 
                    onChange={(e) => setCoursePrice(e.target.value)}
                />        
                </label>
                <label>
                    Enter course description:  
                <input
                    disabled={saveInProgress} 
                    value={courseDescription} 
                    onChange={(e) => setCourseDescription(e.target.value)}
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
});

export default connect(mapState)(NewCoursePage);