import React from 'react';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from '../../actions';

import LessonEditor from '../Lessons/LessonEditor';

import MarkDown from 'react-markdown';

 





const CourseDropDownPage = ({ lesson, previewMode, togglePreviewMode  }) => {

    return  previewMode ? (    
         <div> 

            <LessonEditor lesson={lesson}/>
            
         </div> 
          ) : (    
          <div> 

            <MarkDown source={lesson?.markDown} />
      
          </div> 
    );

}



const mapState = (state, ownProps)   => {
  return {
         previewMode: state.app.previewMode,
         lesson: state.lessons.lessons[ownProps.lessonId]
  };
}


export default connect(mapState, { togglePreviewMode } )(CourseDropDownPage);