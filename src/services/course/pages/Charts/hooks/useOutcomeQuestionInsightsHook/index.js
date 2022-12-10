
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLessonOutcome } from 'services/course/actions/outcomeInsights';
import { saveLessonInsightsTeachBotProps } from 'services/course/actions/teachbot';
import { getNumberOfStudentsInCoaching } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { deepOrange, deepPurple, green, orange, red } from '@mui/material/colors';
import { getInsightsData } from 'services/course/middleware/outcomeInsight/helpers';
import { role } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';

const useOutcomeQuestionInsightsHook = ( props ) => {
  let { courseOutcomes, outcomeInsights, currentUser, outcomes, lessonItem, onlineQuestions, form, lessonInsightsBotProps } = props;

  let lessonInsights; let lessonOutcomes; let questionsPerOutcome; let questionInsightsDetails; let missedQuestions;   

  if ( outcomeInsights?.length === 0 ) return {};

  if (isEmptyObject(outcomeInsights)) return {}; 

  const [ outcomeId, setOutcomeId ] = useState(null); 
  const [ componentProps, setComponentProps ] = useState(undefined);
  const [ mainHeaderOutcomeTitle, setMainHeaderOutcomeTitle ] = useState(null); 


  const dispatch = useDispatch();

  let copyOutcomeInsights;

  if (currentUser?.role === role.Tutor) {
    copyOutcomeInsights = [ ...outcomeInsights ];
  }

  if (currentUser?.role === role.Student) {
    copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.userId === currentUser?._id)];
  }

  if ( ( copyOutcomeInsights?.length === 0 )) return {};

  if ( lessonItem && ( copyOutcomeInsights?.length > 0 ) ) {
    lessonOutcomes = outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id);
    lessonInsights = copyOutcomeInsights?.filter(insights => lessonOutcomes?.map(outcome => outcome?._id)?.includes(insights?.outcomeId));
  }

  useEffect(() => {
    if ( componentProps ) {
      dispatch(saveLessonInsightsTeachBotProps( componentProps ));
      setComponentProps(undefined);
    }
  });


  // refactor refactor
  function getOutcomeIdFromChartCallBack(data){ 
    setMainHeaderOutcomeTitle( data );

    if ( data && data === 'Atoms as building blocks ') {
     setOutcomeId('62d96c2789c2a6149386e907');
    }

    if ( data && data === 'Atomic structure ') {
     setOutcomeId('62d971b689c2a6149386ec33');
    }

    if ( data &&  data === 'Atomic models ') {
     setOutcomeId('62d971ee89c2a6149386ec36');
    }  
 }

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
  }

  setComponentProps( { pieChartData: { pieChart: copyOutcomeInsights, lessonOutcomes, questionInsightsDetails, getOutcomeIdFromChartCallBack, mainHeaderOutcomeTitle, missedQuestions, outcomeId }, lessonOutcomes: lessonOutcomes, questionPropsData: form } );
}

  return {
    formQuestionData: { pieChart: copyOutcomeInsights, lessonOutcomes, questionInsightsDetails, getOutcomeIdFromChartCallBack, mainHeaderOutcomeTitle, missedQuestions, outcomeId }
  };
};

export default useOutcomeQuestionInsightsHook;