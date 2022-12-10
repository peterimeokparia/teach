import { addNewOutcomeInsight, saveOutcomeInsight, loadOutcomeInsights } from 'services/course/actions/outcomeInsights';
import { loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { isEmptyObject } from "services/course/helpers/Validations";

export const resultProp = {
    numberOfStudentsPassedQuestion: 'numberOfStudentsPassedQuestion',
    numberOfStudentsFailedQuestion: 'numberOfStudentsFailedQuestion',
    numberOfStudentsPartialQuestionPoints: 'numberOfStudentsPartialQuestionPoints',
    numberOfStudentsAttemptedQuestion: 'numberOfStudentsAttemptedQuestion',
    numberOfQuestions: 'questionId',
    numberOfQuestionsPassed: 'passed',
    numberOfQuestionsFailed: 'fail',
    numberOfQuestionsUnAnswered: 'unanswered'
};

export function getNumberOfQuestions( questionInsightsCollection ) {
    let numberOfQuestionsInOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestions );

    return { numberOfQuestionsInOutcome };
}

export function getTheNumberOfQuestionsResultForAttemptedOutcomes( questionInsightsCollection, propName ) {
    switch ( propName ) {
        case resultProp.numberOfQuestionsPassed:   
            return getPassRate( questionInsightsCollection );
        case resultProp.numberOfQuestionsFailed:   
            return getFailureRate( questionInsightsCollection );
        case resultProp.numberOfQuestionsUnAnswered:   
            return getUnAnsweredRate( questionInsightsCollection );
        default:
            break;
    }
}

export function getPassRate( questionInsightsCollection ) {
    let numberOfQuestionsInOutcome = questionInsightsCollection?.length;
    let numberOfQuestionsPassedOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestionsPassed );
    let percentageNumberOfQuestionsPassedOutcome = getCalculatedPercentage( numberOfQuestionsPassedOutcome, numberOfQuestionsInOutcome );

    return { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome };
}

export function getFailureRate( questionInsightsCollection ) {
    let numberOfQuestionsInOutcome = questionInsightsCollection?.length;
    let numberOfQuestionsFailedOutcome = getCalculatedNumberOfItems( questionInsightsCollection, resultProp.numberOfQuestionsFailed );
    let percentageNumberOfQuestionsFailedOutcome = getCalculatedPercentage( numberOfQuestionsFailedOutcome, numberOfQuestionsInOutcome );

    return { numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome };
}

export function getUnAnsweredRate( questionInsightsCollection ) {
    let totalNumberOfFailure = questionInsightsCollection.filter(item => item?.fail === true )?.length;
    let totalNumberOfAttemptedFailedQuestions = questionInsightsCollection.filter(item => item?.unanswered === false && item?.fail === true )?.length;
    let numberOfUnAttemptedQuestionsInOutcome = questionInsightsCollection.filter(item => item?.unanswered === true && item?.fail === true )?.length;
    let percentageNumberOfUnAttemptedQuestionsInFailureRate = ((numberOfUnAttemptedQuestionsInOutcome/totalNumberOfFailure) * 100);

    return { numberOfUnAttemptedQuestionsInOutcome, totalNumberOfAttemptedFailedQuestions, percentageNumberOfUnAttemptedQuestionsInFailureRate };
}

function getListOfStudents( questionInsightsCollection ) {
    let listOfStudents = questionInsightsCollection?.map( item => item?.userId );

    if ( listOfStudents?.length > 0 ) {
        listOfStudents = [ ...new Set( listOfStudents ) ];
    }
    return listOfStudents;
}

function getCollectionItems( type, questionInsightsCollection ) {
    if ( !questionInsightsCollection?.length  ) return;
    if ( !questionInsightsCollection?.length === 0 ) return;

    let listOfStudents = questionInsightsCollection.filter(item => item[type] === true )?.map(item => item?.userId );

        if ( listOfStudents?.length > 0 ) {
            listOfStudents = [ ...new Set( listOfStudents ) ];
        }

    let questions = listOfStudents?.map(userId => buildQuestionsCollection(userId, type, questionInsightsCollection));

    switch (type) {
        case resultProp.numberOfQuestionsFailed:
            return { listOfStudentsFailedQuestionsInOutcome: listOfStudents, listOfQuestionsFailed: questions };
        case resultProp.numberOfQuestionsPassed:
            return { listOfStudentsPassedQuestionsInOutcome: listOfStudents, listOfQuestionsPassed: questions };  
        default:
            return;
    }
}

