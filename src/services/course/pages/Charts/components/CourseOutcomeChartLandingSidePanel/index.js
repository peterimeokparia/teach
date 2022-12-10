import { connect } from 'react-redux';
import { buildCourseLessonOutcomeData } from 'services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/courseOutcomeBarChartDataHelper';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { optionsData } from 'services/course/pages/Charts/components/CustomChart/helpers/customBarChart/dataHelper';
import chartOptions from 'services/course/pages/Charts/components/helpers/customChartHelpers/customBarChartHelper/chartHelper';
import CustomChart from 'services/course/pages/Charts/components/CustomChart';
import './style.css';

//https://github.com/reactchartjs/react-chartjs-2/issues/648
const CourseOutcomeChartLandingSidePanel = ({ pieChartData, lessons, outcomeInsights, selectedMultiSelectFormTypeOptions, lessonTitle, outcome, classNameMain, classNameSub }) => {

  if ( isEmptyObject(pieChartData) ) return;

  let { courseOutcomes, courseId, mainHeaderOutcomeTitle, lessonLabelTitle, getChartPropsCallBack, setOutcomeIdFromChartCallBack, setLabelTitle, setSelectedTooltipItemLesson, selectedOutcome, handleSettingSelectedOutcome } = pieChartData;

  let currentLessons = lessons?.filter( lesson => lesson?.courseId === courseId );

  let groupedChartProps = { lessons: currentLessons, courseOutcomes, outcomeInsights, getChartPropsCallBack, setOutcomeIdFromChartCallBack, setLabelTitle, scoreProp:'percentageNumberOfQuestionsPassedOutcome', selectedMultiSelectFormTypeOptions, 
    setSelectedTooltipItemLesson, lessonLabelTitle, mainHeaderOutcomeTitle, selectedOutcome, handleSettingSelectedOutcome }; 

  let { labels, datasets } = buildCourseLessonOutcomeData( {...groupedChartProps, lessonTitle, outcomeId: outcome?._id } ); 

return <div className={'course-side-main-bar-visible'}>
   <div>
    <CustomChart 
      groupedBarChartProps={{ ...groupedChartProps, outcome }} 
      labels={labels} 
      datasets={datasets} 
      type={'bar'} 
      optionsData={optionsData(outcome)} 
      chartOptions={chartOptions}
      classNameMain={classNameMain}
      classNameSub={classNameSub}
    />
  </div>
  </div>
};
const mapState = ( state ) => ({
  currentUser: state?.users?.user,
  lessons: Object?.values(state?.lessons?.lessons),
  outcomes: Object?.values(state?.outcomes?.outcomes),
  outcomeInsights: Object?.values(state?.outcomeInsights?.outcomeInsights),
  toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal
});

export default connect(mapState,null)(CourseOutcomeChartLandingSidePanel);
