import {
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from 'services/course/actions/app';

import {
saveLesson } from 'services/course/actions/lessons';

import LessonOutComesComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/LessonOutComesComponent';
import NavLinks from 'services/course/pages/components/NavLinks';
import './style.css';

const LessonPage = ({ 
  lesson, 
  lessonId,  
  previewMode, 
  saveLesson,
  outcomes,
  togglePreviewMode, 
  currentUser  }) => { 
  const [ textAreaValue, setTextAreaValue ] = useState("");

  useEffect(() => {
    if ( textAreaValue && textAreaValue !== "" ) {
      saveLesson({...lesson, introduction: textAreaValue });
    }
  }, [ previewMode ]);

  const handleTextAreaInput = ( eat ) => {
    setTextAreaValue( eat?.target?.value );
  };

return <div className=""><div className="lessonPage">
  <div className="title">
    <NavLinks to={`/lessons/${lessonId}/more`}>
      <span className="multicolortext"> {`${lesson?.title}`} </span>
    </NavLinks>
    { (previewMode) && <div className="textBoxItem">  
      <textarea 
        id="txtid" 
        type={"textarea"} 
        name="txtname" 
        rows="7" cols="50" 
        maxlength="200" 
        onChange={handleTextAreaInput} 
        value={textAreaValue}
        placeholder="Introduce lesson content, expectations and takeaways." 
      />
    </div>
  }
  </div>
</div>
</div>
};

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[ownProps?.lessonId], 
    currentUser: state.users.user,
    outcomes: Object.values(state.outcomes.outcomes)
  };
};

export default connect(mapState, { togglePreviewMode, saveLesson } )(LessonPage);