function buildQuestionsCollection( userId, type, questionInsightsCollection ) {
    if ( !userId ) return;
    
    let questions = questionInsightsCollection?.filter( item => item[type] === true && item?.userId === userId );

    return { userId, questions }
}

export function getCalculatedNumberOfItems( collection, propertyName ) {
    let mappedCollectionOfStudents = collection?.filter( item => item[propertyName] === true );

    return mappedCollectionOfStudents?.length;
}

export function getCalculatedPercentage( result, totalNumber ) {
    if ( !result ) return 0;
    if ( !totalNumber || totalNumber === 0 ) return 0;

    return ( (result/totalNumber) * 100 );
}

export function handleAddingOutcomeInsight( store, form ) {
  try {
      
    let existingStudentQuestionInsights = Object.values(store.getState()?.studentQuestionInsights?.studentQuestionInsights);

    store.dispatch( loadOutcomeInsights() );
    store.dispatch( loadStudentQuestionInsights() );
    
    let listOfStudents = getListOfStudents( existingStudentQuestionInsights );
   
    let mappedOutcomes = existingStudentQuestionInsights.map( item => item.outcomeId );

    let uniqueMappedOutcomes = [ ...new Set( [ ...mappedOutcomes ] ) ];

    let props = { existingStudentQuestionInsights, uniqueMappedOutcomes, form, store, listOfStudents };

    getOutcomeInsightsPerStudent( props );

    store.dispatch( loadOutcomeInsights() );

  } catch (error) {
      console.log( `handleAddingOutcomeInsight ${error}` );
    return false;
  }
}

function getOutcomeInsightsPerStudent( props ) {
    
    let { existingStudentQuestionInsights, uniqueMappedOutcomes, form, store, listOfStudents } = props;

    listOfStudents.forEach(userId => {
        let props = { existingStudentQuestionInsights, uniqueMappedOutcomes, userId, form, store };

        getCurrentOutcomeInsights( props );
    });
}

function getCurrentOutcomeInsights( props ) {
    try {
        
        if ( isEmptyObject( props ) ) return;

        let { existingStudentQuestionInsights, uniqueMappedOutcomes, userId, form, store  } = props;

        let insights = existingStudentQuestionInsights?.filter( item => item?.formType === form?.formType );

        if ( insights ) {
            getUniqueMappedOutcomeInsights( uniqueMappedOutcomes, userId, form, store, insights );
        }

    } catch (error) {
        console.log(`There was a problem getting  outcome insights`)
    }
}
   
function getUniqueMappedOutcomeInsights( uniqueMappedOutcomes, userId, form, store, insights ) {
    uniqueMappedOutcomes.map( outcomeId => getOutcomeInsights( outcomeId, userId, form, store, insights ));
}

function getOutcomeInsights( outcomeId, userId, form, store, insights ) {
    
    let { formName, formType, courseId, lessonId } = form; let questionsPerOutcome;

    if ( userId ) {
        questionsPerOutcome = insights?.filter( item => item.outcomeId === outcomeId && item?.userId === userId );
    }
    
    let {
        numberOfQuestionsInOutcome,
        numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome,
        numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome,
        numberOfUnAttemptedQuestionsInOutcome, totalNumberOfAttemptedFailedQuestions, 
        percentageNumberOfUnAttemptedQuestionsInFailureRate,
        listOfStudentsFailedQuestionsInOutcome, listOfQuestionsFailed,
        listOfStudentsPassedQuestionsInOutcome, listOfQuestionsPassed
    } = getInsightsData( questionsPerOutcome ); 

    const operatorId = getItemFromSessionStorage('operator')?._id;

        let outcomeInsightsObj = {
            formType,
            formName,            
            outcomeId,
            courseId,
            lessonId,
            userId,
            numberOfQuestionsInOutcome,
            numberOfQuestionsPassedOutcome,
            numberOfQuestionsFailedOutcome,
            totalNumberOfAttemptedFailedQuestions,
            numberOfUnAttemptedQuestionsInOutcome,
            percentageNumberOfQuestionsPassedOutcome,
            percentageNumberOfQuestionsFailedOutcome,
            percentageNumberOfUnAttemptedQuestionsInFailureRate,
            listOfStudentsFailedQuestionsInOutcome,
            listOfQuestionsFailed,
            listOfStudentsPassedQuestionsInOutcome,
            listOfQuestionsPassed,
            operatorId
        };

    handleAddingNewOutcomeInsight( handleSavingOutcomeInsights( store, outcomeInsightsObj, userId ), store, outcomeInsightsObj );
}

