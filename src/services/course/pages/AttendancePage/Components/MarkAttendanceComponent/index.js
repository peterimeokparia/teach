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

const MarkAttendanceComponent = ({
selectedStudents,
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
    try {
        let attendaceData = { 
            attendanceDate: attendanceDate, 
            attendanceMark: attendanceMark, 
            selectedStudents: selectedStudents, 
            courseId: selectedCourse?._id, 
            lessonId: selectedLesson?._id 
        }
        onSubmit(attendaceData);
        reset();
    } catch (error) {
        setEditing(false);
        setEditing(true);    
    } 
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
                type="datetime-local"
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
                            <option key={"Present"} value={"Present"}> {"Present"} </option>
                            <option key={"Absent"} value={"Absent"}> {"Absent"} </option> 
                            <option key={"Tardy"} value={"Tardy"}>  {"Tardy"} </option>    
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

export default connect( null, { resetError: resetClassRoomUserError, resetClassRoomUserError } )(MarkAttendanceComponent);