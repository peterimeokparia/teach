import { 
useEffect,
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
loadAllNotes,
addNotes, 
saveNotes,
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

import { 
togglePreviewMode } from 'services/course/actions/app';

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor'; 
    
import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector, 
getLessonByLessonIdSelector,
getLessonUserNotesByNoteType} from 'services/course/selectors';

import EditorComponent  from 'services/course/pages/components/EditorComponent';
import Meeting from 'services/course/pages/Meeting';

import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import './style.css';

const Notes = ({
    previewMode,
    saveLesson,
    noteType,
    saveEditorMarkDownObjectToMw,
    addNewLesson,
    setVideoUrl,
    loadAllNotes,
    addNotes, 
    saveNotes,
    lessonId,
    courseId,
    noteId,
    notes,
    allNotes,
    user,
    eventId,
    selectedTutorId,
    currentVideoUrl,
    setLessonPlanUrl,
    setCurrentLesson,
    course,
    lessons,
    lesson,
    note,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    currentUser, 
    selectedLessonPlanLesson
}) => {

 return <div className="builder3"> 
        <header>
        {
            <div className="multicolortext">
                { lesson?.title }
            </div>
        }
        </header>
        <div className="content">
        <div className="onlinequestion-list-items">  
            <div className="OnlineListItems">
            <div className="lesson-content"> 
            </div>   
                <div className="lesson2">  
                <br></br>   <br></br>     <br></br>        
                    { 
                        <EditorComponent
                            upload_url={editor_upload_url}
                            handleChange={(editor) => handleChange({ ...note, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                            content={ note?.markDownContent }
                        /> 
                    }            
                </div> 
            </div>
        </div>
        </div>
    </div>;
};

const mapDispatch = {
    loadAllNotes,
    addNotes, 
    saveNotes,
    saveEditorMarkDownObjectToMw,
    togglePreviewMode
};

const mapState = (state, ownProps) => {
    return {
        user: state.users.user,
        operator: state.operators.opeator,
        operatorBusinessName: state?.operator?.operatorBusinessName,
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.lessons.course,
        onLessonError: state.lessons.onSaveLessonError,
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        lesson: getLessonByLessonIdSelector( state, ownProps ),
        note: getLessonUserNotesByNoteType( state, ownProps )
    };
};

export default connect( mapState, mapDispatch )(Notes);