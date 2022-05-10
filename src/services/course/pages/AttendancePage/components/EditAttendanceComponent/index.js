import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
deleteAttendance } from 'services/course/actions/attendance';

const EditAttendanceComponent = ({
attendance,
error,
className,
onSubmit,
deleteAttendance, 
children }) => {
let attendanceInitialValue = attendance ? attendance?.attendanceMark : '';
let dateInitialValue = attendance ? attendance?.attendanceDate : Date.now(); 
const [ editing, setEditing ] = useState(false); 
const [ attendanceDate, setAttendanceDate ] = useState(Date.now());
const [ attended, markAttendance ] = useState(undefined);
const inputRef = useRef();

const reset = () => {
    setAttendanceDate(dateInitialValue);
    markAttendance(attendanceInitialValue);
    setEditing(false);
};

const commitEdit = (e) => {
    e.preventDefault();
    onSubmit( attendanceDate, attended )
     .then(reset)
      .catch( error => {
        setEditing(false);
        setEditing(true);
    });
 };

const setValues = () => {
    setAttendanceDate(dateInitialValue);
    markAttendance(attendanceInitialValue);
};

const beginEditing = () => {
    setValues();
    setEditing(true);
};

const performDelete = () => {
    deleteAttendance(attendance);
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

return editing ? (
    <>
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
                placeholder="Attendance Date"
            />
        </label>  

        <label>  
            <span>
            <span>
                <form>
                    <select value={ attended } onChange={ e => markAttendance( e.target.value) } >
                        <option key={"Default"} value={"Default"}> {"Select"} </option>
                        <option key={"Attended"} value={"Attended"}> {"Attended"} </option>
                        <option key={"Did Not Attend"} value={"Did Not Attend"}> {"Did Not Attend"} </option>   
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
        {error && <div>{error.message}</div>}
</>
) : ( 
        children(beginEditing, performDelete)
); };

export default connect( null, { deleteAttendance } )(EditAttendanceComponent);