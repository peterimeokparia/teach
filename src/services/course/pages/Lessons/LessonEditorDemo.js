import React from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson } from '../../actions';

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


const LessonEditorDemo = ({ lesson, setMarkDown, currentUser }) => {

   return (
        <Dante
          content={ (lesson?.markDown === undefined) ? null : JSON.parse(lesson?.markDown) } 
          onChange={ ( editor ) => setMarkDown(lesson, JSON.stringify(editor.emitSerializedOutput()), "lessons", SET_LESSON_MARKDOWN, saveLesson )} 
          read_only={currentUser?.role === role.Student ? true : false } 
        />  
   );

}


export default connect(null, { setMarkDown, saveLesson } )(LessonEditorDemo);
