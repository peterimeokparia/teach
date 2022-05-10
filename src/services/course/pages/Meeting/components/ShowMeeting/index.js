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
getLessonUserNotesByEventId 
} from 'services/course/selectors';

import Meeting from 'services/course/pages/Meeting';

const ShowMeeting = ({
    previewMode,
    saveLesson,
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
                    {      
                        <Meeting
                          userName={currentUser?.firstname}   
                          roomName={`${lessonId}`}
                          resizedHeight={"900px"}
                          containerHeight={"100%"}
                          containerWidth={"100%"}  
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
       //note: getLessonUserNotesByEventId( state, ownProps )
    };
};

export default connect( mapState, mapDispatch )(ShowMeeting);