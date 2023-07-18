import { toggleDisplayedItems } from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import useCourseOutcomeChartLandingHook from 'services/course/pages/Charts/hooks/useCourseOutcomeChartLandingHook';
import useLessonOutcomeChartLandingHook from 'services/course/pages/Charts/hooks/useLessonOutcomeChartLandingHook';
import CourseOutcomeChartLanding from 'services/course/pages/Charts/components/CourseOutcomeChartLanding';
import  'services/course/pages/components/styles/course_detail_styles/style.css';
import  'services/course/pages/components/styles/course_detail_outcome_styles/style.css';
import  'services/course/pages/components/styles/sidebar_styles/style.css';

const CourseDisplayViewToggleDisplayComponent = ({ displayProps, courseDisplayProps }) => {
    let{
        currentUser, selectedLessonPlanLesson, courseId, toggleLessonOutcomeInsightModal, outcomes, outcomeInsights, lessons
    } = courseDisplayProps;

    let { lessonItem, toggleLessonItemDisplayCount } = displayProps;

    let courseOutcomes = outcomes.filter(courseOutcome => courseOutcome?.courseId === courseId);

    let { coursePieChartData } = useCourseOutcomeChartLandingHook( { courseOutcomes, outcomeInsights, currentUser, courseId, lessons } ) || {};

    let { lessonPieChartData }  = useLessonOutcomeChartLandingHook( { courseOutcomes, outcomeInsights, currentUser, outcomes, lessonItem } ) || {};
    
    let toggleDisplayItemProps =  { 
        key: toggleLessonItemDisplayCount, 
        selectedlesson: selectedLessonPlanLesson ?? lessonItem, 
        courseDisplayProps, 
        lessonOutcomes: outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id),
        courseOutcomes,
        lessonPieChartData
    };

    return <div className="lesson-content"> 
            <div className="lesson2"/>   
                <div className="toggleItems"> 
                {/* { !isEmptyObject( coursePieChartData ) && <CourseOutcomeChartLanding pieChartData={coursePieChartData}/> } */}
                {/* { (!lessonItem && !toggleLessonOutcomeInsightModal ) && 
                    <div>
                    { 
                        !isEmptyObject( coursePieChartData ) && <CourseOutcomeChartLanding pieChartData={coursePieChartData}/> 
                    }
                    </div>
                } */}
                {
                    lessonItem && toggleDisplayedItems( toggleDisplayItemProps )  
                }
            </div> 
            </div>

}

export default CourseDisplayViewToggleDisplayComponent;
