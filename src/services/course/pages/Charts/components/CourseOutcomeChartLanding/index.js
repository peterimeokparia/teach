import { connect } from 'react-redux';
import { buildCourseLessonOutcomeData } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customLineChartHelper/dataHelper';
import { isEmptyObject } from 'services/course/helpers/Validations';
import useFormTypeSelectorHook from 'services/course/pages/Charts/hooks/useFormTypeSelectorHook';
import CourseOutcomeMainLineChartComponent from 'services/course/pages/Charts/components/CourseOutcomeChartLanding/components/CourseOutcomeMainLineChartComponent';
import CourseOutcomeQuestionTypeLineChartComponent from 'services/course/pages/Charts/components/CourseOutcomeChartLanding/components/CourseOutcomeQuestionTypeLineChartComponent';
import CourseOutcomeLessonOutcomesBarChartComponent from 'services/course/pages/Charts/components/CourseOutcomeChartLanding/components/CourseOutcomeLessonOutcomesBarChartComponent';
import './style.css';

const CourseOutcomeChartLanding = ({ 
  pieChartData, 
  lessons, 
  outcomeInsights, 
  currentUser, 
  toggleCourseOutcomesSidePanelDisplay,  
  toggleCourseOutcomesFormOptionsDisplay }) => {

  if ( isEmptyObject( pieChartData ) ) return;

  let { courseOutcomes, handleToggleButton, courseId, setOutcomeIdFromChartCallBack, getChartPropsCallBack, 
    handleSettingSelectedOutcome, setLabelTitle, setToggleItem, setMainChartToggleItem, toggleItem, mainChartToggleItem
  } = pieChartData;

  let currentLessons = lessons?.filter( lesson => lesson?.courseId === courseId );

  let { formTypeSelectorProp } = useFormTypeSelectorHook( outcomeInsights, currentUser ) || {};

  let { selectedMultiSelectFormTypeOptions } = formTypeSelectorProp;

  let groupedChartProps = { lessons: currentLessons, handleToggleButton, courseOutcomes, outcomeInsights, 
    setOutcomeIdFromChartCallBack, getChartPropsCallBack, setLabelTitle, setToggleItem, toggleItem, handleSettingSelectedOutcome,
    scoreProp:'percentageNumberOfQuestionsPassedOutcome', selectedMultiSelectFormTypeOptions }; 

  let mainChartProps = { lessons: currentLessons, handleToggleButton, courseOutcomes, outcomeInsights,
    setOutcomeIdFromChartCallBack, getChartPropsCallBack, setLabelTitle, setToggleItem: setMainChartToggleItem, handleSettingSelectedOutcome,
    toggleItem: mainChartToggleItem, scoreProp:'percentageNumberOfQuestionsPassedOutcome', selectedMultiSelectFormTypeOptions };

  let { labels, mainChartDatasets, datasets } = buildCourseLessonOutcomeData(groupedChartProps);

return <div className='course-main-bar-visible'>
  <div className={'row'}>
     <button className='toggleButton2' onClick={() => handleToggleButton()}>{''}</button> 
      <div className='col'>  
      <>
      { (!toggleCourseOutcomesFormOptionsDisplay ) && 
          <CourseOutcomeMainLineChartComponent
            pieChartData={ pieChartData } 
            mainChartProps={ mainChartProps } 
            labels={ labels } 
            mainChartDatasets={ mainChartDatasets } 
          />
      }
      </>
      <>
      { toggleCourseOutcomesFormOptionsDisplay &&
        <CourseOutcomeQuestionTypeLineChartComponent 
          groupedChartProps={ groupedChartProps }
          pieChartData={ pieChartData } 
          labels={ labels } 
          datasets={ datasets }
          formTypeSelectorProp={ formTypeSelectorProp }
        />
      }
      </>
     </div>
      { toggleCourseOutcomesSidePanelDisplay && 
        <CourseOutcomeLessonOutcomesBarChartComponent 
          groupedChartProps={ groupedChartProps }
          pieChartData={ pieChartData } 
          lessons={ lessons } 
          datasets={ datasets }
          formTypeSelectorProp={ formTypeSelectorProp }
        />
      }
   </div> 
  </div>
};
const mapState = ( state ) => ({
  currentUser: state?.users?.user,
  lessons: Object?.values(state?.lessons?.lessons),
  outcomes: Object?.values(state?.outcomes?.outcomes),
  outcomeInsights: Object?.values(state?.outcomeInsights?.outcomeInsights),
  toggleCourseOutcomesSidePanelDisplay: state?.outcomeInsights?.courseOutcomesSidePanelDisplay,
  toggleCourseOutcomesFormOptionsDisplay: state?.outcomeInsights?.courseOutcomesFormOptionsDisplay
});

export default connect(mapState,null)(CourseOutcomeChartLanding);