export function getInsightsData( questionsPerOutcome ) {

    if ( !questionsPerOutcome?.length ) return;

    let numberOfQuestionsInOutcome = questionsPerOutcome?.length;
    let { numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( questionsPerOutcome, resultProp.numberOfQuestionsPassed );
    let { numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome } = getTheNumberOfQuestionsResultForAttemptedOutcomes( questionsPerOutcome, resultProp.numberOfQuestionsFailed  );
    let { numberOfUnAttemptedQuestionsInOutcome, totalNumberOfAttemptedFailedQuestions, percentageNumberOfUnAttemptedQuestionsInFailureRate } = getTheNumberOfQuestionsResultForAttemptedOutcomes( questionsPerOutcome, resultProp.numberOfQuestionsUnAnswered  );
    let { listOfStudentsFailedQuestionsInOutcome, listOfQuestionsFailed } = getCollectionItems( resultProp.numberOfQuestionsFailed, questionsPerOutcome );
    let { listOfStudentsPassedQuestionsInOutcome, listOfQuestionsPassed } = getCollectionItems( resultProp.numberOfQuestionsPassed, questionsPerOutcome );
    
    return {
        numberOfQuestionsInOutcome,
        numberOfQuestionsPassedOutcome, percentageNumberOfQuestionsPassedOutcome,
        numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsFailedOutcome,
        numberOfUnAttemptedQuestionsInOutcome, totalNumberOfAttemptedFailedQuestions, 
        percentageNumberOfUnAttemptedQuestionsInFailureRate,
        listOfStudentsFailedQuestionsInOutcome, listOfQuestionsFailed,
        listOfStudentsPassedQuestionsInOutcome, listOfQuestionsPassed
    };
}

function handleSavingOutcomeInsights( store, outcomeInsightsObj, userId ) {
    let { outcomeId, formType } = outcomeInsightsObj;

    let existingOutcomeInsight = Object.values(store.getState()?.outcomeInsights?.outcomeInsights)?.
        find( insight => insight?.formType === formType && insight.outcomeId === outcomeId && insight?.userId === userId );

    if ( existingOutcomeInsight ) {
        let numberOfQuestionsInOutcome = outcomeInsightsObj?.numberOfQuestionsInOutcome;
        let numberOfQuestionsPassedOutcome = outcomeInsightsObj?.numberOfQuestionsPassedOutcome;
        let numberOfQuestionsFailedOutcome = outcomeInsightsObj?.numberOfQuestionsFailedOutcome;
        let totalNumberOfAttemptedFailedQuestions = outcomeInsightsObj?.totalNumberOfAttemptedFailedQuestions;
        let percentageNumberOfQuestionsPassedOutcome = outcomeInsightsObj?.percentageNumberOfQuestionsPassedOutcome;
        let percentageNumberOfQuestionsFailedOutcome = outcomeInsightsObj?.percentageNumberOfQuestionsFailedOutcome;

        store.dispatch( saveOutcomeInsight( {...existingOutcomeInsight, numberOfQuestionsInOutcome,
            numberOfQuestionsPassedOutcome, numberOfQuestionsFailedOutcome, percentageNumberOfQuestionsPassedOutcome, 
            percentageNumberOfQuestionsFailedOutcome, totalNumberOfAttemptedFailedQuestions  
        } ));

        store.dispatch( loadOutcomeInsights() );
        return true;
    }
    return false;
}

function handleAddingNewOutcomeInsight( insight, store, outcomeInsight) {
    if ( insight ) return;
    store.dispatch( addNewOutcomeInsight( outcomeInsight ) );
    store.dispatch( loadOutcomeInsights() );
}
