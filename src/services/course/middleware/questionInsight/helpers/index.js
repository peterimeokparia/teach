import { addNewQuestionInsight, saveQuestionInsight, loadQuestionInsights } from 'services/course/actions/questioninsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export function handleAddingQuestionInsight( store, form ) {

    let { formName, formType, courseId, lessonId, operatorId } = form;

    let studentQuestionInsightCollection = Object.values(store.getState()?.studentQuestionInsights?.studentQuestionInsights)?.
        filter(item => item?.formType === formType && item?.formName === formName );

    store.dispatch( loadQuestionInsights() );

    studentQuestionInsightCollection.map( questionInsight => {
                
        if ( questionInsight ) {

            let { questionId, outcomeId } = questionInsight;
            
            let questionInsightsCollection = studentQuestionInsightCollection?.filter(item => item?.questionId === questionId );
            let { numberOfSubmittedAssignments } = getNumberOfSubmittedAssignment( questionInsightsCollection );
            let { numberOfStudents } = getNumberOfStudentsAttemptedQuestion( questionInsightsCollection );
            let { passed, fail, unanswered } = getStudentQuestionInsights( questionInsightsCollection );
        
            const totalNumberOfSubmittedAssignments = numberOfSubmittedAssignments;
            const totalNumberOfStudents = numberOfStudents;
            const numberOfStudentsAttemptedQuestion = ( numberOfStudents - unanswered );
            const numberOfStudentsPassedQuestion = passed;
            const numberOfStudentsFailedQuestion = fail;
            const numberOfStudentsUnAttemptedQuestion = unanswered;
            const passPercentRate = ( ( numberOfStudentsPassedQuestion / totalNumberOfSubmittedAssignments ) * 100 );
            const { unAttemptedPercentRate,  failurePercentRate } = handleFailureRate( numberOfStudentsFailedQuestion, numberOfStudentsUnAttemptedQuestion, totalNumberOfSubmittedAssignments );
            
            let questionInsightsObj = {
                formType,
                formName,            
                questionId,
                courseId, 
                lessonId, 
                operatorId,
                outcomeId,
                totalNumberOfSubmittedAssignments,
                totalNumberOfStudents,
                numberOfStudentsAttemptedQuestion,
                numberOfStudentsUnAttemptedQuestion,
                numberOfStudentsPassedQuestion,
                numberOfStudentsFailedQuestion,
                passPercentRate,
                failurePercentRate,
                unAttemptedPercentRate
            };

            handleAddingNewQuestionInsight( handleSavingQuestionInsights( store,  questionInsightsObj ), store, questionInsightsObj );
        }
    }); 
}

function handleFailureRate( numberOfStudentsFailedQuestion, numberOfStudentsUnAttemptedQuestion, totalNumberOfSubmittedAssignments ) {
    let unAttemptedPercentRate, failurePercentRate;

    if ( numberOfStudentsFailedQuestion === numberOfStudentsUnAttemptedQuestion ) {
        unAttemptedPercentRate = ( ( numberOfStudentsUnAttemptedQuestion / totalNumberOfSubmittedAssignments ) * 100 );
    } else {
        failurePercentRate = ( ( numberOfStudentsFailedQuestion / totalNumberOfSubmittedAssignments ) * 100 );
    }
    return { unAttemptedPercentRate,  failurePercentRate };    
}

function handleSavingQuestionInsights( store, questionInsightsObj ) {
    let { questionId, formName, formType, outcomeId} = questionInsightsObj;

    let existingQuestionInsight = Object.values(store.getState()?.questionInsights?.questionInsights)?.
        find(insight => insight?.formName === formName && insight?.formType === formType && insight.questionId === questionId );

    if ( existingQuestionInsight ) {

        store.dispatch( saveQuestionInsight( { ...existingQuestionInsight, ...questionInsightsObj } ));
        return true;
    }
    return false;
}

function handleAddingNewQuestionInsight( insight, store, questionInsight ) {
    if ( insight ) return;

    store.dispatch( addNewQuestionInsight( questionInsight ) );
}

export function getStudentQuestionInsights( questionInsightsStudentCollection ) {
    let passed = questionInsightsStudentCollection?.filter(item => item?.passed === true )?.length; 
    let fail = questionInsightsStudentCollection?.filter(item => item?.fail === true )?.length; 
    let unanswered = questionInsightsStudentCollection?.filter(item => item?.unanswered === true )?.length; 
    
    return { passed, fail, unanswered }; 
}

export function getNumberOfSubmittedAssignment( questionInsightsStudentCollection ) {
    let numberOfSubmittedAssignments = [];

    if ( questionInsightsStudentCollection?.length > 0 ) {
        numberOfSubmittedAssignments = [ ...new Set( questionInsightsStudentCollection?.map( item => item?.formUuId )) ];
    }

   return { numberOfSubmittedAssignments: numberOfSubmittedAssignments?.length };
}

export function getNumberOfStudentsAttemptedQuestion( questionInsightsStudentCollection ) {
    let numberOfStudentsCollection = [];

    if ( questionInsightsStudentCollection?.length > 0 ) {
        numberOfStudentsCollection = [ ...new Set( questionInsightsStudentCollection?.map( item => item?.userId )) ];
    }

   return { numberOfStudents: numberOfStudentsCollection?.length, numberOfStudentsCollection };
}

export function handleQuestion( question ) {
    if ( !question ) return;

    let { _id, formName } = question;

    return {
        questionId: _id,
        totalPoints: 0,
        formName
    }
};

export function getTotalPointsReceived( formFields, answer ) {
    if ( formFields?.length === 0 ) return;
    return calcAnsPoints( formFields, answer );
};

export function calcPoints( collection ){
    let totalPoints = 0;

    collection.map( item => {
        totalPoints += item?.points;
    });
    return totalPoints;
}

export function calcAnsPoints( collection, answer ){
    let totalPoints = 0;

    collection.map( item => {
        if ( item?.answer && ( item?.answer !== "" ) && item?.answer === item?.answerKey ) {
            totalPoints += item?.points;
        } 
    });
    return ( answer?.inputType === inputType.ExplanationAnswerEditor && totalPoints !== answer?.points ) ? answer?.points : totalPoints;
}