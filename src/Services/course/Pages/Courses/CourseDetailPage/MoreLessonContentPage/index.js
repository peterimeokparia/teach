import { 
useEffect,
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
addNewLesson, 
saveLesson,
setLessonPlanUrl,
setCurrentLesson, 
loadLessons} from 'Services/course/Actions/Lessons';

import { 
togglePreviewMode } from 'Services/course/Actions/App';

import { 
SET_LESSON_MARKDOWN } from 'Services/course/Actions/Lessons'; 

import { 
setMarkDown } from 'Services/course/helpers/EditorHelpers'; 
    
import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector } from 'Services/course/Selectors';

import EditorComponent  from 'Services/course/Pages/Components/EditorComponent';
import MaterialUiVideoComponent from 'Services/course/Pages/Components/MaterialUiVideoComponent';
import './style.css';

const MoreLessonContentPage = ({
    previewMode,
    saveLesson,
    setMarkDown,
    addNewLesson,
    setVideoUrl,
    lessonId,
    courseId,
    selectedTutorId,
    currentVideoUrl,
    setLessonPlanUrl,
    setCurrentLesson,
    course,
    lessons,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    currentUser, 
    selectedLessonPlanLesson
}) => {
    useEffect(() => {
        loadLessons(courseId)
    }, [])

function handleChange( editor, element ){
    let duration = 2000;  

    setMarkDown(
    element, 
    editor.getHTML(), 
    { propNameOne: "lessons",  propNameTwo: "lessons" }, 
    SET_LESSON_MARKDOWN, 
    saveLesson, 
    duration
    );
};

let lesson = lessons.find(lsn => lsn?._id === lessonId )

return <div className="builder2"> 
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
                    < MaterialUiVideoComponent 
                        className={"onlineQuestionVideoComponent"} 
                        element={ lesson } 
                        //  videoMeta={videoMeta( lessonTest )}
                        // saveRecording={saveRecording}
                        extendedMeetingSettings={false} 
                    />
                </div>   
                <div className="lesson2">        
                    { 
                        <EditorComponent
                            handleChange={(editor) => handleChange(editor,  lesson)}
                            content={ lesson?.markDown }
                        /> 
                    }            
                </div> 
            </div>
        </div>
        </div>
    </div>
};

const mapDispatch = {
    addNewLesson, 
    saveLesson, 
    setMarkDown,
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
    };
};

export default connect( mapState, mapDispatch )(MoreLessonContentPage);