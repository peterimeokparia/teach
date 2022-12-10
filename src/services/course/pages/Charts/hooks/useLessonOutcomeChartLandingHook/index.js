
import { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { toggleLessonOutcome } from 'services/course/actions/outcomeInsights';
import { getNumberOfStudentsInCoaching } from 'services/course/pages/Charts/components/OutcomeChartLanding/helpers';
import { deepOrange, deepPurple, green, orange, red } from '@mui/material/colors';
import { getInsights } from 'services/course/pages/Charts/components/helpers/insights';
import { role } from 'services/course/helpers/PageHelpers';
import { isEmptyObject } from 'services/course/helpers/Validations';
import { formTypes } from 'services/course/pages/FormBuilder/helpers';

const useLessonOutcomeChartLandingHook = ( props ) => {
    let { outcomeInsights, currentUser, outcomes, lessonItem, onlineQuestions  } = props;

    let lessonInsights; let lessonOutcomes;         

    if ( outcomeInsights?.length === 0 ) return {};

    if (isEmptyObject(outcomeInsights)) return {}; 

    const formTypeCollection = [ formTypes?.quizzwithpoints, formTypes?.homework, formTypes?.lessoninsights ];
    const [ selectedFormType, setSelectedFormType ] = useState(formTypes?.lessoninsights); // fix
    const dispatch = useDispatch();

    useEffect(() => {}, [ selectedFormType ]);
 
    let copyOutcomeInsights; let lessonInsightsMeasurableOutcomeResult;

    if (currentUser?.role === role.Tutor) {
      copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.formType === selectedFormType ) ];
    }
  
    if (currentUser?.role === role.Student) {
      copyOutcomeInsights = [ ...outcomeInsights?.filter(item => item?.userId === currentUser?._id && item?.formType === selectedFormType )];
    }

    if ( ( copyOutcomeInsights?.length === 0 )) return {};

    if ( lessonItem && ( copyOutcomeInsights?.length > 0 ) ) {
      lessonOutcomes = outcomes.filter(lessonOutcome => lessonOutcome?.lessonId === lessonItem?._id);
      lessonInsights = copyOutcomeInsights?.filter(insights => lessonOutcomes?.map(outcome => outcome?._id)?.includes(insights?.outcomeId));

      if ( isEmptyObject(lessonInsights ) ) return null;

      let {
        numberOfQuestionsInOutcome,
        numberOfQuestionsPassedOutcome,
        numberOfQuestionsFailedOutcome,
        totalNumberOfAttemptedFailedQuestions,
        numberOfUnAttemptedQuestionsInOutcome
      } = getInsights(lessonInsights);
  
      let numberOfStudentsInCoaching = getNumberOfStudentsInCoaching(lessonInsights);
    
      lessonInsightsMeasurableOutcomeResult = [
        {header:'#Questions Passed',rate: numberOfQuestionsPassedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor: green[500], avatarText: '#'},
        {header:'#Questions Missed',rate: numberOfQuestionsFailedOutcome, passFailRate: '', title:'', width:90, minWidth:200, iconColor:deepOrange[500], avatarText: '#'},
        {header:'%Pass',rate:Math.round((numberOfQuestionsPassedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: green[500], avatarText:'%'},
        {header:'%Fail',rate:Math.round((numberOfQuestionsFailedOutcome / numberOfQuestionsInOutcome) * 100), passFailRate:'', title:'', width:90, minWidth:200, iconColor: deepOrange[500], avatarText:'%'},
        {header:'#Attempted Fail', rate:totalNumberOfAttemptedFailedQuestions, passFailRate:'', title:'', width:90, minWidth:200, iconColor:orange[500], avatarText:'AF'},
        {header:'#Unattempted Fail', rate:numberOfUnAttemptedQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth:200, iconColor:red[500], avatarText:'UF'},
        {header:'Total # Questions', rate:numberOfQuestionsInOutcome, passFailRate:'', title:'', width:90, minWidth: 200},
        {header:'Coaching', rate:numberOfStudentsInCoaching, passFailRate:'', title:'', width:90, minWidth:200, iconColor:green[900], avatarText:'C'}
      ];
    }

    function handleSelectedFormType( evt ) {
      setSelectedFormType( evt?.target?.value )
    }

    function handleToggleButton() {
      dispatch( toggleLessonOutcome() );
    }

  return {
    lessonPieChartData: { pie1: lessonInsights, pie2: lessonInsights, pie3: lessonInsights, lessonOutcomes, handleToggleButton, tertiaryData: lessonInsightsMeasurableOutcomeResult, handleSelectedFormType, selectedFormType, formTypeCollection }
  };
};

export default useLessonOutcomeChartLandingHook;