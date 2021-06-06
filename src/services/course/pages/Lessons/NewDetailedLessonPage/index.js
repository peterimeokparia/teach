import 
React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetClassRoomUserError } from 'Services/course/Actions/ClassRooms';

import './style.css';

const NewDetailedLessonPage = ({
className,
selectedLesson,
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
    let lessonData = { title: title,  courseId: selectedCourse?._id, lessonDate: Date.now() };

    onSubmit(lessonData)
    .then(reset)
    .catch( error => {
        setEditing(false);
        setEditing(true);
    });
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};

// const setInitialValuesForInputFields = () => {
//     setLessonTitle(titleInitialValue);
//     setEditing(false);
// }

// const beginEditing = () => {
//     setInitialValuesForInputFields();
//     setEditing(true);
// }

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
                Add New Lesson
            </label>  
            <form
                className= {`${className || ''} editing ${error ? 'error' : ''}`}
                onSubmit={commitEdit}           
            >
            <label>
            <input 
                ref={ inputRef }
                value={ title }
                type="text"
                onChange={ e => setLessonTitle( e.target.value) }
                disabled={saveInProgress}
                placeholder="Title"
            />
            </label>
            <input
                ref={ inputRef }
                name="submit"
                type="submit"
                value={'Submit'}
                onChange={ commitEdit }
            >
            </input> 
            </form>
            <form
                className= {`${className || ''} editing ${error ? 'error' : ''}`} 
            >
            <input
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
    </>
    );                       
};

const mapState = ( state, ownProps ) => {
    return {
        saveInProgress: state.classrooms.saveLessonInProgress,
        error: state.classrooms.onSaveError
    };
};

export default connect(mapState, { resetError: resetClassRoomUserError, resetClassRoomUserError } )(NewDetailedLessonPage);