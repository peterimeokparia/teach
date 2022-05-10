import produce from 'immer';

import { 
SAVE_MISSED_ANSWERS_SUCCESS } from 'services/course/actions/missedanswers';

const initialState = {
    missedQuestions: [],
    missedQuestionIds: [],
    leftUnAnsweredFormFields: [],
    leftUnAnsweredQuestions: [], 
    unAnswerdQuestionIds: [],
    answerFieldId: null,
    answerFormType: null, 
    answerFormName: null,
    answerFormUuId: null,
    answerFormUserId: null
};

const reducer = produce((draft, action) => {
    switch(action.type){
        case SAVE_MISSED_ANSWERS_SUCCESS:
          draft.missedQuestions = action?.payload?.missedQuestions;
          draft.missedQuestionIds = action?.payload?.missedQuestionIds;
          draft.leftUnAnsweredFormFields = action?.payload?.leftUnAnsweredFormFields;
          draft.leftUnAnsweredQuestions = action?.payload?.leftUnAnsweredQuestions;
          draft.unAnswerdQuestionIds = action?.payload?.unAnswerdQuestionIds;
          draft.answerFieldId = action?.payload?.answerFieldId;
          draft.answerFormType = action?.payload?.answerFormType;
          draft.answerFormName = action?.payload?.answerFormName;
          draft.answerFormUuId= action?.payload?.answerFormUuId;
          draft.answerFormUserId= action?.payload?.answerFormUserId
        return;
       default:
     return;
    }
}, initialState);

export default reducer;