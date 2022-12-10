import { getTotalPointsReceived } from 'services/course/middleware/questionInsight/helpers';
import { loadFormFieldAnswersByQuestionId, loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { addNewStudentQuestionInsight, saveStudentQuestionInsight, loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights';
import { getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';
import handleCheckBox from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes/handleCheckBox';
import handleExplanationAnswerEditor from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes/handleExplanationAnswerEditor';
import handleRadioButton from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes/handleRadioButton';
import handleDropDown from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes/handleDropDown';
import handleDraggable from 'services/course/middleware/builder/formFields/fields/questionInsights/handleInputTypes/handleDraggable';

export function buildQuestionInsights( store, answer ){
    if ( !answer ) return;

    if ( answer?.inputType === inputType.RadioButton && !answer?.selected ) return;
    if ( answer?.inputType === inputType.DraggableListItem ) return;
    
    store.dispatch( loadStudentQuestionInsights() );
    store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswersByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswers() );

    let formFieldAnsGroup = Object?.values( store?.getState().formFieldAnswers?.formFieldAnswers )?.filter( ans => ans?.userId === answer?.userId 
        && ans?.formUuId === answer?.formUuId && ans?.formName === answer?.formName && ans?.formFieldGroupId === answer?.formFieldGroupId );

    let formField = Object?.values( store?.getState().formFields?.formFields )?.find( ans => ans?.formName === answer?.formName && ans?._id === answer?.fieldId );

    const points = formField?.points;

    alert('answer question items')
    alert(JSON.stringify(answer))
    alert(JSON.stringify(answer?.questionId))

    const question = Object.values( store.getState()?.onlineQuestions?.onlineQuestions ).find(item => item?._id === answer?.questionId );

    alert('questionquestion question items')
    alert(JSON.stringify(question))


    let props = { answer, formFieldAnsGroup, store, question, points };

    // handleDraggable( props );
    handleRadioButton( props );
    handleCheckBox( props );
    handleExplanationAnswerEditor( props );
    handleDropDown( props ); 
}

export function getQuestionInsights( answerGroup, props ) {
    let { answer, store, question } = props;

    if ( answerGroup && answerGroup?.length > 0  ) {

        let questionInsight = handleQuestionInsightPoints( question, answer, answerGroup );
   
        store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );

        const answerId = answer?._id;

        if ( questionInsight ) {

            let questionInsightsObj = { ...questionInsight, answerId };

            handleAddingNewQuestionInsight( handleSavingQuestionInsights( store, answer, questionInsightsObj ), store, questionInsightsObj, answer );
        }
    }
}

export function handleQuestionInsightPoints( question, answer, formFieldAnsGroup ) {
    if ( formFieldAnsGroup?.length === 0 ) return;

    let { questionId, formName, userId, formUuId, formType } = answer 
    
    let totalPointsReceived = getTotalPointsReceived( formFieldAnsGroup, answer );
    let operatorId = getItemFromSessionStorage('operator')?._id;
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
        unanswered: false,
        outcomeId: question?.outcomeId,
        formName,
        userId, 
        formUuId,
        formType,
        operatorId
    };
}

export function handleSavingQuestionInsights( store, answer, questionInsightsObj ) {
    let { userId, questionId, formUuId } = answer;

    let existingQuestionInsight = Object.values(store.getState()?.studentQuestionInsights?.studentQuestionInsights)?.
        find( insight => insight?.userId === userId && insight.questionId === questionId && insight.formUuId === formUuId  );

    if ( existingQuestionInsight ) {
        // alert('handleSavingQuestionInsights')
        // alert(JSON.stringify(existingQuestionInsight))

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

