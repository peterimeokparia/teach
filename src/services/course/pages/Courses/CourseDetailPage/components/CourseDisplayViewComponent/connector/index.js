import { getUsersByOperatorId, getCoursesByCreatedByIdSelector, getOperatorFromOperatorBusinessName, getCalendarByCalendarEventType, 
    getCalendarsByOperatorId,getEventByCourseIdLessonIdUserId, getTutorsLessonUserNotesByLessonId, getStudentsLessonUserNotesByLessonId, getCoursesByCourseIdSelector } from 'services/course/selectors';
import { addNewLesson, saveLesson, setLessonPlanUrl, setCurrentLesson, selectLessonFromLessonPlanDropDown, startLesson } from 'services/course/actions/lessons';
import { selectCourseFromLessonPlanCourseDropDown } from 'services/course/actions/courses';
import { togglePreviewMode } from 'services/course/actions/app';
import { addCalendar } from 'services/course/actions/calendar';
import { addNotes, loadAllNotes } from 'services/course/actions/notes';
import { setSelectedOutcome, toggleConcepts } from 'services/course/actions/outcomes';
import { saveFormBuilder } from 'services/course/actions/formbuilders';

export const mapDispatch = {
    addNewLesson, saveLesson, setLessonPlanUrl, setCurrentLesson, selectLessonFromLessonPlanDropDown, toggleConcepts, saveFormBuilder,
    togglePreviewMode, addCalendar, startLesson, addNotes, loadAllNotes, setSelectedOutcome, selectCourseFromLessonPlanCourseDropDown
};

export const mapState = (state, ownProps) => {
    return {
        operator: getOperatorFromOperatorBusinessName(state, ownProps),
        users: getUsersByOperatorId(state, ownProps),
        calendar: getCalendarByCalendarEventType(state, ownProps),
        calendars: getCalendarsByOperatorId(state, ownProps),
        courseTutor: state.courses.courseTutor,
        currentUser: state.users.user,
        user: state.users.user,
        previewMode: state.app.previewMode,
        toggleQuestionModal: state.app.toggleModal,
        isLessonsLoading:state.lessons.lessonsLoading,
        videoUrl: state.lessons.videoUrl,
        lessonPlanUrl: state.lessons.lessonPlanUrl,
        selectedLessonPlanLesson: state.lessons.selectedLessonPlanLesson,
        course: getCoursesByCourseIdSelector(state, ownProps),
        onLessonError: state.lessons.onSaveLessonError,
        courses: Object.values( state.courses.courses ),
        lessons: Object.values(state.lessons.lessons),
        coursesByTutor: getCoursesByCreatedByIdSelector( state, ownProps ),
        studentsSubscribedToThisCourse : getUsersByOperatorId(state, ownProps)?.filter(user => user?.role === "Student" && user?.courses?.includes(ownProps?.courseId)),
        lessonStarted: state.lessons.lessonStarted,
        sessions: Object.values(state?.sessions?.sessions)?.filter(session => session?.courseId === ownProps?.courseId),
        onSessionRenewal: state.sessions.autoRenewedPackageSuccess,
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