import React from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson } from '../../actions';

import { 
SET_LESSON_MARKDOWN } from '../../actions';

import './LessonEditor.css';


const LessonEditor = ({ lesson, setMarkDown }) => {

    return (    
        <div> 
            Enter lesson notes for: {lesson?.title} 
            <div>
                <textarea
                    className="Editor"
                    rows="10"
                    cols="65"
                    value={lesson?.markDown || ''}
                    onChange={ ( e ) => setMarkDown(lesson, e.target.value, "lessons", SET_LESSON_MARKDOWN, saveLesson )}>
                </textarea>
            </div>    
        </div> 
       
    );

}




export default connect(null, { setMarkDown, saveLesson } )(LessonEditor);