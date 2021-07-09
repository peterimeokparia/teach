import { useState, useEffect, useRef } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewExam } from 'Services/course/Actions/Exams';

import Select from 'react-select';

import { 
Validations } from  'Services/course/helpers/Validations';

const NewExam = ({
saveInProgress,
onSaveError,
user,
exams,
courses,
operator,
dispatch }) => {

    const [ examTitle, setExamTitle ] = useState('');
    const [ examDescription, setExamDescription ] = useState('');
    const [ examDateTime, setExamDateTime ] = useState('');
    const [ examCoursesCovered, setExamCoursesCovered ] = useState([]);
    const [ examLessonsCovered, setExamLessonsCovered ] = useState([]);
    const inputRef = useRef();
    let currentUser = user;

    useEffect (() => {
        inputRef.current.focus();
    }, []); 

    const handleSubmit = e => { 
        e.preventDefault(); 

        if ( (Validations.checkFormInputString("Exam Title", examTitle)) && 
              (Validations.checkFormInputNumber("Exam Description", examDescription)) &&
                (Validations.checkFormInputNumber("Exam DateTime", examDateTime)))
        {

            if ( Validations.duplicateCheck( examTitle,  exams, "exam title", "name" ) ) {
                return;
            }

            dispatch( addNewExam( 
                    examTitle, 
                    examDescription, 
                    examDateTime, 
                    currentUser, 
                    operator, 
                    examCoursesCovered, 
                    examLessonsCovered 
            ));

        }
     };

    if ( saveInProgress ) {
        return <div>...loading</div>
    } 

    if ( onSaveError ) {
        return <div> { onSaveError.message } </div> ;
    }      

    const filteredCourses = courses?.filter( course => course.createdBy === currentUser?._id );
    const filteredLessons = lessons?.filter( lesson => examCoursesCovered.find( course => course?.value?._id === lesson?.courseId ));
    const courseOptions = filteredCourses.map( item => ( { value: item,  label: item?.name }));
    const lessonOptions = filteredLessons.map( item => ( { value: item,  label: item?.name }));

    return (
    <div className="NewCourse">
        <h1>{`Create new exam.`}</h1> 
        <br></br>
        <form onSubmit={handleSubmit}> 
            <label>
                Enter exam title:
                <input
                   ref={inputRef} 
                   disabled={saveInProgress} 
                   value={examTitle} 
                   onChange={(e) => setExamTitle(e.target.value)}
                />
             </label>
             <label>
                   { "Enter exam date & time:" }  
                <input
                   disabled={saveInProgress} 
                   type="datetime-local"
                   value={examDateTime} 
                   onChange={(e) => setExamDateTime(e.target.value)}
                />        
            </label>
            <label>
                   Enter exam description:  
                <input
                   disabled={saveInProgress} 
                   value={examDescription} 
                   onChange={(e) => setExamDescription(e.target.value)}
                />         
            </label>
            { onSaveError && (
                <div className="saveError-message">
                    Error: { onSaveError.message }
                </div>
            )}
           <label>
               Add courses covered by this exam:
                <Select
                    isMulti
                    value={examCoursesCovered}
                    onChange={setExamCoursesCovered}
                    options={courseOptions} 
                />
           </label>
           {
              (examCoursesCovered) &&  
                <div>
                    <label>
                        Add lessons covered by this exam:
                        <Select
                            isMulti
                            value={examLessonsCovered}
                            onChange={setExamLessonsCovered}
                            options={lessonOptions} 
                        />
                    </label>
               </div>    
           }
            <button type="submit" disabled={saveInProgress} >Create Exam</button>
        </form>

    </div>
    );
};

const mapState = (state, ownProps ) => ({
    exams: Object.values(state?.exams?.exams)?.filter(crs => crs?.operatorId === ownProps.operator?._id),
    courses: getCoursesByOperatorId(state, ownProps),
    saveInProgress: state.exams.saveInProgress,
    onSaveError: state.exams.onSaveError,
});

export default connect(mapState, { addNewExam } )(NewExam);