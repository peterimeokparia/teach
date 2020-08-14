import React from 'react';
import { connect } from 'react-redux';
import { setLessonMarkDown } from '../actions';
import './LessonEditor.css';

//https://css-tricks.com/textarea-tricks/ for mark up language instructions
const LessonEditor = ({ lesson, setLessonMarkDown }) => {


    return (    
        <div> 
            Viewing lesson: {lesson.title} 
            <div>
                <textarea
                    className="Editor"
                    rows="10"
                    cols="65"
                    value={lesson.markDown || ''}
                    onChange={ ( e ) => setLessonMarkDown(lesson, e.target.value )}>
                </textarea>
            </div>    
        </div> 
       
    );

}




export default connect(null, { setLessonMarkDown } )(LessonEditor);