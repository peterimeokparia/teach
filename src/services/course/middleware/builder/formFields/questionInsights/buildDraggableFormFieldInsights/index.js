import { loadFormFieldAnswersByQuestionId, loadFormFieldAnswers } from 'services/course/actions/formfieldanswers';
import { loadOnlineQuestionsByQuestionId } from 'services/course/actions/onlinequestions';
import { loadStudentQuestionInsights } from 'services/course/actions/studentQuestionInsights';
import { handleQuestionInsightPoints, handleAddingNewQuestionInsight, handleSavingQuestionInsights } from 'services/course/middleware/builder/formFields/questionInsights';

export function buildDraggableFormFieldInsights( store, payload ){
    let { answer, draggableListItems } = payload;

    store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswersByQuestionId( answer?.questionId ) );
    store.dispatch( loadFormFieldAnswers() );
    store.dispatch( loadStudentQuestionInsights() );


    const question = Object.values( store.getState()?.onlineQuestions?.onlineQuestions ).find(item => item?._id === answer?.questionId );
    
    let questionInsight = handleQuestionInsightPoints( question, answer, draggableListItems );

    store.dispatch( loadOnlineQuestionsByQuestionId( answer?.questionId ) );

    const answerId = answer?._id;

    if ( questionInsight ) {
        let questionInsightsObj = {...questionInsight, answerId };

        setTimeout(() => {

            handleAddingNewQuestionInsight( handleSavingQuestionInsights( store, answer, questionInsightsObj ), store, questionInsightsObj );

            store.dispatch( loadStudentQuestionInsights() );

        }, 10000 );
    }
}