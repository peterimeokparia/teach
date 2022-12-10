import { deepOrange, green, orange, red } from '@mui/material/colors';
import { getInsightsData } from 'services/course/middleware/outcomeInsight/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { dataPieChart1, dataPieChart2, dataPieChart3, getTertiarySectionData  } from 'services/course/pages/Charts/components/OutcomeChartLessonInsightsFormQuestions/helpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { saveFormBuilder } from 'services/course/actions/formbuilders';
import { setSelectedOutcome } from 'services/course/actions/outcomes';
import CustomPieChart from 'services/course/pages/Charts/components/CustomPieChart';
import MissedQuestionComponent from 'services/course/pages/FormBuilder/FormQuestions/components/MissedQuestionsComponent';
import OutComesRecommenderForm from 'services/course/pages/Courses/CourseDetailPage/components/CourseDisplayViewComponent/OutComesRecommenderForm';
import './style.css';

const OutcomeChartLessonInsightsFormQuestions = ({ lessonInsightsBotProps  }) => {
 
  {/* {( formBuilderStatus === elementMeta.status.Reviewed || formBuilderStatus === elementMeta.status.Review) && 
    <MissedQuestionComponent display={ true } questionProps={ questionProps() } setMissedQuestions={ handleMissedQuestions } />
  } */}

  let { outcomeInsights, currentUser, outcomes, lessonItem, onlineQuestions, form } = lessonInsightsBotProps;

  let lessonInsights; let lessonOutcomes; let questionsPerOutcome; let questionInsightsDetails; let missedQuestions;   

  if ( outcomeInsights?.length === 0 ) return {};

  if ( isEmptyObject(outcomeInsights) ) return {}; 

  const [ outcomeId, setOutcomeId ] = useState( null ); 
  const [ mainHeaderOutcomeTitle, setMainHeaderOutcomeTitle ] = useState( null ); 
  const [ questionInsightsDetailsData, setQuestionInsightsDetailsData ] = useState( null ); 
  const [ missedQuestionsData, setMissedQuestions] = useState( null );

  let copyOutcomeInsights;

  if ( currentUser?.role === role.Tutor ) {
    copyOutcomeInsights = [ ...outcomeInsights ];
  }

  if ( currentUser?.role === role.Student ) {
    copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.userId === currentUser?._id)];
  }

  if ( ( copyOutcomeInsights?.length === 0 )) return {};

  if ( lessonItem && ( copyOutcomeInsights?.length > 0 ) ) {
    lessonOutcomes = outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id);
    lessonInsights = copyOutcomeInsights?.filter(insights => lessonOutcomes?.map(outcome => outcome?._id)?.includes(insights?.outcomeId));
  }

  useEffect(() => {

    if ( outcomeId ) {
      questionsPerOutcome = copyOutcomeInsights?.filter( item => item.outcomeId === outcomeId && item?.userId === currentUser?._id );
  
      let {
          numberOfQuestionsInOutcome,
          numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome,
          numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome,
          numberOfUnAttemptedQuestionsInOutcome, totalNumberOfAttemptedFailedQuestions, 
          percentageNumberOfUnAttemptedQuestionsInFailureRate,
          listOfStudentsFailedQuestionsInOutcome, listOfQuestionsFailed,
          listOfStudentsPassedQuestionsInOutcome, listOfQuestionsPassed
      } = getInsightsData( questionsPerOutcome ); 
    
       questionInsightsDetails = [
        {header:'#Questions Passed',rate: numberOfQuestionsPassedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor: green[500], avatarText: '#'},
        {header:'#Questions Missed',rate: numberOfQuestionsFailedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor:deepOrange[500], avatarText: '#'},
        {header:'%Pass',rate:Math.round((numberOfQuestionsPassedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: green[500], avatarText:'%'},
        // {header:'%Fail',rate:Math.round((numberOfQuestionsFailedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: deepOrange[500], avatarText:'%'},
        {header:'#Attempted Fail', rate:totalNumberOfAttemptedFailedQuestions, passFailRate:'', title:'', width:90, minWidth:200, iconColor:orange[500], avatarText:'AF'},
        {header:'#Unattempted Fail', rate:numberOfUnAttemptedQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth:200, iconColor:red[500], avatarText:'UF'},
        {header:'Total # Questions', rate:numberOfQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth: 200},
        // {header:'Coaching', rate:numberOfStudentsInCoaching, passFailRate:'', title:'', width:90, minWidth:200, iconColor:green[900], avatarText:'C'}
      ];
    
      if ( copyOutcomeInsights?.length > 0 ) {
        let missedQuestionId = copyOutcomeInsights?.filter(insight => insight?.passed === false && insight?.outcomeId === outcomeId )?.map(insight => insight?.questionId );
    
        missedQuestions = onlineQuestions?.filter(question => missedQuestionId.includes( question?._id ));

        if ( missedQuestions?.length > 0  ) {
          setMissedQuestions( missedQuestions );
        }
      }
  
      if ( questionInsightsDetails?.length > 0 ) {
        setQuestionInsightsDetailsData( questionInsightsDetails );
      }
    }
  }, [ outcomeId ]);

  // move
  function getOutcomeIdFromChartCallBack( data ){
    let outcome = outcomes?.find(outcome => data?.includes( outcome?.title ));

    if ( outcome ) {
      setMainHeaderOutcomeTitle( outcome?.title );
      setOutcomeId( outcome?._id );
    }
 }

return <div className='row main-visible'>
    <div className='col primary'>
      <div className='row primary-row'>
        <div className='col'> 
        <CustomPieChart data={dataPieChart3( copyOutcomeInsights, lessonOutcomes )} getOutcomeIdFromChartCallBack={ getOutcomeIdFromChartCallBack }/> 
        </div>
        <div className='col missed-questions'> 
            { outcomeId && missedQuestionsData?.length > 0 && <MissedQuestionComponent display={ true } missedQuestions={missedQuestionsData} mainHeaderOutcomeTitle={mainHeaderOutcomeTitle}/> }
        </div>
      </div>
    </div>
    <div className={`row tertiary-sidepanel`}>  
      <p className={'insights-data'}>
        {
            `${mainHeaderOutcomeTitle}` 
        }
        <div className='row justify-content-center'>
          {/* {
            <OutComesRecommenderForm outCome={ selectedOutcome } cardItemProps={{}} currentUser={currentUser} openRecommenderModal={true}/> 
          } */}
          
          { outcomeId && questionInsightsDetailsData?.length > 0 && questionInsightsDetailsData?.map(( data ) =>  getTertiarySectionData( data ) ) }
        </div>
      </p>
    </div>
  </div>
};
const mapState = (state, ownProps) => ({
  currentUser: state?.users?.user,
  outcomes: Object?.values(state?.outcomes?.outcomes),
  toggleLessonOutcomeInsightModal: state?.outcomeInsights?.lessonOutcomeInsightModal,
  lessonInsightsBotProps: state?.teachBotProps?.lessonInsightsBotProps
});

export default connect( mapState, null )( OutcomeChartLessonInsightsFormQuestions );
