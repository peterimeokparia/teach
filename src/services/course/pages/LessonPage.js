import React from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'react-redux';
import LessonEditor from './LessonEditor';
import MarkDown from 'react-markdown';
import MDEditor from '@uiw/react-md-editor';
import { togglePreviewMode } from '../actions';



const LessonPage = ({ lesson, previewMode, togglePreviewMode  }) => {

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


export default connect(mapState, { togglePreviewMode } )(LessonPage);