import { 
    useState, 
    useRef, 
    useEffect } from 'react';
    
    import { 
    connect } from 'react-redux';
    
    import {
    selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
                
    import{
    selectLessonFromLessonPlanDropDown } from 'services/course/actions/lessons';
            
    import { 
    resetClassRoomUserError } from 'services/course/actions/classrooms';
    import './style.css';
    
    const AddStudentGrade = ({
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
    const [ testDate, setTestDate ] = useState(Date.now());
    const [ testScore, setTestScore ] = useState(0);
    const inputRef = useRef();
    
    const reset = () => {
        setTestDate(Date.now());
        setTestScore(0);
        setEditing(false);
        resetClassRoomUserError();
    };
    
    const commitEdit = (e) => {
        e.preventDefault();
        let gradeData = { testDate: testDate, score: testScore, selectedStudents: selectedStudents, courseId: selectedCourseFromLessonPlanCourseDropDown?._id, lessonId: selectedLessonFromLessonPlanDropDown?._id };
    
        try {
            onSubmit(gradeData);
            reset();
        } catch (error) {
            setEditing(false);
            setEditing(true);    
        }
    };
    
    const cancelEdit = (e) => {
        e.preventDefault();
        reset();
    };
    
    // const setInitialValuesForInputFields = () => {
    //     setTestDate(Date.now());
    //     setTestScore(undefined);
    //     setEditing(false);
    // };
    
    // const beginEditing = () => {
    //     setInitialValuesForInputFields();
    //     setEditing(true);
    // };
    
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
                    type="datetime-local"
                    onChange={ e => setTestDate( e.target.value) }
                    disabled={saveInProgress}
                    placeholder="Test Date"
                />
                </label>  
                <label>    
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
    
    export default connect(mapState, mapDispatch )(AddStudentGrade);