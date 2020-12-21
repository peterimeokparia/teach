import 
React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetClassRoomUserError } from '../actions';

import './AddStudentGradeComponent.css';



const AddStudentGradeComponent = ({
studentId,
selectedCourse,
selectedLesson, 
className,   
saveInProgress,
error,
onSubmit }) => {

        


const [ editing, setEditing ] = useState(false); 
const [ testDate, setTestDate ] = useState(Date.now());
const [ testScore, setTestScore ] = useState(undefined);
const inputRef = useRef();


const reset = () => {
    setTestDate(Date.now());
    setTestScore(undefined);
    setEditing(false);
    resetClassRoomUserError();
    
}

const commitEdit = (e) => {
    e.preventDefault();

    let gradeData = { testDate: testDate, score: testScore, studentId: studentId, courseId: selectedCourse?._id, lessonId: selectedLesson?._id }

    onSubmit(gradeData)
     .then(reset)
      .catch( error => {
        setEditing(false);
        setEditing(true);
      });

};


const cancelEdit = (e) => {
    e.preventDefault();
    reset();

}


const setInitialValuesForInputFields = () => {
    setTestDate(Date.now());
    setTestScore(undefined);
    setEditing(false);
}


const beginEditing = () => {
    setInitialValuesForInputFields();
    setEditing(true);
}



useEffect (() => {

    if ( editing ) {

        inputRef.current.focus();

    }

}, [ editing ]); 


if ( saveInProgress ){

    return <div> Save in progress, please wait. </div>

}



return (
           <>
    
      {
                <div className="AddStudentGradeComponent"> 
                    <label>
                      Add New Test Score  
                    </label>

                    <form
                    className= {`${className || ''} editing ${error ? 'error' : ''}`}
                    onSubmit={commitEdit}           
                    >
                    <label>
                    <input 
                        name="lessondate"
                        ref={ inputRef }
                        value={ testDate }
                        type="date"
                        onChange={ e => setTestDate( e.target.value) }
                        disabled={saveInProgress}
                        placeholder="Test Date"
                    />
                    </label>  

                    <label>
                        {/* <b>  Test Score </b> */}
            
                    <input 
                        ref={ inputRef }
                        value={ testScore }
                        type="number"
                        onChange={ e => setTestScore( e.target.value) }
                        disabled={saveInProgress}
                        placeholder="Test Score"
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
            )       
                
};


const mapState = ( state, ownProps ) => {
    return {
        saveInProgress: state.classrooms.saveLessonInProgress,
        error: state.classrooms.onSaveError
    }
}


export default connect(mapState, { resetError: resetClassRoomUserError, resetClassRoomUserError } )(AddStudentGradeComponent);