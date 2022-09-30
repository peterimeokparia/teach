import { ADD_STUDENT_QUESTION_INSIGHT_SUCCESS, SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS }  from 'services/course/actions/studentQuestionInsights';
import { handleAddingOutcomeInsight } from 'services/course/middleware/outcomeInsight/helpers';

export const outcomeInsight = store => next =>  action => {
    switch(action.type){
        case ADD_STUDENT_QUESTION_INSIGHT_SUCCESS:
        case SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS:
            handleAddingOutcomeInsight( store, action.payload ); 
            next(action);
        return;
        default:
            next(action);
        return;
    };
};