import { addNewStudentQuestionInsight, saveStudentQuestionInsight, loadStudentQuestionInsights, DRAGGABLE_ITEM } from 'services/course/actions/studentQuestionInsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export const unAnsweredQuestions = ( store, action ) => {

    let { formName, formUuId, userId, formType, operatorId } = action?.form;

    let questionsInTestSet = Object.values( store.getState()?.onlineQuestions?.onlineQuestions )?.filter( item => item?.formName === formName );

    let uniqueQuestionIdsInTestSet = [...new Set( questionsInTestSet?.map(item => item?._id)) ];

    let questionsAnswered = Object.values( store.getState()?.formFieldAnswers?.formFieldAnswers )?.
        filter( item => item?.formName === formName &&
            item?.formUuId === formUuId && 
                item?.userId === userId )?.
            map( item => item?.questionId );

    let uniqueAnsweredQuestionIds = [ ...new Set( questionsAnswered?.map( item => item?.questionId )) ];

    let unAttemptedQuestionIds = uniqueQuestionIdsInTestSet?.filter( item => !uniqueAnsweredQuestionIds.includes( item ) );

    let unAttemptedQuestions = questionsInTestSet.filter( item => unAttemptedQuestionIds.includes( item?._id ) );

     unAttemptedQuestions =  [...new Set( unAttemptedQuestions ) ];
     
     unAttemptedQuestions?.map( question => {

       let questionInsight = {
            questionId: question?._id,
            totalPointsReceived: 0,
            passed: false,
            fail: true,
            unanswered: true,
            outcomeId: question?.outcomeId,
            formName,
            userId, 
            formUuId,
            formType,
            operatorId
        };

        store.dispatch( addNewStudentQuestionInsight( questionInsight ) );
    });

}