import { 
connect } from 'react-redux';

import { 
Link, navigate } from '@reach/router';

import {
role } from 'services/course/helpers/PageHelpers';

import { 
addNewLesson, 
saveLesson,
setLessonPlanUrl,
setCurrentLesson, 
startLesson } from 'services/course/actions/lessons';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 
    
import { 
deleteFileByFileName } from 'services/course/api';

import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName, 
getCalendarByCalendarEventType, 
getCalendarsByOperatorId,
getEventByCourseIdLessonIdUserId, 
getTutorsLessonUserNotesByLessonId,
getStudentsLessonUserNotesByLessonId } from 'services/course/selectors';

import { 
addCalendar } from 'services/course/actions/calendar';

import {
addNotes,
loadAllNotes } from 'services/course/actions/notes';

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
Markup } from 'interweave';

import { 
deleteQuestionIconStyle,
sideBarEditIconStyle,
sideBarDeleteIconStyle,
sideBarHomeWorkIconStyle,
sideBarHelpIconStyle,
swapHorizIconStyle,
calendarStyle } from '../inlineStyles';

import {
formTypes } from 'services/course/pages/FormBuilder/helpers';

import {
eventEnum } from 'services/course/pages/CalendarPage/helpers';

import {
goToCalendar } from 'services/course/pages/Users/helpers';

import {
incrementDisplayedItemCount,
toggleDisplayedItems } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/helpers';

import LessonOutComesComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/LessonOutComesComponent';
import useCourseDisplayHook from 'services/course/pages/Courses/hooks/useCourseDisplayHook';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import HelpIcon from '@material-ui/icons/Help';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import MainMenu from 'services/course/pages/components/MainMenu';
import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'services/course/pages/components/Roles';
import ListItem from 'services/course/pages/components/ListItem';

