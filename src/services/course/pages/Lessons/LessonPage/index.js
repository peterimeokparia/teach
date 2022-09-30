import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { saveLesson } from 'services/course/actions/lessons';
import { restrictTextLength } from 'services/course/pages/Courses/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import NavLinks from 'services/course/pages/components/NavLinks';
import './style.css';

const LessonPage = ({ 
  lesson, 
  lessonId,  
  previewMode, 
  saveLesson,
  currentUser }) => { 
  const [ textAreaValue, setTextAreaValue ] = useState("");

  useEffect(() => {
    if ( textAreaValue && textAreaValue !== "" ) {
      saveLesson({...lesson, introduction: textAreaValue });
    }
  }, [ textAreaValue, previewMode, saveLesson, lesson ]);

  const handleTextAreaInput = ( eat ) => {
    setTextAreaValue( eat?.target?.value );
  };

return <div className=""><div className="lessonPage">
  <div className= { (currentUser?.role === role.Tutor) ? 'title' : 'title-student' }>
    
    <NavLinks to={`/lessons/${lessonId}/more`}>
      <span className="multicolortext"> {`${restrictTextLength( lesson?.title, 15, 15 )}`} </span>
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
</div>;
};

const mapState = (state, ownProps)   => {
  return {
    currentUser: state.users.user,
    previewMode: state.app.previewMode,
    lesson: state.lessons.lessons[ownProps?.lessonId]
  };
};

export default connect(mapState, { saveLesson } )(LessonPage);
