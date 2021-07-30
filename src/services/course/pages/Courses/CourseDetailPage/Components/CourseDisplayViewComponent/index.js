import { 
useEffect,
useState } from 'react';

import { 
connect } from 'react-redux';

import { 
Link } from '@reach/router';

import { 
addNewLesson, 
saveLesson,
setLessonPlanUrl,
setCurrentLesson } from 'Services/course/Actions/Lessons';

import { 
togglePreviewMode } from 'Services/course/Actions/App';

import { 
setMarkDown } from 'Services/course/helpers/EditorHelpers'; 
    
import {
role } from 'Services/course/helpers/PageHelpers';

import { 
emailInputOptions,    
emailMessageOptions } from  'Services/course/Pages/Courses/helpers';

import { 
deleteLessonFileByFileName } from 'Services/course/Api';

import {
LessonFileUpload } from 'Services/course/Pages/Courses/Components/LessonFileUpload';

import { 
navContent } from 'Services/course/Pages/Components/NavigationHelper';

import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector } from 'Services/course/Selectors';

import { 
toast } from 'react-toastify';

import { 
Markup } from 'interweave';

import { 
deleteQuestionIconStyle } from '../inlineStyles';

import EditIcon from '@material-ui/icons/Edit';
import MainMenu from 'Services/course/Pages/Components/MainMenu';
import NewLessonPage from 'Services/course/Pages/Lessons/NewLessonPage';
import LoginLogout from 'Services/course/Pages/LoginPage/Components/LoginLogout';
import Roles from 'Services/course/Pages/Components/Roles';
import LessonPlanIframeComponent from 'Services/course/Pages/Lessons/LessonPlan/Components/LessonPlanIframeComponent';
import MultiInputEmailComponent from 'Services/course/Pages/Email/MultiInputEmailComponent';
import ListItem from 'Services/course/Pages/Components/ListItem';
import Swal from 'sweetalert2';

const CourseDisplayViewComponent = ({
    previewMode,
    saveLesson,
    setMarkDown,
    addNewLesson,
    lessonId,
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

    useEffect(() => {
    });

function onMatchListItem( match, listItem ) {
    if( match ){
        setCurrentLesson( listItem );
        setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${course?._id}/${listItem._id}/${listItem.title}`);
        
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
    deleteLessonFileByFileName( fileToRemove?.split('/files/')[1]);       
}

let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;   
let lessonsByCourseId = lessons?.filter( lesson => lesson?.courseId === course?._id && lesson?.userId === selectedTutorId );

return (
    <div className="CourseDetail"> 
        <header>
          <div>
            <span className="multiColor"> {course?.name} </span>
            <MainMenu 
                navContent={navigationContent}
            /> 
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
                            courseId={course?._id}
                            onSubmit={(title) => saveLesson({lesson, title})}
                        >
                        { (edit, remove, questions, assignments, exams) => (
                        <div>      
                            <div>
                                <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} className="lessonMultiColor">{ lesson?.title } </span> </Link> 
                            <div> 
                            <Roles
                                role={ currentUser?.role === role.Tutor }
                            >
                                <button 
                                    className="edit-lesson-btn"
                                    onClick={() => { edit(lesson.title); } }                                          
                                > 
                                    Edit
                                </button>
                            </Roles>
                            <Roles
                                role={currentUser?.role === role.Tutor }
                            >
                                <button
                                    className="delete-lesson-btn"
                                    onClick={remove} 
                                >
                                    Delete
                                </button>
                            </Roles>
                            <Roles
                                role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                            >
                                <button
                                    className="delete-lesson-btn"
                                    onClick={() => { questions(lesson?._id); }} 
                                >
                                    Questions
                                </button>
                            </Roles>
                            </div>  
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
                        onSubmit={title => addNewLesson(title, course?._id, Date.now(), selectedTutorId)} 
                        lessons={lessonsByCourseId}
                        courseId={course?._id}
                    >
                        {(edit) =>  (
                            <button 
                                className="add-lesson-button"
                                onClick={edit}> 
                                Add New Lesson
                            </button>
                        )}
                    </NewLessonPage>
                </Roles>
                {/*SIDE BAR 1 */}
                </div>
                <div className="lesson-content"> 
                    < LessonPlanIframeComponent
                        name="embed_readwrite" 
                        source={selectedLessonPlanLesson?.videoUrl}
                        width="700px"
                        height="400px"
                        allow="camera;microphone"
                        scrolling="auto"
                        frameBorder="10" 
                        className={"iframe"}
                    />
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
                        < LessonFileUpload
                            previewMode={previewMode}
                            currentLesson={selectedLessonPlanLesson}
                            typeOfUpload={'userlessonfiles'}
                            fileUploadUrl={fileUploadUrl}
                            setFilesToRemove={setFileToRemove}
                            msg={"Please click on the lesson link before uploading files."}
                            saveAction={saveLesson}
                        /> 
                </div>           
                <Roles
                    role={currentUser?.role === role.Student }
                >
                    <div className="sidebar"> 
                        <MultiInputEmailComponent
                            setLesson={selectedLessonPlanLesson}
                            inputFieldOptions={emailInputOptions}
                            messageOptions={emailMessageOptions(currentUser,invitationUrl)} 
                        />
                    </div>
                </Roles>          
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

export default connect( mapState, mapDispatch )(CourseDisplayViewComponent);