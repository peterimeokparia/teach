    import { 
    useState } from 'react';
    
    import { 
    connect } from 'react-redux';
    
    import { 
    Link } from '@reach/router';
    
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
    deleteLessonFileByFileName } from 'services/course/api';
    
    import {
    LessonFileUpload } from 'services/course/pages/Courses/components/LessonFileUpload';
    
    import { 
    navContent } from 'services/course/pages/components/NavigationHelper';
    
    import { 
    getUsersByOperatorId,    
    getCoursesByCreatedByIdSelector } from 'services/course/selectors';

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
    swapHorizIconStyle } from '../inlineStyles';
    
    import BoardEditorComponent from 'services/course/pages/Lessons/LessonPlan/components/BoardEditorComponent';
    import EditIcon from '@material-ui/icons/Edit';
    import DeleteIcon from '@material-ui/icons/Delete';
    import HelpIcon from '@material-ui/icons/Help';
    import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
    import MainMenu from 'services/course/pages/components/MainMenu';
    import NewLessonPage from 'services/course/pages/Lessons/NewLessonPage';
    import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
    import Roles from 'services/course/pages/components/Roles';
    import LessonPlanIframeComponent from 'services/course/pages/Lessons/LessonPlan/components/LessonPlanIframeComponent';
    import MultiInputEmailComponent from 'services/course/pages/Email/MultiInputEmailComponent';
    import ListItem from 'services/course/pages/components/ListItem';
    import Swal from 'sweetalert2';
    
    const CourseDisplayViewComponent = ({
        previewMode,
        saveLesson,
        setMarkDown,
        addNewLesson,
        onLessonError,
        courseId,
        lessonId,
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
    
    function onMatchListItem( match, listItem ) {
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
        deleteLessonFileByFileName( fileToRemove?.split('/files/')[1]);       
    }
    
    let navigationContent = navContent( currentUser, operatorBusinessName, currentUser?.role,  "Student" ).users;  
    let selectedCourse =  courses?.find(course => course?._id === courseId );
    let lessonsByCourseId = lessons?.filter( lesson => lesson?.courseId === courseId && lesson?.userId === selectedTutorId );
    
    const incrementDisplayedItemCount = () => {
        if ( lessonItem === 2 ) {
            setLessonItem( 0 );
            return;
        }
        setLessonItem( lessonItem + 1 )
    };

    function toggleDisplayedItems( key, selectedlesson ){
        switch (key) {
            case 1:
            return <div className="boardEditorDisplay"><BoardEditorComponent 
                        courseId={courseId}
                        lessonId={selectedlesson?._id}
                        classRoomId={selectedTutorId}
                        operatorBusinessName={operatorBusinessName}
                    /></div>
            case 2:
            return < LessonFileUpload
                        previewMode={previewMode}
                        currentLesson={selectedlesson}
                        typeOfUpload={'userlessonfiles'}
                        fileUploadUrl={fileUploadUrl}
                        setFilesToRemove={setFileToRemove}
                        msg={"Please click on the lesson link before uploading files."}
                        saveAction={saveLesson}
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
    }
    return (
        <div className="CourseDetail"> 
            <header>
              <div>
                <span className="multiColor"> { ( courseId ) ? selectedCourse?.name : course?.name} </span>
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
                                onSubmit={(title) => saveLesson({...lesson, title})}
                            >
                            { (edit, remove, questions, assignments, exams) => (
                            <div>      
                                <div>
                                    <Link to={`lessons/${lesson._id}`}> <span title={lesson?._id} className="lessonMultiColor">{ lesson?.title } </span> </Link> 
                                <div> 
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
                                <Roles
                                    role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                                >
                                    <HelpIcon 
                                        onClick={() => { questions(lesson?._id); } }
                                        color="action"
                                        className="comment-round-button-2"
                                        style={ sideBarDeleteIconStyle() }
                                    />
                                </Roles>
                                <Roles
                                    role={currentUser?.role === role.Tutor  ||  currentUser?.role === role.Student}
                                > 
                                    <SwapHorizIcon 
                                        onClick={incrementDisplayedItemCount }
                                        color="action"
                                        className="comment-round-button-6"
                                        style={ swapHorizIconStyle() }
                                    />
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