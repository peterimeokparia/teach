import React from 'react';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from 'Services/course/Actions/App';

import LessonEditorDemo from 'Services/course/Pages/Lessons/LessonEditorDemo';

const LessonPage = ({ lesson, previewMode, togglePreviewMode, currentUser  }) => {
  return <LessonEditorDemo lesson={lesson} currentUser={currentUser}/>
}

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[ownProps.lessonId], 
    currentUser: state.users.user
  };
}

export default connect(mapState, { togglePreviewMode } )(LessonPage);







// import LessonEditor from './LessonEditor';
// import MarkDown from 'react-markdown';
// return  previewMode ? (    
//      <div> 

//         <LessonEditor lesson={lesson}/>
        
//      </div> 
//       ) : (    
//       <div> 

//         <MarkDown source={lesson?.markDown} />
  
//       </div> 
// );