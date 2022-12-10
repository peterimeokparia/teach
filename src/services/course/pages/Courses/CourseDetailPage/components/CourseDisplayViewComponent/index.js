import { connect } from 'react-redux';
import { role } from 'services/course/helpers/PageHelpers';
import { deleteFileByFileName } from 'services/course/api';
import { setItemInSessionStorage } from 'services/course/helpers/ServerHelper';
import { lessonHeaderEditIconStyle } from '../inlineStyles';
import { mapState, mapDispatch } from './connector';
import { setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import useCourseDisplayHook from 'services/course/pages/Courses/hooks/useCourseDisplayHook';
import EditIcon from '@material-ui/icons/Edit';
import MainMenu from 'services/course/pages/components/MainMenu';
import LoginLogout from 'services/course/pages/LoginPage/components/LoginLogout';
import Roles from 'services/course/pages/components/Roles';
import CourseDisplayViewLeftSideBarComponent from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/components/CourseDisplayViewLeftSideBarComponent';
import CourseDisplayViewToggleDisplayComponent from './components/CourseDisplayViewToggleDisplayedItemsComponent';
import CourseDisplayViewOutcomeComponent from './components/CourseDisplayViewOutcomeComponent';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewComponent = ({
    previewMode,
    saveLesson,
    outcomes,
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
    allNotes,
    users,
    courses,
    selectedTutorId,
    setLessonPlanUrl,
    setCurrentLesson,
    selectLessonFromLessonPlanDropDown,
    selectCourseFromLessonPlanCourseDropDown,
    sessions,
    course,
    lessons,
    togglePreviewMode,
    toggleQuestionModal,
    searchItem,
    operatorBusinessName,
    currentOutcome,
    operator,
    courseDetailChildren,
    currentUser, 
    selectedLessonPlanLesson,
    event,
    concepts,
    selectedOutcome,
    outcomeInsights,
    toggleConcepts,
    setSelectedOutcome,
    allEvents,
    studentsNote,
    tutorsNote, 
    toggleLessonOutcomeInsightModal }) => {
    let courseDisplayProps = {
        currentUser, course, courses, lessons, selectedTutorId, setCurrentLesson, searchItem, sessions,
        setLessonPlanUrl, previewMode, selectedLessonPlanLesson, togglePreviewMode, saveLesson, setItemInSessionStorage,
        deleteFileByFileName, startLesson, users, calendars, calendar, addCalendar, operatorBusinessName, concepts,
        operator, courseId, lessonId, event, allEvents, addNotes, loadAllNotes, allNotes, studentsNote, tutorsNote,
        toggleLessonOutcomeInsightModal, selectLessonFromLessonPlanDropDown, selectCourseFromLessonPlanCourseDropDown,
        setSelectedOutcome, onLessonError, addNewLesson, outcomes, outcomeInsights, toggleConcepts, currentOutcome
    };

    let { 
        displayProps, 
        onMatchListItem 
    } = useCourseDisplayHook( courseDisplayProps );

    let { 
        setPreviewEditMode, navigationContent, selectedCourse
    } = displayProps;

return (
    <div className="CourseDetail"> 
        <header>
            <div>
            <MainMenu navContent={navigationContent} />
             <div className="multiColor"> { ( courseId ) ? selectedCourse?.name : course?.name} </div>
            </div>
            <>
            { courseDetailChildren }
            </>
            <Roles role={ currentUser?.role === role.Tutor }>
                <EditIcon 
                    onClick={setPreviewEditMode}
                    color="action"
                    className="comment-round-button-1"
                    style={ lessonHeaderEditIconStyle() }
                />
            </Roles>
            <LoginLogout
                operatorBusinessName={operatorBusinessName}
                user={currentUser} 
                operator={operator}
            />
        </header>
        <div className={'content'}> 
            <CourseDisplayViewLeftSideBarComponent 
                onMatchListItem={onMatchListItem} 
                courseDisplayProps={courseDisplayProps} 
                displayProps={displayProps}
            />
            <CourseDisplayViewToggleDisplayComponent
                courseDisplayProps={courseDisplayProps} 
                displayProps={displayProps}
            />
            <CourseDisplayViewOutcomeComponent 
                onMatchListItem={onMatchListItem} 
                courseDisplayProps={courseDisplayProps} 
                displayProps={displayProps}
            />
        </div>
    </div>
    );
};

export default connect( mapState, mapDispatch )(CourseDisplayViewComponent); 