const CourseDisplayViewComponent = ({
    props,
    previewMode,
    saveLesson,
    outcomes,
    setMarkDown,
    addNewLesson,
    startLesson,
    onLessonError,
    courseId,
    lessonId,
    calendars,
    calendar,
    addCalendar,
    addNotes,
    loadAllNotes,
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
    selectedLessonPlanLesson,
    event,
    allEvents,
    studentsNote,
    tutorsNote }) => {

    let courseDisplayProps = {
        operatorBusinessName,
        currentUser,
        course, 
        courses,
        lessons,
        selectedTutorId,
        setCurrentLesson,
        setLessonPlanUrl,
        previewMode,
        selectedLessonPlanLesson,
        togglePreviewMode,
        saveLesson,
        setItemInSessionStorage,
        deleteFileByFileName,
        togglePreviewMode,
        saveLesson,
        startLesson,
        users,
        calendars,
        calendar,
        addCalendar,
        operatorBusinessName,
        operator,
        courseId,
        lessonId,
        event,
        allEvents,
        addNotes,
        loadAllNotes,
        studentsNote,
        tutorsNote
        // lessonItem,
        // setFileToRemove,
        // setLessonItem,
        // fileToRemove
    };

    let {
        onMatchListItem, 
        setPreviewEditMode,
        navigationContent,
        selectedCourse,
        lessonsByCourseId,
        fileToRemove,
        lessonItem,
        setFileToRemove,
        setLessonItem,
        calendarProps,
        lessonProps,
        formProps, 
        startLessonSession
    } = useCourseDisplayHook( courseDisplayProps );
    

return (
    <div className="CourseDetail"> 
        <header>
            <div>
            <MainMenu 
                navContent={navigationContent}
            />
             <div className="multiColor"> { ( courseId ) ? selectedCourse?.name : course?.name} </div>
            </div>
                <Roles
                    role={  currentUser?.role === role.Tutor }
                >
                    <EditIcon 
                        onClick={setPreviewEditMode}
                        color="action"
                        className="comment-round-button-1"
                        style={ deleteQuestionIconStyle() }
                    />
                </Roles>
                <LoginLogout
                    operatorBusinessName={operatorBusinessName}
                    user={currentUser} 
                    operator={operator}
                />
        </header>
        <div className="content"> 
                <div className="sidebar"> 
                <ListItem
                    collection={lessonsByCourseId}
                    onMatchListItem={onMatchListItem}
                    path={"lessons"}
                >
                    {( lesson ) => (
                        < NewLessonPage
                            className="lesson-item"
                            lessons={lessonsByCourseId}
                            lesson={lesson}
                            courseId={courseId}
                            onSubmit={(title) => saveLesson({...lesson, title})}
                            operatorBusinessName={ operatorBusinessName }
                        >
                        { (edit, remove, forms) => (
                           <div>
                            <div>
                                <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} className="lessonMultiColor">{ lesson?.title } </span> </Link> 
                            </div>
                            <div className="row justify-content-center"> 
                                <span>
                                <SportsScoreIcon 
                                    onClick={() => startLessonSession()}
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ calendarStyle() }
                                />
                                <CalendarMonthIcon 
                                    onClick={() => goToCalendar( calendarProps, currentUser, eventEnum?.Lessons )}
                                    color="action"
                                    className="comment-round-button-4"
                                    style={ calendarStyle() }
                                />
                                </span>
                            </div>
                            <div className="row justify-content-center">
                            <span> 
                            <Roles
                                role={ currentUser?.role === role.Tutor }
                            >
                                <EditIcon 
                                    onClick={() => { edit(lesson.title); } }
                                    color="action"
                                    className="comment-round-button-1"
                                    style={ sideBarEditIconStyle() }
                                />
                            </Roles>
                            <Roles
                                role={currentUser?.role === role.Tutor }
                            >
                                <DeleteIcon 
                                    onClick={remove}
                                    color="action"
                                    className="comment-round-button-3"
                                    style={ sideBarDeleteIconStyle() }
                                />
                            </Roles>
                            {/* <Roles
                                role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            > */}
                                <HelpIcon 
                                    onClick={() => { forms( lesson, formTypes.quizzwithpoints, formProps ) } }
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ sideBarHelpIconStyle(currentUser) }
                                />
                            {/* </Roles> */}
                            {/* <Roles
                            role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            > */}
                                <HomeOutlinedIcon 
                                    onClick={() => { forms( lesson, formTypes.homework, formProps ) } }
                                    color="action"
                                    className="comment-round-button-4"
                                    style={ sideBarHomeWorkIconStyle() }
                                />
                            {/* </Roles> */}
                            {/* <Roles
                                role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            >  */}
                                <SwapHorizIcon 
                                    onClick={() => incrementDisplayedItemCount(  lessonItem, setLessonItem, operatorBusinessName ) }
                                    color="action"
                                    className="comment-round-button-6"
                                    style={ swapHorizIconStyle() }
                                />
                            {/* </Roles> */}
                            </span> 
                            </div>   
                 
                        </div>
                         
                        )}
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
                {/*SIDE BAR 1 */}
                </div>
                <div className="lesson-content"> 
                    <div className="lesson2">   

                    { courseDetailChildren }

                    {
                        <div> 
                            <h5>
                                <Markup content={selectedLessonPlanLesson?.introduction} />
                            </h5>
                               
                        </div>
                    }
                    </div> 
                    <div className="toggleItems"> 
                    {
                        toggleDisplayedItems( lessonItem, selectedLessonPlanLesson, courseDisplayProps )  
                    }
                    { ( lessonItem ) && 
                        <div className="sidebar" >
                            <LessonOutComesComponent 
                                buttonText={'Add New Lesson Outcome'}
                                courseId={courseId}
                                lessonId={lessonId}
                            />
                        </div>          
                    }
                    </div> 
                </div> 
        </div>
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
    addCalendar,
    startLesson,
    addNotes,
    loadAllNotes
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        user: state.users.user,
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
        event: getEventByCourseIdLessonIdUserId(state, ownProps),
        allEvents: Object.values( state.events.events),
        studentsNote: getStudentsLessonUserNotesByLessonId( state, ownProps ),
        tutorsNote: getTutorsLessonUserNotesByLessonId( state, ownProps )
    };
};

export default connect( mapState, mapDispatch )(CourseDisplayViewComponent);