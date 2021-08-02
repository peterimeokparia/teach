import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import {
resetClassRoomUserError } from 'services/course/actions/classrooms';

import {
selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
            
import{
selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';
            
import Select from '@material-ui/core/Select';
import './style.css';

const MarkAttendanceComponent = ({
selectedStudents,
selectCourseFromLessonPlanCourseDropDown,
selectLessonFromLessonPlanDropDown,
selectedCourseFromLessonPlanCourseDropDown,
selectedLessonFromLessonPlanDropDown, 
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
};

const commitEdit = (e) => {
    e.preventDefault();
    try {
        let attendaceData = { 
            attendanceDate: attendanceDate, 
            attendanceMark: attendanceMark, 
            selectedStudents: selectedStudents, 
            courseId: selectedCourseFromLessonPlanCourseDropDown?._id, 
            lessonId: selectedLessonFromLessonPlanDropDown?._id 
        };

        onSubmit(attendaceData);
        reset();
    } catch (error) {
        setEditing(false);
        setEditing(true);    
    }; 
};

const cancelEdit = (e) => {
    e.preventDefault();
    reset();
};

// const setInitialValuesForInputFields = () => {
//     setAttendanceDate(Date.now());
//     markAttendance(undefined);
//     setEditing(false);
// };

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
                <span className="dropDownSelector">
                <span>
                    <form>
                        <Select 
                            inputProps={{ 'aria-label': 'Without label' }}
                            className={'space-between-select'}
                            value={ attendanceMark } onChange={ e => markAttendance( e.target.value) } 
                        >
                            <option key={"Default"} value={"Default"} className="space-between-select"> {"Select"} </option>
                            <option key={"Present"} value={"Present"} className="space-between-select"> {"Present"} </option>
                            <option key={"Absent"} value={"Absent"} className="space-between-select"> {"Absent"} </option> 
                            <option key={"Tardy"} value={"Tardy"} className="space-between-select">  {"Tardy"} </option>    
                           
                        </Select>
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
    );               
};

const mapDispatch = {
    selectCourseFromLessonPlanCourseDropDown,
    selectLessonFromLessonPlanDropDown,
    resetError: resetClassRoomUserError, 
    resetClassRoomUserError
};

const mapState = (state, ownProps) => {
    return {
        selectedCourseFromLessonPlanCourseDropDown: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonFromLessonPlanDropDown: state.lessons.selectedLessonFromLessonPlanDropDown,
        saveInProgress: state.classrooms.saveLessonInProgress,
        error: state.classrooms.onSaveError
    };
};

export default connect( mapState, mapDispatch )(MarkAttendanceComponent);