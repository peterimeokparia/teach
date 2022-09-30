import { getTotalPointsReceived, getStudentQuestionInsights, getNumberOfStudentsAttemptedQuestion } from 'services/course/middleware/questionInsight/helpers';
import { loadFormFieldAnswersByQuestionId, loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { addNewStudentQuestionInsight, saveStudentQuestionInsight, loadStudentQuestionInsights, DRAGGABLE_ITEM } from 'services/course/actions/studentQuestionInsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import isEqual from 'react-fast-compare';

export function buildQuestionInsights( store, answer ){
    if ( !answer ) return;

    store.dispatch(loadStudentQuestionInsights());
  
    if ( answer?.inputType === inputType.RadioButton && !answer?.selected ) {
        return;
    }

    store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswersByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswers() );

    let formFieldAnsGroup = Object?.values( store?.getState().formFieldAnswers?.formFieldAnswers )?.filter( ans => ans?.userId === answer?.userId 
        && ans?.formUuId === answer?.formUuId && ans?.formName === answer?.formName && ans?.formFieldGroupId === answer?.formFieldGroupId );

    let formField = Object?.values( store?.getState().formFields?.formFields )?.find( ans => ans?.formName === answer?.formName && ans?._id === answer?.fieldId );

    const points = formField?.points;

    const question = Object.values( store.getState()?.onlineQuestions?.onlineQuestions  ).find(item => item?._id === answer?.questionId );

    if ( answer?.inputType === inputType.RadioButton && answer?.selected ) {
        formFieldAnsGroup = [ {...answer, points } ];
    }

    if ( answer?.inputType === inputType.DropDown ) {
        let points = ( answer?.answer === answer?.answerKey ) ? answer?.points : 0

        formFieldAnsGroup = [ {...answer, points } ];
    }
 
    if ( answer?.inputType === inputType.CheckBox ) {

        if ( answer && formFieldAnsGroup.length === 0  ) {

            let points = ( answer?.answer === answer?.answerKey ) ? answer?.points : 0;

            formFieldAnsGroup = [ {...answer, points } ];

            let questionInsight = handleQuestionInsightPoints( question, answer, formFieldAnsGroup );
   
            store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );
        
            const answerId = answer?._id;
        
            if ( questionInsight ) {
                let questionInsightsObj = {...questionInsight, answerId };

                handleAddingNewQuestionInsight( handleSavingQuestionInsights( store, answer, questionInsightsObj ), store, questionInsightsObj );
            }
            return;  
        }

        let currentPoints = ( answer?.answer === answer?.answerKey ) ? answer?.points : 0;

        formFieldAnsGroup = updateCollection( answer, formFieldAnsGroup, currentPoints );
    }

    let questionInsight = handleQuestionInsightPoints( question, answer, formFieldAnsGroup );
   
    store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );

    const answerId = answer?._id;

    if ( questionInsight ) {
        let questionInsightsObj = { ...questionInsight, answerId };

        handleAddingNewQuestionInsight( handleSavingQuestionInsights( store, answer, questionInsightsObj ), store, questionInsightsObj, answer );
    }
}

function updateCollection( answerField, formFieldAnsCollection, points ) {
    if ( answerField && formFieldAnsCollection.length > 0 ) {   
        let indexValue = formFieldAnsCollection?.findIndex(item => item?._id === answerField?._id );

        if ( typeof(indexValue) === 'number' && indexValue >= 0 ) {

            formFieldAnsCollection.splice(indexValue, 1, answerField );

        } else {

            formFieldAnsCollection = [ ...formFieldAnsCollection, { ...answerField, points } ];
        }
    }
    return formFieldAnsCollection;
}

export function handleQuestionInsightPoints( question, answer, formFieldAnsGroup ) {
   
    const operatorId = getItemFromSessionStorage('operator')?._id; // catch this

    let { questionId, formName, userId, formUuId, formType } = answer 

    let totalPointsReceived = getTotalPointsReceived( formFieldAnsGroup );

    let passed = [], failed = [];

    if ( totalPointsReceived === question?.pointsAssigned  ) {
        passed.push( userId );
    }

    if ( ( typeof(totalPointsReceived) !== 'number' || totalPointsReceived === 0 || totalPointsReceived !== question?.pointsAssigned ) ) {
        failed.push( userId );
    } 
    
    return {
        questionId,
        totalPointsReceived,
        passed: ( passed?.length > 0 ),
        fail: ( failed?.length > 0 ),
        outcomeId: question?.outcomeId,
        formName,
        userId, 
        formUuId,
        formType,
        operatorId
    };
}

export function handleSavingQuestionInsights( store, answer, questionInsightsObj ) {

    let { answerId, userId, questionId, formUuId } = answer;

    let existingQuestionInsight = Object.values(store.getState()?.studentQuestionInsights?.studentQuestionInsights)?.
        find(insight => insight?.userId === userId && insight.questionId === questionId && insight.formUuId === formUuId  );

    if ( existingQuestionInsight ) {
        store.dispatch( saveStudentQuestionInsight( {...existingQuestionInsight, ...questionInsightsObj  } ));
        store.dispatch(loadStudentQuestionInsights());
        return true;
    }
    return false;
}

export function handleAddingNewQuestionInsight( insight, store, questionInsight, answer ) {

    if ( insight ) return;
   
    store.dispatch( addNewStudentQuestionInsight( questionInsight ) );
    store.dispatch( loadStudentQuestionInsights() );
}

