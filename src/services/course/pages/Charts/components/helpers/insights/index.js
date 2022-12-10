export const outcomeInsightProps = {
    numberOfQuestionsInOutcome: 'numberOfQuestionsInOutcome',
    numberOfQuestionsPassedOutcome: 'numberOfQuestionsPassedOutcome',
    numberOfQuestionsFailedOutcome: 'numberOfQuestionsFailedOutcome',
    totalNumberOfAttemptedFailedQuestions: 'totalNumberOfAttemptedFailedQuestions',
    numberOfUnAttemptedQuestionsInOutcome: 'numberOfUnAttemptedQuestionsInOutcome'
};

export const getInsights = ( insights ) => {
    if ( !insights || insights?.length === 0 ) return;
  
    let numberOfQuestionsInOutcome = getSumOfItems( insights, outcomeInsightProps.numberOfQuestionsInOutcome );
    let numberOfQuestionsPassedOutcome = getSumOfItems( insights, outcomeInsightProps.numberOfQuestionsPassedOutcome );
    let numberOfQuestionsFailedOutcome = getSumOfItems( insights, outcomeInsightProps.numberOfQuestionsFailedOutcome );
    let totalNumberOfAttemptedFailedQuestions = getSumOfItems( insights, outcomeInsightProps.totalNumberOfAttemptedFailedQuestions );
    let numberOfUnAttemptedQuestionsInOutcome = getSumOfItems( insights, outcomeInsightProps.numberOfUnAttemptedQuestionsInOutcome );
    
    return {
        numberOfQuestionsInOutcome,
        numberOfQuestionsPassedOutcome,
        numberOfQuestionsFailedOutcome,
        totalNumberOfAttemptedFailedQuestions,
        numberOfUnAttemptedQuestionsInOutcome 
    }
};

export function getSumOfItems( collection, property ){
    return getCollection(collection, property)?.reduce(( prevVal, currentVal ) => prevVal + currentVal, 0 );
}

function getCollection( collection, property ){
    return collection.map( item => item[property]);
}