import { addNewStudentQuestionInsight, saveStudentQuestionInsight, loadStudentQuestionInsights, DRAGGABLE_ITEM } from 'services/course/actions/studentQuestionInsights';

export const unAnsweredQuestions = ( store, form ) => {

    let { formName, formUuId, userId, formType, operatorId } = form;
    
    let questionsInTestSet = Object.values( store.getState()?.onlineQuestions?.onlineQuestions )?.filter( item => item?.formName === formName &&  item?.formType === formType );

    let uniqueQuestionIdsInTestSet = [...new Set( questionsInTestSet?.map(item => item?._id)) ];

    let questionsAnswered = Object.values( store.getState()?.formFieldAnswers?.formFieldAnswers )?.
        filter( item => item?.formName === formName &&
            item?.formUuId === formUuId && 
            item?.formType === formType &&   
            item?.userId === userId )?.
            map( item => item?.questionId );
   
    let uniqueAnsweredQuestionIds = [ ...new Set( questionsAnswered ) ];

    let unAttemptedQuestionIds = uniqueQuestionIdsInTestSet?.filter( item => !uniqueAnsweredQuestionIds.includes( item ) );

    if ( unAttemptedQuestionIds?.length === 0 ) return [];
    
    let unAttemptedQuestions = questionsInTestSet.filter( item => unAttemptedQuestionIds.includes( item?._id ) );

    unAttemptedQuestions =  [ ...new Set( unAttemptedQuestions ) ];

    let unansweredQuestionsCollection = [];
     
    unAttemptedQuestions?.map( question => {
       let questionId = question?._id;
       let outcomeId = question?.outcomeId;
       let questionInsight = {
            questionId,
            totalPointsReceived: 0,
            passed: false,
            fail: true,
            unanswered: true,
            outcomeId,
            formName,
            userId, 
            formUuId,
            formType,
            operatorId
        };

        if ( questionInsight ) {
            unansweredQuestionsCollection = [ ...unansweredQuestionsCollection, questionInsight ];

            let existingQuestionInsight = Object.values(store.getState()?.studentQuestionInsights?.studentQuestionInsights)?.
                find(insight => insight?.userId === userId && insight.questionId === questionId && insight.formUuId === formUuId  );

            if ( existingQuestionInsight ) {
                store.dispatch( saveStudentQuestionInsight( { ...existingQuestionInsight, ...questionInsight  } ));
                store.dispatch(loadStudentQuestionInsights());
            } else {
                store.dispatch( addNewStudentQuestionInsight( questionInsight ) );
            }
            store.dispatch( loadStudentQuestionInsights() );
        }  
    });
    return unansweredQuestionsCollection;
}
