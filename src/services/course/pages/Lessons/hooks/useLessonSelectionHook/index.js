import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { role } from 'services/course/helpers/PageHelpers';

const useLessonSelectionHook = ( props ) => {
        let {
            currentUser, selectedCourseFromLessonPlanCourseDropDown, selectedLessonFromLessonPlanDropDown,courses, lessons, courseId, lessonId, lessonNotes, note
        } = props;

        let selectedCourse = (selectedCourseFromLessonPlanCourseDropDown?._id === undefined) 
                    ? getItemFromSessionStorage('selectedCourse') 
                    : selectedCourseFromLessonPlanCourseDropDown;

        let selectedLesson = (selectedLessonFromLessonPlanDropDown?._id === undefined) 
                    ? getItemFromSessionStorage('selectedLesson') 
                    : selectedLessonFromLessonPlanDropDown;

        selectedCourse = ( selectedCourse ?? courses?.find( crs => crs?._id === courseId));

        selectedLesson = ( ( lessonId ) ? lessons?.find( lssn => lssn?._id === lessonId ) : selectedLesson ?? lessons?.find( lssn => lssn?._id === lessonId ));

    return {
        selectedCourse,
        selectedLesson,
        selectedNote: currentUser.role === role.Tutor ? lessonNotes : note
    };
};

export default useLessonSelectionHook;