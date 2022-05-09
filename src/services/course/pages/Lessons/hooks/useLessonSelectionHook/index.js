import { 
useEffect, 
useState } from 'react';

import {
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

const useLessonSelectionHook = ( props ) => {

    let {
        selectedCourseFromLessonPlanCourseDropDown,
        selectedLessonFromLessonPlanDropDown,
        courses,
        lessons,
        courseId,
        lessonId
    } = props;

        // const [ selectedCourse, setSelectedCourse ] = useState( undefined );
        // const [ selectedLesson, setSelectedLesson ] = useState( undefined );

        // useEffect(() => {

         
            
        // }, []);

        let selectedCourse = (selectedCourseFromLessonPlanCourseDropDown?._id === undefined) 
                    ? getItemFromSessionStorage('selectedCourse') 
                    : selectedCourseFromLessonPlanCourseDropDown;

        let selectedLesson = (selectedLessonFromLessonPlanDropDown?._id === undefined) 
                    ? getItemFromSessionStorage('selectedLesson') 
                    : selectedLessonFromLessonPlanDropDown;

        selectedCourse = ( selectedCourse ?? courses?.find( crs => crs?._id === courseId));

        selectedLesson = ( selectedLesson ?? lessons?.find( lssn => lssn?._id === lessonId ));

    return {
        selectedCourse,
        selectedLesson
    }
}

export default useLessonSelectionHook;