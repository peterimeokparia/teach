import {
useState,
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
togglePreviewMode } from 'Services/course/Actions/App';

import {
saveLesson } from 'Services/course/Actions/Lessons';

import { 
navigate } from '@reach/router';

import NavLinks from 'Services/course/Pages/Components/NavLinks';
import './style.css';

const LessonPage = ({ 
  lesson, 
  lessonId,  
  previewMode, 
  saveLesson,
  togglePreviewMode, 
  currentUser  }) => { 

  const [ textAreaValue, setTextAreaValue ] = useState("");

  useEffect(() => {

    if ( textAreaValue && textAreaValue !== "" ) {
      saveLesson({...lesson, introduction: textAreaValue });
    }

  }, [ previewMode ]);

  const handleTextAreaInput = ( eat ) => {
    setTextAreaValue( eat?.target?.value )
  }

return <div className="lessonPage">
  <NavLinks to={`/lessons/${lessonId}/more`}>
    <span className="multicolortext"> {`${lesson?.title}`} </span><span>>></span>
  </NavLinks>
  { (previewMode) && <div>  
      <p> Write a brief introduction about this lesson.<br/> Set expectations and takeaways. </p>
      <textarea id="txtid" type={"textarea"} name="txtname" rows="7" cols="50" maxlength="200" onChange={handleTextAreaInput} value={textAreaValue} />
    </div>
  }
</div>;
};

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[ownProps.lessonId], 
    currentUser: state.users.user
  };
};

export default connect(mapState, { togglePreviewMode, saveLesson } )(LessonPage);
