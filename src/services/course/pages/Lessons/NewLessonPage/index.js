import { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetLessonError, 
deleteLesson } from 'services/course/actions/lessons';

import {
forms } from 'services/course/pages/Lessons/NewLessonPage/helpers';

import { 
Validations } from 'services/course/helpers/Validations';

import './style.css';

const NewLessonPage = ({
    resetError,
    resetLessonError, 
    saveLessonInProgress, 
    lesson,
    lessons,
    error,
    className,
    onSubmit,
    deleteLesson,
    currentUser,
    onlineQuestions,
    courseId,
    operatorBusinessName,
    children}) => {
    let initialValue = lesson ? lesson?.title : '';
    const [ editing, setEditing ] = useState(false);
    const [ title, setTitle ] = useState(initialValue);
    const inputRef = useRef();

    const reset = () => {
        setTitle(initialValue);
        setEditing(false);
        resetLessonError();
    };

    const commitEdit = (e) => {
        e.preventDefault();

    if ( Validations.duplicateCheck( title,  lessons, "lesson title", "title" ) ) {
        return;
    }
        onSubmit( title )
        .then(reset)
        .catch( error => {
            setEditing(false);
            setEditing(true);
        });
    };

    const setInnerTitle = () => {
        setTitle(initialValue);
    };

    const beginEditing = () => {
        setInnerTitle();
        setEditing(true);
    };

    const performDelete = () => {
        deleteLesson(lesson);
    };

    useEffect (() => {
        if ( editing ) {
            inputRef.current.focus();
        }
    }, [ editing ]); 

    if ( saveLessonInProgress ){
        return <div>Save in progress, please wait.</div>;
    };

    const formProps = {
        operatorBusinessName,
        currentUser,
    };

return editing ? (
           <>
            <form
                className= {`${className || ''} editing ${ error ? 'error' : '' }`}
                onSubmit={commitEdit}            
            >    
            <input 
                ref={ inputRef }
                value={ title }
                onChange={ e => setTitle( e.target.value) }
                onBlur={ reset }
                placeholder="add your new lesson"
            />
            </form>
             {error && <div>{error.message}</div>}
           </>
            ) : ( 
                children(beginEditing, performDelete, forms )
            );                
};

const mapState = ( state, ownProps ) => {
    return {
        currentUser: state.users.user,
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        onlineQuestions: Object.values(state.onlineQuestions.onlineQuestions),
        error: state.lessons.onSaveLessonError
    };
};

export default connect(mapState, { resetError: resetLessonError, resetLessonError, deleteLesson} )(NewLessonPage);