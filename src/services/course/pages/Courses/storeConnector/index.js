import { getLessonVideoUrl, setLessonCourse, 
    loadLessons, addNewLesson,  saveLesson, setLessonPlanUrl, setCurrentLesson, selectLessonFromLessonPlanDropDown, startLesson } from 'services/course/actions/lessons';
import { loadSessions } from 'services/course/actions/sessions';
import { getLessonsByCourseIdSelector, getCoursesByCourseIdSelector,
 getOperatorFromOperatorBusinessName,getUsersByOperatorId, getCoursesByCreatedByIdSelector, getCalendarByCalendarEventType, 
 getCalendarsByOperatorId,getEventByCourseIdLessonIdUserId, getTutorsLessonUserNotesByLessonId, getStudentsLessonUserNotesByLessonId } from 'services/course/selectors';
import { selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
import { togglePreviewMode } from 'services/course/actions/app';
import { addCalendar } from 'services/course/actions/calendar';
import { addNotes, loadAllNotes } from 'services/course/actions/notes';
import { setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import { role } from 'services/course/helpers/PageHelpers';

export const mapDispatch = {
    setLessonPlanUrl, selectLessonFromLessonPlanDropDown, toggleConcepts, saveFormBuilder,
    togglePreviewMode, addCalendar, startLesson, addNotes, loadAllNotes, setSelectedOutcome, selectCourseFromLessonPlanCourseDropDown,
    setCurrentLesson, loadSessions, loadLessons, addNewLesson, saveLesson, getLessonVideoUrl, setLessonCourse
};

export const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        previewMode: state.app.previewMode,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        isLessonsLoading:state.lessons.lessonsLoading,
        onLessonError: state.lessons.onSaveLessonError,
        saveLessonInProgress: state.lessons.saveLessonInProgress,
        lessons: getLessonsByCourseIdSelector( state, ownProps ),
        // lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        currentVideoUrl: state.lessons.currentVideoUrl,
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === role.Student && user?.courses?.includes(ownProps?.courseId)),
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        user: state.users.user,
        toggleQuestionModal: state.app.toggleModal,
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        course: getCoursesByCourseIdSelector(state, ownProps),
        courses: Object.values( state.courses.courses ),
        lessonStarted: state.lessons.lessonStarted,
        event: getEventByCourseIdLessonIdUserId(state, ownProps),
        allEvents: Object.values( state.events.events),
        allNotes: Object.values( state.notes.notes )?.filter(note => note?.userId === state?.users?.user?._id && note?.courseId === ownProps?.courseId),
        studentsNote: getStudentsLessonUserNotesByLessonId( state, ownProps ),
        tutorsNote: getTutorsLessonUserNotesByLessonId( state, ownProps ),
        outcomes: Object.values( state.outcomes.outcomes ),
        searchItem: state?.fullTextSearches?.searchItem,
        concepts: state.outcomes.concepts,
        selectedOutcome: state.outcomes.selectedOutcome,
        toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal,
        currentOutcome: state?.outcomes?.currentOutcome,
        outcomeInsights: Object?.values(state?.outcomeInsights?.outcomeInsights)
    };
}; 