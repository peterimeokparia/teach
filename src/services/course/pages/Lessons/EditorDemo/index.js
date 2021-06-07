import 
React, {  
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson, 
loadLessons} from 'Services/course/Actions/Lessons';

import { 
SET_LESSON_MARKDOWN } from 'Services/course/Actions/Lessons';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';
import './style.css';


const EditorDemo = ({
lesson, 
lessons,
lessonId,  
setMarkDown, 
loadLessons, 
currentUser }) => {
useEffect(() => {
  loadLessons( lesson?.courseId );
},[ loadLessons, lesson?.courseId ]);
// },[])

  const handleOnChange = ( editor ) => {
    if ( editor ) {
       if ( lesson ) {
        setMarkDown(lesson, JSON.stringify(editor.emitSerializedOutput()), "lessons", SET_LESSON_MARKDOWN, saveLesson );
       }
    }
  };
  
  return (
     <> 
     {
         <div className="CourseDetail">
               <div className="content">
               <div className="sidebar"/> 
                   <div>
                          <div>
                            {
                              (lesson) &&  <EditorComponent
                                              content={ (lesson?.markDown === undefined) ? null : JSON.parse(lesson?.markDown) } 
                                              onChange={handleOnChange} 
                                              // read_only={currentUser?.role === role.Student ? true : false } 
                                            />   
                            }
                          </div>
                   </div>
               </div>
         </div>
        
     }
     </>
   );
};

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lessons: state.lessons.lessons,
    lesson: state.lessons.lessons[ownProps?.lessonId], 
    currentUser: state.users.user
  };
};

export default connect(mapState, { setMarkDown, saveLesson, loadLessons } )(EditorDemo);
