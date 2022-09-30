import { ADD_FORMFIELDANSWERS_SUCCESS, SAVE_FORMFIELDANSWERS_SUCCESS, SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_AFTER_MOVE, 
    ADD_ANSWER_POINTS, SAVE_DRAGGABLE_ANSWERS_SUCCESS, ADD_UNANSWERED_QUESTIONS } from 'services/course/actions/formfieldanswers';
import { ADD_FORMBUILDER_SUCCESS, SAVE_FORMBUILDER_SUCCESS } from 'services/course/actions/formbuilders';
import { SAVE_FORMFIELDS_SUCCESS_MW, SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';
import { ADD_MISSED_ANSWERS_SUCCESS } from 'services/course/actions/missedanswers';
import { SAVE_FORMFIELDS_POINTS_SUCCESS_MW } from 'services/course/actions/formfields';
import { assignPointsToQuestionForCorrectAnswer, handleFormFieldPoints } from 'services/course/middleware/builder/formFields/points';
import { assignPointsToQuestionForDraggableFormFieldAnswers } from 'services/course/middleware/builder/formFields/assignPointsToQuestionForDraggableFormFieldAnswers';
import { getMissedAnswers } from 'services/course/middleware/builder/formFields/missedAnswers';
import { redirectToFormAfterAddingNewFormBuilder } from 'services/course/middleware/builder/formFields/forms';
import { updateFormFields, updateFormFieldsMarkDown } from 'services/course/middleware/builder/formFields/fields';
import { ADD_ONLINEQUESTION_SUCCESS, DELETE_QUESTION_SUCCESS, DELETE_ONLINE_QUESTION_ELEMENTS, setSelectedOnlineQuestion } from 'services/course/actions/onlinequestions';
import { deleteQuestionIdFromOutcomeLink } from 'services/course/middleware/builder/outcomes';
import { addNewExplainerAnswer, getFormFieldsToDelete, rePositionFormQuestionsOnDelete, deleteExplainerAnswerOnQuestionDelete } from 'services/course/middleware/builder/questions';
import { buildQuestionInsights } from 'services/course/middleware/builder/formFields/questionInsights';
import { buildDraggableFormFieldInsights } from 'services/course/middleware/builder/formFields/questionInsights/buildDraggableFormFieldInsights';
import { buildEssayAnswerFormFieldInsights } from 'services/course/middleware/builder/formFields/questionInsights/buildEssayAnswerFormFieldInsights';
import { inputType } from 'services/course/pages/QuestionsPage/helpers';

export const builder = store => next =>  action => {
    switch(action.type){
        case ADD_ANSWER_POINTS:  
            assignPointsToQuestionForCorrectAnswer( store, action.payload );  
            next(action);
        return;
        case ADD_FORMFIELDANSWERS_SUCCESS: 
        case SAVE_FORMFIELDANSWERS_SUCCESS:   
            assignPointsToQuestionForCorrectAnswer( store, action.payload ); 
            if ( action.payload?.inputType === inputType.ExplanationAnswerEditor ) {
                buildEssayAnswerFormFieldInsights( store, action.payload );
                return;
            }
            if ( action.payload?.inputType !== inputType.DraggableListItem ){
                buildQuestionInsights( store, action.payload );
            }
            next(action);
        return;
        case SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_AFTER_MOVE:  
            assignPointsToQuestionForDraggableFormFieldAnswers( store, action.payload?.answerFormInputField, action.payload );  
            next(action);
        return;
        case SAVE_DRAGGABLE_ANSWERS_SUCCESS:  
            buildDraggableFormFieldInsights( store, action.payload );
            next(action);
        return;
        case ADD_FORMBUILDER_SUCCESS:  
        case SAVE_FORMBUILDER_SUCCESS:
            redirectToFormAfterAddingNewFormBuilder( store, action.type, action.payload  );  
            next(action);
        return;
        case SAVE_FORMFIELDS_SUCCESS_MW:
            updateFormFields( store, action.payload  );  
            next(action);
        return;
        case SET_FORMFIELDS_MARKDOWN:
            updateFormFieldsMarkDown( store, action.payload  );  
            next(action);
        return;
        case ADD_MISSED_ANSWERS_SUCCESS:
            getMissedAnswers( store, action.payload  );  
            next(action);
        return;
        case ADD_ONLINEQUESTION_SUCCESS:
            addNewExplainerAnswer( store, action.payload ); 
            next(action);
        return;
        case DELETE_QUESTION_SUCCESS:
            alert('DELETE_QUESTION_SUCCESS')
            next(action);
        return;
        case DELETE_ONLINE_QUESTION_ELEMENTS: 
            deleteExplainerAnswerOnQuestionDelete( store, action.payload );
            getFormFieldsToDelete( store, action.payload );
            deleteQuestionIdFromOutcomeLink( store, action.payload ); 
            rePositionFormQuestionsOnDelete( store, action.payload );
            next(action);
        return;
        case SAVE_FORMFIELDS_POINTS_SUCCESS_MW:
            handleFormFieldPoints( store, action.payload  );  
            next(action);
        return;
        case ADD_UNANSWERED_QUESTIONS:
            handleFormFieldPoints( store, action.payload  );  
            next(action);
        return;
            default:
            next(action);
        return;

    };
};
