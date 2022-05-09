import { 
useState, 
useEffect } from 'react';

import { 
connect } from 'react-redux';

import { 
Link, navigate } from '@reach/router';

import { 
addNewOutcome, 
saveOutcome } from 'services/course/actions/outcomes';

import { 
togglePreviewMode } from 'services/course/actions/app';

import { 
setMarkDown } from 'services/course/helpers/EditorHelpers'; 
    
import {
role } from 'services/course/helpers/PageHelpers';

import { 
getUsersByOperatorId,    
getCoursesByCreatedByIdSelector,
getOperatorFromOperatorBusinessName, 
getCalendarByCalendarEventType, 
getCalendarsByOperatorId} from 'services/course/selectors';

import { 
addCalendar } from 'services/course/actions/calendar';

import { 
deleteQuestionIconStyle,
sideBarEditIconStyle,
sideBarDeleteIconStyle,
sideBarHomeWorkIconStyle,
sideBarHelpIconStyle,
swapHorizIconStyle,
calendarStyle } from '../../inlineStyles';

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
import ListItemDetailComponent from 'services/course/pages/components/ListItem/components/ListItemDetailComponent';
import Swal from 'sweetalert2';

const LessonOutComesComponent = ({
    props,
    buttonText,
    previewMode,
    saveOutcome,
    setMarkDown,
    addNewOutcome,
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
    course,
    lessons,
    togglePreviewMode,
    operatorBusinessName,
    operator,
    courseDetailChildren,
    currentUser, 
    outcomes,
    selectedLessonPlanLesson }) => {

    const onMatchListItem = ( match, listItem ) => {
        if( match ){
            // setCurrentLesson( listItem );
            // setLessonPlanUrl(`/${operatorBusinessName}/LessonPlan/${course?._id}/${listItem._id}/${listItem.title}`);
            // setItemInSessionStorage('currentLesson', listItem);

            // if ( previewMode && (currentUser?.role === role.Tutor) && (!listItem?.introduction || listItem?.introduction === "") ) {
            //     const msg = "Please enter a lesson introduction.";
                
            //     Swal.fire(msg);
            //     return false;
            // }
        }
    }; 

    const setPreviewEditMode = () => {
        // if ( ! selectedLessonPlanLesson ) {
        //     toast.error("Please click on the lesson link.");
        //     return;  
        // }
        // togglePreviewMode();
    };

    let outcomeProps = {
        courseId,
        lessonId, 
        userId: currentUser?._id,
        parentId: lessonId,
        outcomeType: 'lesson'
    }

    function testFunc( editTestFunc ){
        editTestFunc();
    }

return (
    <div className=""> 
        <div className=""> 
                <div className=""> 
                <ListItem
                    collection={outcomes}
                    onMatchListItem={onMatchListItem}
                    path={"lessons"}
                >
                    {( lesson ) => (
                        < ListItemDetailComponent
                            something={lesson.title}
                            className="lesson-item"
                            lessons={outcomes}
                            // lesson={lesson}
                            courseId={courseId}
                            onSubmit={(title) => saveOutcome({...lesson, title})}
                            operatorBusinessName={ operatorBusinessName }
                        >
                        { (edit, remove ) => (
                           <div>
                              
                            <div className="row justify-content-center">
                                <span>
                                { lesson.title }
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
                            </span>     
                                </div>
                           </div>
                         
                        )}
                        </ListItemDetailComponent> 
                    )}
                </ListItem>    
                <Roles
                    role={currentUser?.role === role.Tutor }
                >
                    < ListItemDetailComponent 
                        className="add-lesson-button"
                        onSubmit={title => addNewOutcome({ title, ...outcomeProps })} 
                        lessons={outcomes}
                        courseId={courseId}
                    >
                        {(edit) =>  (
                            <div>
                            <button 
                                className="add-lesson-button"
                                // onClick={edit}> 
                                onClick={() => testFunc(edit)}
                            > 
                               { buttonText }
                               {/* add new outcome */}
                            </button>
                            { onLessonError && onLessonError?.message  }
                            </div>
                        )}
                    </ListItemDetailComponent>
                </Roles>
                </div>        
        </div>
    </div>
    );
};

const mapDispatch = {
    addNewOutcome, 
    saveOutcome, 
    setMarkDown,
    togglePreviewMode,
    addCalendar
};

const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        isLessonsLoading:state.lessons.lessonsLoading,
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: state.courses.selectedCourseFromLessonPlanCourseDropDown,
        onLessonError: state.lessons.onsaveOutcomeError,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess, 
        outcomes: Object.values(state.outcomes.outcomes)
    };
};

export default connect( mapState, mapDispatch )(LessonOutComesComponent);