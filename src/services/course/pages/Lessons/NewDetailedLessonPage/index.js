import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetClassRoomUserError } from 'services/course/actions/classrooms';

import './style.css';

const NewDetailedLessonPage = ({
className,
selectedLesson,
currentUser,
lessonError,
resetClassRoomUserError, 
saveInProgress,
error,
onSubmit,
selectedCourse }) => {
let titleInitialValue = selectedLesson ? selectedLesson?.title : ''; 

const [ editing, setEditing ] = useState(false); 
const [ title, setLessonTitle ] = useState(titleInitialValue);
const inputRef = useRef();

const reset = () => {
    setLessonTitle(titleInitialValue);
    setEditing(false);
    resetClassRoomUserError();  
};

const commitEdit = (e) => {
    e.preventDefault();
    let lessonData = { title: title, introduction: title,  courseId: selectedCourse?._id, lessonDate: Date.now(), userId: currentUser?._id  };

    onSubmit(lessonData)
    .then(reset)
    .catch( error => {
        setEditing(false);
        setEditing(true);
        Error(`AddNewLesson: NewDetailedLessonPage: There was a problem adding the new lesson. ${ error }`);
    });
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};

useEffect (() => {
    if ( editing ) {
        inputRef.current.focus();
    }
}, [ editing ]); 

if ( saveInProgress ){
    return <div> Save in progress, please wait. </div>;
}

return (
     <>    
      {
        <div className="NewDetailedLessonPage"> 
            <label>
            </label>  
            <form
                className= {`${className || ''} editing ${error ? 'error' : ''}`}
                onSubmit={commitEdit}           
            >
            <label>
            <input 
                className={"new-lesson-text"}
                ref={ inputRef }
                value={ title }
                type="text"
                onChange={ e => setLessonTitle( e.target.value) }
                disabled={saveInProgress}
                placeholder="Add A New Lesson Title"
            />
            </label>
            <input
                className={"new-lesson-submit-button"}
                ref={ inputRef }
                name="submit"
                type="submit"
                value={'Submit'}
                onChange={ commitEdit }
            >
            </input> 
            </form>
            <form
                className={"add-new-lesson"}
            >
            <input
                className={"new-lesson-reset-button"}
                ref={ inputRef }
                name="reset"
                type="submit"
                value={'Reset'}
                onChange={ cancelEdit }
            >
            </input> 
            </form>
        </div>             
    }  
    { error && <div>{error.message}</div> }
    {lessonError && <div>{lessonError?.message}</div>}
    </>
    );                       
};

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        saveInProgress: state.classrooms.saveLessonInProgress,
        error: state.classrooms.onSaveError,
        lessonError: state.lessons.onSaveLessonError
    };
};

export default connect(mapState, { resetError: resetClassRoomUserError, resetClassRoomUserError } )(NewDetailedLessonPage);