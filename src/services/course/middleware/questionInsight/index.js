import { ADD_STUDENT_QUESTION_INSIGHT_SUCCESS, SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS }  from 'services/course/actions/studentQuestionInsights';
import { handleAddingQuestionInsight } from 'services/course/middleware/questionInsight/helpers';

export const questionInsight = store => next =>  action => {
    switch(action.type){
        case ADD_STUDENT_QUESTION_INSIGHT_SUCCESS:
        case SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS:
            handleAddingQuestionInsight( store, action.payload ); 
            next(action);
        return;
        default:
            next(action);
        return;
    };
};