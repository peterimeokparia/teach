import 
React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetClassRoomUserError } from '../actions';

import './MarkAttendanceComponent.css';
 


const MarkAttendance = ({
studentId,
selectedCourse,
selectedLesson, 
className,   
saveInProgress,
error,
onSubmit }) => {

        


const [ editing, setEditing ] = useState(false); 
const [ attendanceDate, setAttendanceDate ] = useState(Date.now());
const [ attendanceMark, markAttendance ] = useState(undefined);
const inputRef = useRef();


const reset = () => {
    setAttendanceDate(Date.now());
    markAttendance("Select");
    setEditing(false);
    resetClassRoomUserError();
    
}

const commitEdit = (e) => {
    e.preventDefault();

    let attendaceData = { attendanceDate: attendanceDate, attendanceMark: attendanceMark, studentId: studentId, courseId: selectedCourse?._id, lessonId: selectedLesson?._id }

    onSubmit(attendaceData)
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
    setAttendanceDate(Date.now());
    markAttendance(undefined);
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
                <div className="MarkAttendanceComponent"> 
                    <label>
                      Mark Attendance 
                    </label>

                    <form
                    className= {`${className || ''} editing ${error ? 'error' : ''}`}
                    onSubmit={commitEdit}           
                    >
                    <label>
                    <input 
                        name="lessondate"
                        ref={ inputRef }
                        value={ attendanceDate }
                        type="date"
                        onChange={ e => setAttendanceDate( e.target.value) }
                        disabled={saveInProgress}
                        placeholder="Attendance Date"
                    />
                    </label>  

                    <label>  

                    <span>
                    <span>
                        <form>
                            <select value={ attendanceMark } onChange={ e => markAttendance( e.target.value) } >
                                 <option key={"Default"} value={"Default"}> {"Select"} </option>
                                 <option key={"Attended"} value={"Attended"}> {"Attended"} </option>
                                 <option key={"DidNotAttend"} value={"Did Not Attend"}> {"Did Not Attend"} </option>   
                            </select>
                        </form>
                    </span>
                </span>

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
        // saveInProgress: state.attendance.saveLessonInProgress,
        // error: state.attendance.onSaveError
    }
}


export default connect(mapState, { resetError: resetClassRoomUserError, resetClassRoomUserError } )(MarkAttendance);