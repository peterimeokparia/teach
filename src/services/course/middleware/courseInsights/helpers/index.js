import { getSumOfItems } from 'services/course/pages/Charts/components/helpers/insights';
import { getCalculatedPercentage } from 'services/course/middleware/outcomeInsight/helpers';
import { addNewCourseOutcomeInsight, saveCourseOutcomeInsight } from 'services/course/actions/courseOutcomeInsights';

export const insightProps = {
    numberOfQuestionsInOutcome: 'numberOfQuestionsInOutcome',
    numberOfQuestionsPassedOutcome: 'numberOfQuestionsPassedOutcome',
    numberOfQuestionsFailedOutcome: 'numberOfQuestionsFailedOutcome',
    totalNumberOfAttemptedFailedQuestions: 'totalNumberOfAttemptedFailedQuestions',
    numberOfUnAttemptedQuestionsInOutcome: 'numberOfUnAttemptedQuestionsInOutcome',
    percentageNumberOfQuestionsPassedOutcome: 'percentageNumberOfQuestionsPassedOutcome', 
    percentageNumberOfQuestionsFailedOutcome: 'percentageNumberOfQuestionsFailedOutcome',
    percentageNumberOfUnAttemptedQuestionsInFailureRate: 'percentageNumberOfUnAttemptedQuestionsInFailureRate'
}

export const buildCourseInsights = ( store, form ) => {
    let { formType, courseId } = form;

    let outComeInsightsCollection = Object.values(store.getState()?.outcomeInsights?.outcomeInsights)?.
        filter( insight => insight?.formType === formType  );

    if ( outComeInsightsCollection && outComeInsightsCollection?.length === 0  ) return;

    let { 
        totalNumberOfOutcomeQuestionsInCourse,
        totalNumberOfQuestionsPassedOutcomeInCourse,
        totalNumberOfQuestionsFailedOutcomeInCourse,
        totalNumberOfAttemptedFailedOutcomeQuestionsInCourse,
        totalNumberOfUnAttemptedOutcomeQuestionsInCourse,
        percentageNumberOfQuestionsPassedOutcomeInCourse,
        percentageNumberOfQuestionsFailedOutcomeInCourse,
        percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse } = handleCourseInsights( outComeInsightsCollection );

    let courseInsightsObject = {
        formType,
        courseId,
        totalNumberOfOutcomeQuestionsInCourse,
        totalNumberOfQuestionsPassedOutcomeInCourse,
        totalNumberOfQuestionsFailedOutcomeInCourse,
        totalNumberOfAttemptedFailedOutcomeQuestionsInCourse,
        totalNumberOfUnAttemptedOutcomeQuestionsInCourse,
        percentageNumberOfQuestionsPassedOutcomeInCourse,
        percentageNumberOfQuestionsFailedOutcomeInCourse,
        percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse
    };

    handleAddingCourseInsights( courseInsightsObject, handleSavingCourseInsights( courseInsightsObject, courseId, store ), store );
}

function handleSavingCourseInsights(courseInsightsObject, courseId, store ) { 
    let courseInsights = Object.values( store.getState()?.courseOutcomeInsights?.courseOutcomeInsights );

    if ( courseInsights && courseInsights?.length === 0 ) return false;

    let existingCourseInsight = courseInsights?.find(insight => insight?.courseId === courseId );

    if ( existingCourseInsight ) {
        store.dispatch( saveCourseOutcomeInsight({...existingCourseInsight, ...courseInsightsObject }) );
        return true;
    }
    return false
}

function handleAddingCourseInsights( courseInsightsObject, courseInsights, store ) { 
    if ( !courseInsights ) {
        store.dispatch( addNewCourseOutcomeInsight( courseInsightsObject ) );
    }
}

export function handleCourseInsights( outComeInsightsCollection ) { 
    if ( !outComeInsightsCollection || outComeInsightsCollection?.length === 0 ) return;
    
    let totalNumberOfOutcomeQuestionsInCourse = getTotalNumberCourseItems( outComeInsightsCollection, insightProps.numberOfQuestionsInOutcome );
    let totalNumberOfQuestionsPassedOutcomeInCourse = getTotalNumberCourseItems( outComeInsightsCollection, insightProps.numberOfQuestionsPassedOutcome );
    let totalNumberOfQuestionsFailedOutcomeInCourse = getTotalNumberCourseItems( outComeInsightsCollection, insightProps.numberOfQuestionsFailedOutcome );
    let totalNumberOfAttemptedFailedOutcomeQuestionsInCourse = getTotalNumberCourseItems( outComeInsightsCollection, insightProps.totalNumberOfAttemptedFailedQuestions );
    let totalNumberOfUnAttemptedOutcomeQuestionsInCourse = getTotalNumberCourseItems( outComeInsightsCollection, insightProps.numberOfUnAttemptedQuestionsInOutcome );    
    let percentageNumberOfQuestionsPassedOutcomeInCourse = Math.round( getCalculatedPercentage( totalNumberOfQuestionsPassedOutcomeInCourse, totalNumberOfOutcomeQuestionsInCourse ) );
    let percentageNumberOfQuestionsFailedOutcomeInCourse = Math.round( getCalculatedPercentage( totalNumberOfQuestionsFailedOutcomeInCourse, totalNumberOfOutcomeQuestionsInCourse ) );
    let percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse = Math.round(getCalculatedPercentage( totalNumberOfUnAttemptedOutcomeQuestionsInCourse, totalNumberOfQuestionsFailedOutcomeInCourse ));
    return {
        totalNumberOfOutcomeQuestionsInCourse,
        totalNumberOfQuestionsPassedOutcomeInCourse,
        totalNumberOfQuestionsFailedOutcomeInCourse,
        totalNumberOfAttemptedFailedOutcomeQuestionsInCourse,
        totalNumberOfUnAttemptedOutcomeQuestionsInCourse,
        percentageNumberOfQuestionsPassedOutcomeInCourse,
        percentageNumberOfQuestionsFailedOutcomeInCourse,
        percentageNumberOfUnAttemptedQuestionsInFailureRateInCourse 
    }
};

function getTotalNumberCourseItems( outComeInsightsCollection, property ){
   return getSumOfItems( outComeInsightsCollection, property );
}
