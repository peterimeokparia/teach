import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from 'services/course/actions/app';

import LessonEditor from 'services/course/pages/Lessons/LessonEditor';
import MarkDown from 'react-markdown';

const CourseDropDownPage = ({ lesson, previewMode, togglePreviewMode  }) => {
  return  previewMode ? (    
    <div> 
      <LessonEditor lesson={lesson}/>       
    </div> 
    ) : (    
    <div> 
      <MarkDown source={lesson?.markDownContent} /> 
    </div> 
  );
};

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[ownProps.lessonId]
  };
};

export default connect(mapState, { togglePreviewMode } )(CourseDropDownPage);