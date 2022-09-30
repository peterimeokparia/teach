import { addNewQuestionInsight, saveQuestionInsight, loadQuestionInsights } from 'services/course/actions/questioninsights';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export function handleAddingQuestionInsight( store, questionInsight  ) {
    
    let { questionId } = questionInsight;

    store.dispatch( loadStudentQuestionInsights() );

    let numberOfStudentsCollection = Object.values( store.getState()?.studentQuestionInsights?.studentQuestionInsights )?.filter( item => item?.questionId === questionInsight?.questionId );

    numberOfStudentsCollection = initializeStudentCollection( store, numberOfStudentsCollection, questionInsight );

    store.dispatch( loadOnlineQuestionsByQuestionId( questionInsight?.questionId ) );

    let question = Object.values( store.getState()?.onlineQuestions?.onlineQuestions  ).find(item => item?._id === questionInsight?.questionId );
  
    let {  numberOfStudents } = getNumberOfStudentsAttemptedQuestion( question, numberOfStudentsCollection );
    
    let { passed, fail, unanswered } = getStudentQuestionInsights( question, numberOfStudentsCollection );

    let { formName, formType, outcomeId, courseId, lessonId, operatorId } = question;

    const totalNumberOfStudents = numberOfStudents;
    const numberOfStudentsAttemptedQuestion = ( numberOfStudents - unanswered );
    const numberOfStudentsPassedQuestion = passed;
    const numberOfStudentsFailedQuestion = fail;
    const numberOfStudentsUnAttemptedQuestion = unanswered;
    const passPercentRate = ( ( numberOfStudentsPassedQuestion / totalNumberOfStudents ) * 100 );
    const failurePercentRate = ( ( numberOfStudentsFailedQuestion / totalNumberOfStudents ) * 100 );
    const unAttemptedPercentRate = ( ( numberOfStudentsUnAttemptedQuestion / totalNumberOfStudents ) * 100 );

    if ( questionInsight ) {
        let questionInsightsObj = {
            formType,
            formName,            
            questionId,
            courseId, 
            lessonId, 
            operatorId,
            outcomeId,
            totalNumberOfStudents,
            numberOfStudentsAttemptedQuestion,
            numberOfStudentsUnAttemptedQuestion,
            numberOfStudentsPassedQuestion,
            numberOfStudentsFailedQuestion,
            passPercentRate,
            failurePercentRate,
            unAttemptedPercentRate
        };

       handleAddingNewQuestionInsight( handleSavingQuestionInsights( store, questionInsight, questionInsightsObj ), store, questionInsightsObj );
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

function handleSavingQuestionInsights( store, answer, questionInsightsObj ) {
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

export function getStudentQuestionInsights( question, questionInsightsStudentCollection ) {
    if ( !question ) return;

    let passed = questionInsightsStudentCollection?.filter(item => item?.passed === true )?.length; 

    let fail = questionInsightsStudentCollection?.filter(item => item?.fail === true )?.length; 

    let unanswered = questionInsightsStudentCollection?.filter(item => item?.unanswered === true )?.length; 
    
    return { passed, fail, unanswered }; 
}

export function getNumberOfStudentsAttemptedQuestion( question, questionInsightsStudentCollection ) {
    if ( !question ) return;

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

export function getTotalPointsReceived( formFields ) {
    if ( formFields?.length === 0 ) return;
    return calcAnsPoints( formFields )
};

export function calcPoints( collection ){
    let totalPoints = 0;

    collection.map( item => {
        totalPoints += item?.points;
    });
    return totalPoints;
}

export function calcAnsPoints( collection ){
    let totalPoints = 0;

    collection.map( item => {
        if ( item?.answer && ( item?.answer !== "" ) && item?.answer === item?.answerKey ) {
            totalPoints += item?.points;
        } 
    });
    return totalPoints;
}