import React from 'react';

import { 
connect } from 'react-redux';

import { 
setMarkDown, 
saveLesson } from 'Services/course/Actions/Lessons';

import { 
SET_LESSON_MARKDOWN } from 'Services/course/Actions/Lessons';

import {
role } from 'Services/course/helpers/PageHelpers';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';
import './style.css';

const LessonEditorDemo = ({ lesson, setMarkDown, currentUser }) => {
  return (
      <EditorComponent
        content={ (lesson?.markDown === undefined) ? null : JSON.parse(lesson?.markDown) } 
        onChange={ ( editor ) => setMarkDown(lesson, JSON.stringify(editor.emitSerializedOutput()), "lessons", SET_LESSON_MARKDOWN, saveLesson )} 
        read_only={currentUser?.role === role.Student ? true : false } 
      />  
  );
};

export default connect(null, { setMarkDown, saveLesson } )(LessonEditorDemo);
