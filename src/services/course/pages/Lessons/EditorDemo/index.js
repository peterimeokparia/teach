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

import Dante from 'Dante2';
// Load some exemplary plugins:
// The rich text area plugin
import slate from '@react-page/plugins-slate';
// A plugin for background images
import background from '@react-page/plugins-background';

import './style.css';

// Stylesheets for the rich text area plugin
import '@react-page/plugins-slate/lib/index.css';

// Stylesheets for  background layout plugin
import '@react-page/plugins-background/lib/index.css';
// Define which plugins we want to use.
// We only have slate and background available, so load those.
const plugins = {
  // Define plugins for content cells.
  // To import multiple plugins, use [slate(), image, spacer, divider]
  content: [slate()],
  // Define plugins for layout cells
  layout: [background({ defaultPlugin: slate() })],
};

const EditorDemo = ({
lesson, 
lessons,
lessonId,  
setMarkDown, 
loadLessons, 
currentUser }) => {

useEffect(() => {
  loadLessons( lesson?.courseId );
},[])

  const handleOnChange = ( editor ) => {

    if ( editor ) {
       if ( lesson ) {
        setMarkDown(lesson, JSON.stringify(editor.emitSerializedOutput()), "lessons", SET_LESSON_MARKDOWN, saveLesson );
       }
    }
  }
  return (
     <> 
     {
         <div className="CourseDetail">
               <div className="content">
               <div className="sidebar"/> 
                   <div>
                          <div>
                            {
                              (lesson) &&  <Dante
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
   )
}

const mapState = (state, ownProps)   => {
  return {
    previewMode: state.app.previewMode,
    lessons: state.lessons.lessons,
    lesson: state.lessons.lessons[ownProps?.lessonId], 
    currentUser: state.users.user
  };
}

export default connect(mapState, { setMarkDown, saveLesson, loadLessons } )(EditorDemo);
