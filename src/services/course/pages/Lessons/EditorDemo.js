import React, {  useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson, 
loadLessons} from '../../actions';

import { 
SET_LESSON_MARKDOWN } from '../../actions';

import {
role } from '../../../../helpers/pageHelpers';

import Dante from 'Dante2';

// Load some exemplary plugins:
// The rich text area plugin
import slate from '@react-page/plugins-slate';

// A plugin for background images
import background from '@react-page/plugins-background';

import './LessonEditor.css';

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


//5ff5367feb4c39d4e55d4444

const EditorDemo = ({ lesson, lesson2, lessonId,  setMarkDown, loadLessons, currentUser }) => {

useEffect(() => {

  let courseId = "5fcc705664f5891743b8a55f";

   loadLessons( courseId );

   console.log( "5ff5367feb4c39d4e55d4444") //5fcf8edb3746f3032f4e2a10
   console.log( Object.values(lesson2).find( les => les?._id === "5ff5367feb4c39d4e55d4444"))

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
         lesson2: state.lessons.lessons,
         lesson: state.lessons.lessons[ownProps?.lessonId], 
         currentUser: state.users.user
  };
}

export default connect(mapState, { setMarkDown, saveLesson, loadLessons } )(EditorDemo);
