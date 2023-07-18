import { ADD_ONLINEQUESTION_MW, DELETE_ONLINEQUESTION_MW, GO_TO_SELECTED_ONLINEQUESTION } from 'services/course/actions/onlinequestions';
import { addNewQuestion, goToSelectedQuestion } from 'services/course/middleware/onlineQuestions/handleQuestions';
import { deleteQuestion } from 'services/course/middleware/onlineQuestions/handleDeleteQuestions';

export const onlineQuestions = store => next =>  action => {
    switch(action.type){
        case ADD_ONLINEQUESTION_MW:
            addNewQuestion( store, action.payload );
            next(action);
        return;
        case DELETE_ONLINEQUESTION_MW: 
            deleteQuestion( store, action.payload ); 
            next(action);
        return;
        case GO_TO_SELECTED_ONLINEQUESTION: 
            goToSelectedQuestion( store, action.payload ); 
            next(action);
        return;
            default:
            next(action);
        return;

    };
};
