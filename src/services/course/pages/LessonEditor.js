import React from 'react';
import { connect } from 'react-redux';
import { setLessonMarkDown } from '../actions';

const LessonEditor = ({ lesson, setLessonMarkDown }) => {


    return (    
        <div> 
            Viewing lesson: {lesson.title} 
            <div>
                <textarea
                    className=""
                    value={lesson.markDown || ''}
                    onChange={ ( e ) => setLessonMarkDown(lesson, e.target.value )}>
                </textarea>
            </div>    
        </div> 
       
    );

}




export default connect(null, { setLessonMarkDown } )(LessonEditor);