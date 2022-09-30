import { 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewLesson, 
saveLesson,
setLessonPlanUrl,
setCurrentLesson, 
loadLessons } from 'services/course/actions/lessons';

import {
SET_NOTES_MARKDOWN } from 'services/course/actions/notes';

import {
editor_upload_url,
handleChange } from 'services/course/pages/OnlineQuestionsPage/helpers';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
saveEditorMarkDownObjectToMw } from 'services/course/actions/editor';

import { 
getUsersByOperatorId,  
getTutorsLessonUserNotesByLessonId,  
getCoursesByCreatedByIdSelector } from 'services/course/selectors';

import EditorComponent  from 'services/course/pages/components/EditorComponent';
import MaterialUiVideoComponent from 'services/course/pages/components/MaterialUiVideoComponent';
import './style.css';

const MoreLessonContentPage = ({
    saveEditorMarkDownObjectToMw,
    lessonId,
    courseId,
    lessons,
    note,
}) => {
    useEffect(() => {
        loadLessons(courseId);
    }, [ courseId ]);

let lesson = lessons.find(lsn => lsn?._id === lessonId );

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
            <div className="video-component">
            < MaterialUiVideoComponent 
                className={"onlineQuestionVideoComponent"} 
                element={ lesson } 
                extendedMeetingSettings={false} 
            />
            </div>
            </div>   
                <div className="lesson2">        
                    { 
                        <EditorComponent
                            handleChange={(editor) => handleChange({ ...note, markDownContent: editor }, SET_NOTES_MARKDOWN, `/notes/`, saveEditorMarkDownObjectToMw )}
                            content={ note?.markDownContent }
                            upload_url={editor_upload_url}
                        /> 
                    }            
                </div> 
            </div>
        </div>
        </div>
    </div>;
};

const mapDispatch = {
    addNewLesson, 
    saveLesson, 
    saveEditorMarkDownObjectToMw,
    setLessonPlanUrl,
    setCurrentLesson,
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
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.lessons.course,
        onLessonError: state.lessons.onSaveLessonError,
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess, 
        note: getTutorsLessonUserNotesByLessonId(state, ownProps),
    };
};

export default connect( mapState, mapDispatch )(MoreLessonContentPage);