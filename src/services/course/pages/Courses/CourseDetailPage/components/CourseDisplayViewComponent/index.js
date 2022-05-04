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

import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
toast } from 'react-toastify';

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

import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
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
import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
import MultiInputEmailComponent from 'services/course/pages/Email/MultiInputEmailComponent';
import ListItem from 'services/course/pages/components/ListItem';
import Swal from 'sweetalert2';

const CourseDisplayViewComponent = ({
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

    const invitationUrl = `http://localhost:3000/${operatorBusinessName}/LessonPlan/invite/userverification/classRoom/${course?.createdBy}`;
    const fileUploadUrl =  "/api/v1/fileUploads";
    const [ fileToRemove, setFileToRemove ] = useState( undefined );
    const [ lessonItem, setLessonItem  ] = useState( 0 )

    const onMatchListItem = ( match, listItem ) => {
        if( match ){
            setCurrentLesson( listItem );
            setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${course?._id}/${listItem._id}/${listItem.title}`);
            setItemInSessionStorage('currentLesson', listItem);

            if ( previewMode && (currentUser?.role === role.Tutor) && (!listItem?.introduction || listItem?.introduction === "") ) {
                const msg = "Please enter a lesson introduction.";
                
                Swal.fire(msg);
                return false;
            }
        }
    }; 

    const setPreviewEditMode = () => {
        if ( ! selectedLessonPlanLesson ) {
            toast.error("Please click on the lesson link.");
            return;  
        }
        togglePreviewMode();
    };

    if ( fileToRemove ) {
        selectedLessonPlanLesson.files = selectedLessonPlanLesson?.files?.filter( files => files !== fileToRemove );
        saveLesson( selectedLessonPlanLesson );
        deleteFileByFileName( fileToRemove?.split('/files/')[1]);       
    }

    let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;  
    let selectedCourse =  courses?.find(course => course?._id === courseId );
    let lessonsByCourseId = lessons?.filter( lesson => lesson?.courseId === courseId && lesson?.userId === selectedTutorId );

    const incrementDisplayedItemCount = () => {
           navigate(`/${operatorBusinessName}/animate`);
        ///navigate(`/${operatorBusinessName}/search`)
        //navigate(`/${operatorBusinessName}/editor`)
        // navigate(`/${operatorBusinessName}/questions/missedQuestions/quizzwithpoints/Bonds-quizz_4caf799f-371a-4332-853e-7eb477e2a48e`);
        if ( lessonItem === 2 ) {
            setLessonItem( 0 );
            return;
        }
        setLessonItem( lessonItem + 1 );
    };

    const toggleDisplayedItems = ( key, selectedlesson ) => {
        switch (key) {
            case 1:
            return <div className="boardEditorDisplay">
                    <BoardEditorComponent 
                        courseId={courseId}
                        lessonId={selectedlesson?._id}
                        classRoomId={selectedTutorId}
                        operatorBusinessName={operatorBusinessName}
                        saveIconVisible={true}
                    />
                    </div>
            case 2:
            return < FormFileUpload
                        previewMode={previewMode}
                        currentObject={selectedlesson}
                        typeOfUpload={'userlessonfiles'}
                        fileUploadUrl={fileUploadUrl}
                        setFilesToRemove={setFileToRemove}
                        msg={"Please click on the lesson link before uploading files."}
                        saveAction={saveLesson}
                        fileViewer={lessonFileViewer}
                    />
            default:
            return < LessonPlanIframeComponent
                        name="embed_readwrite" 
                        source={selectedlesson?.videoUrl}
                        width="700px"
                        height="400px"
                        allow="camera;microphone"
                        scrolling="auto"
                        frameBorder="10" 
                        className={"iframe"}
                    />;
        }
    };

    const calendarProps = {
        users,
        calendars,
        calendar,
        addCalendar,
        operatorBusinessName,
        operator,
        courseId,
        lessonId: selectedLessonPlanLesson?._id,
        classRoomId: selectedTutorId
    };

 
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
                            something={lesson.title}
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
                                    onClick={() => { forms( lesson, formTypes.quizzwithpoints ) } }
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ sideBarHelpIconStyle(currentUser) }
                                />
                            {/* </Roles> */}
                            {/* <Roles
                            role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            > */}
                                <HomeOutlinedIcon 
                                    onClick={() => { forms( lesson, formTypes.homework ) } }
                                    color="action"
                                    className="comment-round-button-4"
                                    style={ sideBarHomeWorkIconStyle() }
                                />
                            {/* </Roles> */}
                            {/* <Roles
                                role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            >  */}
                                <SwapHorizIcon 
                                    onClick={incrementDisplayedItemCount }
                                    color="action"
                                    className="comment-round-button-6"
                                    style={ swapHorizIconStyle() }
                                />
                            {/* </Roles> */}
                             {/* <Roles
                                role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            >  */}
                                <CalendarMonthIcon 
                                    onClick={() => goToCalendar( calendarProps, currentUser, eventEnum?.Lessons )}
                                    color="action"
                                    className="comment-round-button-2"
                                    style={ calendarStyle() }
                                />
                            {/* </Roles> */}
                            </span>     
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
                            toggleDisplayedItems( lessonItem, selectedLessonPlanLesson )  
                        }
                    </div> 
                </div>           
                {/* <Roles
                    role={currentUser?.role === role.Student }
                > */}
                    {/* <div className="sidebar"> 
                        <MultiInputEmailComponent
                            setLesson={selectedLessonPlanLesson}
                            inputFieldOptions={emailInputOptions}
                            messageOptions={emailMessageOptions(currentUser,invitationUrl)} 
                        />
                    </div> */}
                {/* </Roles>           */}
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

export default connect( mapState, mapDispatch )(CourseDisplayViewComponent);