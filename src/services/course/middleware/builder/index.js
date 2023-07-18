import { ADD_FORMFIELDANSWERS_SUCCESS, SAVE_FORMFIELDANSWERS_SUCCESS, SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_AFTER_MOVE, 
    ADD_ANSWER_POINTS, SAVE_DRAGGABLE_ANSWERS_SUCCESS } from 'services/course/actions/formfieldanswers';
import { ADD_FORMBUILDER_SUCCESS, SAVE_FORMBUILDER_SUCCESS, HANDLE_FORMBUILDER_SUCCESS } from 'services/course/actions/formbuilders';
import { SAVE_FORMFIELDS_SUCCESS_MW, SET_FORMFIELDS_MARKDOWN } from 'services/course/actions/formfields';
import { SAVE_FORMFIELDS_POINTS_SUCCESS_MW } from 'services/course/actions/formfields';
import { BUILD_QUESTION_INSIGHTS } from 'services/course/actions/outcomeInsights';
import { assignPointsToQuestionForCorrectAnswer, handleFormFieldPoints } from 'services/course/middleware/builder/formFields/points';
import { assignPointsToQuestionForDraggableFormFieldAnswers } from 'services/course/middleware/builder/formFields/assignPointsToQuestionForDraggableFormFieldAnswers';
import { redirectToFormAfterAddingNewFormBuilder } from 'services/course/middleware/builder/formFields/forms';
import { updateFormFields, updateFormFieldsMarkDown } from 'services/course/middleware/builder/formFields/fields';
import { ADD_ONLINEQUESTION_SUCCESS, DELETE_QUESTION_SUCCESS, DELETE_ONLINE_QUESTION_ELEMENTS, ADD_NEW_QUESTION_FROM_EXISTING_SUCCESS } from 'services/course/actions/onlinequestions';
import { deleteQuestionIdFromOutcomeLink } from 'services/course/middleware/builder/outcomes';
import { addNewExplainerAnswer, getFormFieldsToDelete, rePositionFormQuestionsOnDelete, deleteExplainerAnswerOnQuestionDelete } from 'services/course/middleware/builder/questions';
import { buildQuestionInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights';
import { buildNewFormFieldsFromExisting } from 'services/course/middleware/builder/formFields/buildNewFormFieldsFromExisting';
import { buildDraggableFormFieldInsights } from 'services/course/middleware/builder/formFields/fields/questionInsights/buildDraggableFormFieldInsights';
import { handleSettingQuestionProperties } from 'services/course/middleware/builder/formFields/forms/helper';
import { getFormBuilderToDelete } from 'services/course/middleware/builder/helpers';
import { getFormFieldPointsToDelete } from 'services/course/middleware/builder/formFields/points/handleDelete';
import { getFormFieldAnswersToDelete } from 'services/course/middleware/builder/formFields/answers';
import { unAnsweredQuestions } from 'services/course/middleware/builder/formFields/fields/questionInsights/unAnsweredQuestions';
import buildInsights from 'services/course/middleware/builder/formFields/fields/questionInsights/buildInsights';

export const builder = store => next =>  action => {
    switch(action.type){
        case ADD_ANSWER_POINTS:  
            assignPointsToQuestionForCorrectAnswer( store, action.payload );  
            next(action);
        return;
        case ADD_FORMFIELDANSWERS_SUCCESS: 
        case SAVE_FORMFIELDANSWERS_SUCCESS:   
            assignPointsToQuestionForCorrectAnswer( store, action.payload ); 
            buildQuestionInsights( store, action.payload );
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
            handleSettingQuestionProperties( store, action.type, action.payload  );
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
        case BUILD_QUESTION_INSIGHTS:
            buildInsights( store, action.payload );
            next(action);
        return;
        case HANDLE_FORMBUILDER_SUCCESS: 
            getFormFieldPointsToDelete( store, action.payload ); 
            getFormFieldAnswersToDelete( store, action.payload );
            getFormBuilderToDelete( store, action.payload );
            next(action);
        return;
        case ADD_NEW_QUESTION_FROM_EXISTING_SUCCESS: 
            buildNewFormFieldsFromExisting( store, action.payload ); 
            next(action);
        return;
            default:
            next(action);
        return;
    };
};
