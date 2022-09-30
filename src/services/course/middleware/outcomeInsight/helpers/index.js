import { addNewOutcomeInsight, saveOutcomeInsight, loadOutcomeInsights } from 'services/course/actions/outcomeInsights';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export const resultProp = {
    numberOfStudentsPassedQuestion: 'numberOfStudentsPassedQuestion',
    numberOfStudentsFailedQuestion: 'numberOfStudentsFailedQuestion',
    numberOfStudentsPartialQuestionPoints: 'numberOfStudentsPartialQuestionPoints',
    numberOfStudentsAttemptedQuestion: 'numberOfStudentsAttemptedQuestion',
    numberOfQuestions: 'questionId',
    numberOfQuestionsPassed: 'passed',
    numberOfQuestionsFailed: 'fail'
};

export function getNumberOfQuestions( questionInsightsCollection ) { // check for un answered questions ... as fail
    let numberOfQuestionsInOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestions );

    return { numberOfQuestionsInOutcome };
}

export function getTheNumberOfQuestionsResultForAttemptedOutcomes( questionInsightsCollection, propName ) {
    switch ( propName ) {
        case resultProp.numberOfQuestionsPassed:   
            return getPassRate( questionInsightsCollection );
        case resultProp.numberOfQuestionsFailed:   
            return getFailureRate( questionInsightsCollection );
        default:
            break;
    }
}

function getPassRate( questionInsightsCollection ) {
    let numberOfQuestionsInOutcome = questionInsightsCollection?.length;
    let numberOfQuestionsPassedOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestionsPassed );
    let percentageNumberOfQuestionsPassedOutcome = getCalculatedPercentage( numberOfQuestionsPassedOutcome, numberOfQuestionsInOutcome );

    return { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome };
}

function getFailureRate( questionInsightsCollection ) {
    let numberOfQuestionsInOutcome = questionInsightsCollection?.length;
    let numberOfQuestionsFailedOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestionsFailed );
    let percentageNumberOfQuestionsFailedOutcome = getCalculatedPercentage( numberOfQuestionsFailedOutcome, numberOfQuestionsInOutcome );

    return { numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome };
}

function getCalculatedNumberOfItems( collection, propertyName ) {
    let mappedCollectionOfStudents = collection?.map( item => item[ propertyName ] );

    return mappedCollectionOfStudents?.reduce(( prevVal, currentVal ) =>  prevVal + currentVal, 0);
}

function getCalculatedPercentage( result, totalNumber ) {
    if ( !result ) return 0;
    if ( !totalNumber || totalNumber === 0 ) return 0;

    return ( (result/totalNumber) * 100 );
}

export function handleAddingOutcomeInsight( store, studentQuestionInsight  ) {
  try {

    store.dispatch( loadOutcomeInsights() );
    store.dispatch( loadStudentQuestionInsights() );

    let existingStudentQuestionInsights = Object.values( store.getState()?.studentQuestionInsights?.studentQuestionInsights );

    existingStudentQuestionInsights = initializeStudentCollection( store, existingStudentQuestionInsights, studentQuestionInsight );

    let { formName, formType, outcomeId, courseId, lessonId, operatorId } = studentQuestionInsight;
   
    let mappedOutcomes = existingStudentQuestionInsights.map( item => item.outcomeId );

    let uniqueMappedOutcomes = [ ...new Set([ ...mappedOutcomes ]) ];

    uniqueMappedOutcomes.map( outcomeId => {

        let questionsPerOutcome = existingStudentQuestionInsights?.filter( item => item.outcomeId === outcomeId );

        let { numberOfQuestionsInOutcome } = questionsPerOutcome?.length;

        let { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( questionsPerOutcome, resultProp.numberOfQuestionsPassed );
    
        let { numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( questionsPerOutcome, resultProp.numberOfQuestionsFailed  );
    
        if ( studentQuestionInsight ) {

            let outcomeInsightsObj = {
                formType,
                formName,            
                outcomeId,
                courseId,
                lessonId,
                numberOfQuestionsInOutcome,
                numberOfQuestionsPassedOutcome,
                numberOfQuestionsFailedOutcome,
                percentageNumberOfQuestionsPassedOutcome,
                percentageNumberOfQuestionsFailedOutcome,
                operatorId
            };
    
          handleAddingNewOutcomeInsight( handleSavingOutcomeInsights( store, outcomeInsightsObj ), store, outcomeInsightsObj );
        }
        
    });

  } catch (error) {
      console.log( `handleAddingOutcomeInsight ${error}` );
  }
}

function initializeStudentCollection( store, studentCollection, questionInsight ) {
    let updateInsight = studentCollection?.find(item => item?.questionId === questionInsight?.questionId && 
        item?.formUuId === questionInsight?.formUuId  &&
            item?.formName === questionInsight?.formName && item?.userId === questionInsight?.userId  );

    if ( updateInsight ) {
        let insightIndex = studentCollection?.findIndex(item => item?.questionId === questionInsight?.questionId && 
            item?.formUuId === questionInsight?.formUuId  &&
                item?.formName === questionInsight?.formName  && item?.userId === questionInsight?.userId  );

        if ( typeof(insightIndex) === 'number' ) {
            studentCollection.splice( insightIndex, 1, questionInsight );
        }
        return studentCollection;
    }
    return [ ...studentCollection, questionInsight ];
}


function handleSavingOutcomeInsights( store, outcomeInsightsObj ) {

    let { outcomeId, formName, formType } = outcomeInsightsObj;

    let existingOutcomeInsight = Object.values(store.getState()?.outcomeInsights?.outcomeInsights)?.
        find(insight => insight.outcomeId === outcomeId );

    if ( existingOutcomeInsight ) {
        let numberOfQuestionsInOutcome = outcomeInsightsObj?.numberOfQuestionsInOutcome;
        let numberOfQuestionsPassedOutcome = outcomeInsightsObj?.numberOfQuestionsPassedOutcome;
        let numberOfQuestionsFailedOutcome = outcomeInsightsObj?.numberOfQuestionsFailedOutcome;
        let percentageNumberOfQuestionsPassedOutcome = outcomeInsightsObj?.percentageNumberOfQuestionsPassedOutcome;
        let percentageNumberOfQuestionsFailedOutcome = outcomeInsightsObj?.percentageNumberOfQuestionsFailedOutcome;

        store.dispatch( saveOutcomeInsight( {...existingOutcomeInsight, 
            numberOfQuestionsInOutcome, numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome, 
            percentageNumberOfQuestionsPassedOutcome, percentageNumberOfQuestionsFailedOutcome  
        } ));
        return true;
    }
    return false;
}

function handleAddingNewOutcomeInsight( insight, store, outcomeInsight ) {
    if ( insight ) return;
    store.dispatch( addNewOutcomeInsight( outcomeInsight ) );
}
