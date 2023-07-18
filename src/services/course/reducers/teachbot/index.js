import produce from 'immer';

import { 
SAVE_LESSON_INSIGHTS_PROPS 
} from 'services/course/actions/teachbot';

const initialState = {
    lessonInsightsBotProps: {}
};

const reducer = produce((draft, action) => {
    switch(action.type){
        case SAVE_LESSON_INSIGHTS_PROPS:    
            draft.lessonInsightsBotProps  = action.payload; 
        return;
     default:
          
    }
}, initialState);

export default reducer;
