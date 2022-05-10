import { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, navigate } from '@reach/router';

import { 
addNewLesson, 
saveLesson,
setLessonPlanUrl,
setCurrentLesson } from 'services/course/actions/lessons';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 
    
import {
role } from 'services/course/helpers/PageHelpers';

import { 
emailInputOptions,    
emailMessageOptions } from  'services/course/pages/Courses/helpers';

import { 
deleteFileByFileName } from 'services/course/api';

import {
FormFileUpload } from 'services/course/pages/components/FormFileUpload';

import {
lessonFileViewer } from 'services/course/pages/Courses/helpers';

import { 
navContent } from 'services/course/pages/components/NavigationHelper';

import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName, 
getCalendarEventsByUserIdSelector, 
getCalendarsByOperatorId} from 'services/course/selectors';

import { 
addCalendar } from 'services/course/actions/calendar';

import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';
import Swal from 'sweetalert2';

const CourseLessonListComponent = ({
    props,
    previewMode,
    saveLesson,
    setMarkDown,
    addNewLesson,
    onLessonError,
    courseId,
    lessonId,
    calendars,
    calendar,
    addCalendar,
    users,
    courses,
    setVideoUrl,
    selectedTutorId,
    currentVideoUrl,
    setLessonPlanUrl,
    setCurrentLesson,
    course,
    lessons,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    courseDetailChildren,
    currentUser, 
    selectedLessonPlanLesson }) => {
  
return (
    // <div className="sidebar"> 
            <div> 
                <ListItem
                    collection={lessonsByCourseId}
                    onMatchListItem={onMatchListItem}
                    path={"lessons"}
                >
                    {( lesson ) => (
                        < NewLessonPage
                            something={lesson.title}
                            className="lesson-item"
                            lessons={lessonsByCourseId}
                            lesson={lesson}
                            courseId={courseId}
                            onSubmit={(title) => saveLesson({...lesson, title})}
                            operatorBusinessName={ operatorBusinessName }
                        >
                        { 
                          children( lesson )
                        }
                        </NewLessonPage> 
                    )}
                </ListItem>    
                <Roles
                    role={currentUser?.role === role.Tutor }
                >
                    < NewLessonPage 
                        className="add-lesson-button"
                        onSubmit={title => addNewLesson(title, title, courseId, Date.now(), selectedTutorId)} 
                        lessons={lessonsByCourseId}
                        courseId={courseId}
                    >
                        {(edit) =>  (
                            <div>
                            <button 
                                className="add-lesson-button"
                                onClick={edit}> 
                                Add New Lesson
                            </button>
                            { onLessonError && onLessonError?.message  }
                            </div>
                        )}
                    </NewLessonPage>
                </Roles>
                </div>                                
                    
    );
};

const mapDispatch = {
    addNewLesson, 
    saveLesson, 
    setMarkDown,
    setLessonPlanUrl,
    setCurrentLesson,
    togglePreviewMode,
    addCalendar
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarEventsByUserIdSelector(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        onLessonError: state.lessons.onSaveLessonError,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess, 
    };
};

export default connect( mapState, mapDispatch )(CourseLessonListComponent);