import React from 'react';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from '../../actions';

import LessonEditor from './LessonEditor';

import MarkDown from 'react-markdown';

import MDEditor from '@uiw/react-md-editor';

import LessonEditorDemo from './LessonEditorDemo';



const LessonPage = ({ lesson, previewMode, togglePreviewMode, currentUser  }) => {

  return <LessonEditorDemo lesson={lesson} currentUser={currentUser}/>

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
         lesson: state.lessons.lessons[ownProps.lessonId], 
         currentUser: state.users.user
  };
}


export default connect(mapState, { togglePreviewMode } )(LessonPage);