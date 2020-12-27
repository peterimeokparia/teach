import React, { 
useState, 
useRef, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
resetLessonError, 
deleteLesson } from '../../actions';

import { 
Validations } from '../../../../helpers/validations';

import './NewLessonPage.css';


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
courseId,
children}) => {

        
let initialValue = lesson ? lesson?.title : '';
let dateInitialValue = lesson ? lesson?.lessonDate : Date.now(); 
const [ editing, setEditing ] = useState(false);
const [ title, setTitle ] = useState(initialValue);
const inputRef = useRef();



const reset = () => {
    setTitle(initialValue);
    setEditing(false);
    resetLessonError();
    //resetError();
}


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
}

const beginEditing = () => {
    setInnerTitle();
    setEditing(true);
}

const performDelete = () => {
     deleteLesson(lesson);
}

const recordLesson = () => {
     recordLesson()
}

useEffect (() => {

       if ( editing ) {

           inputRef.current.focus();

       }

}, [ editing ]); 


   if ( saveLessonInProgress ){

       return <div>Save in progress, please wait.</div>

   }


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
                    disabled={saveLessonInProgress}
                    placeholder="add your new lesson"
                />
                </form>
                   {error && <div>{error.message}</div>}
           </>
            ) : ( 
                   children(beginEditing, performDelete)
                );         
                
};


const mapState = ( state, ownProps ) => {
    return {
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        error: state.lessons.onSaveLessonError
    }
}


export default connect(mapState, { resetError: resetLessonError, resetLessonError, deleteLesson} )(NewLessonPage);