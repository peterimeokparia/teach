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
Validations } from 'services/course/helpers/Validations';

import { 
navigate } from '@reach/router';

import {
v4 as uuidv4 } from 'uuid';

import {
formTypes } from 'services/course/pages/FormBuilder/helpers';
  
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

    const generateUuid = () => {
        const uuid = uuidv4();
        return uuid;
    };
    const reset = () => {
        setTitle(initialValue);
        setEditing(false);
        resetLessonError();
        //resetError();
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

    const forms = ( lesson, typeOfForm ) => {

        let uuid = generateUuid(),
            userId = currentUser?._id, 
            formUuId = uuid, 
            formId = lesson?._id, 
            formName = "", 
            formType = "";

        switch ( typeOfForm ) {

            case formTypes.quizzwithpoints:   
            formName = `${lesson?.title}-quizz_${uuid}`;
            formType = formTypes?.quizzwithpoints;
            navigate(`/${operatorBusinessName}/${formType}/${formName}/${formId}/${formUuId}/${userId}`);
                break;

            case formTypes.homework: 
            formName = `${lesson?.title}-${formTypes?.homework}_${uuid}`; 
            formType = formTypes?.homework; 
            navigate(`/${operatorBusinessName}/${formType}/${formName}/${formId}/${formUuId}/${userId}`);
                break;

            default:
                break;
        }
    };

    useEffect (() => {
        if ( editing ) {
            inputRef.current.focus();
        }
    }, [ editing ]); 

    if ( saveLessonInProgress ){
        return <div>Save in progress, please wait.</div>;
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