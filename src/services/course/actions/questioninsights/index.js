import { add, update, remove, get, getById, getPagedData } from 'services/course/api';

export const ADD_QUESTION_INSIGHT_BEGIN = "ADD QUESTION INSIGHT BEGIN";
export const ADD_QUESTION_INSIGHT_SUCCESS = "ADD QUESTION INSIGHT SUCCESS";
export const ADD_QUESTION_INSIGHT_SUCCESS_NO_REDIRECT = "ADD QUESTION INSIGHT SUCCESS NO REDIRECT";
export const ADD_QUESTION_INSIGHT_ERROR = "ADD QUESTION INSIGHT ERROR";
export const LOAD_QUESTION_INSIGHT_BEGIN = "LOAD QUESTION INSIGHT BEGIN";
export const LOAD_QUESTION_INSIGHT_SUCCESS = "LOAD QUESTION INSIGHT SUCCESS";
export const LOAD_SINGLE_QUESTION_INSIGHT_SUCCESS = "LOAD SINGLE QUESTION INSIGHT SUCCESS";
export const LOAD_QUESTION_INSIGHT_ERROR = "LOAD QUESTION INSIGHT ERROR";
export const DELETE_QUESTION_INSIGHT_BEGIN = "DELETE QUESTION INSIGHT BEGIN";
export const DELETE_QUESTION_INSIGHT_ERROR = "DELETE QUESTION INSIGHT ERROR";
export const DELETE_QUESTION_INSIGHT_SUCCESS = "DELETE QUESTION INSIGHT SUCCESS";
export const SAVE_QUESTION_INSIGHT_BEGIN = "SAVE QUESTION INSIGHT BEGIN";
export const SAVE_QUESTION_INSIGHT_ERROR = "SAVE QUESTION INSIGHT ERROR";
export const SAVE_QUESTION_INSIGHT_SUCCESS = "SAVE QUESTION INSIGHT SUCCESS";
export const SAVE_QUESTION_INSIGHT_SUCCESS_NO_REDIRECT = "SAVE QUESTION INSIGHT SUCCESS NO REDIRECT";
export const TOGGLE_QUESTION_INSIGHT_MODAL = "TOGGLE QUESTION INSIGHT MODAL";
export const TOGGLE_MAX_QUESTION_DIALOG = "TOGGLE MAX QUESTION DIALOG";
export const TOGGLE_MAX_FIELD_DIALOG = "TOGGLE MAX FIELD DIALOG";
   
export const addNewQuestionInsight = ( insights ) => {
    alert('addNewQuestionInsight')
    alert(JSON.stringify(insights))
    return dispatch => {
        dispatch({ type: ADD_QUESTION_INSIGHT_BEGIN });
        return add( insights, '/questioninsights')
        .then(insights => {
            // dispatch({ type: LOAD_SINGLE_QUESTION_INSIGHT_SUCCESS, payload: insights }); 
            dispatch({ type: ADD_QUESTION_INSIGHT_SUCCESS, payload: insights });
        }).catch( error => {
            dispatch({ type: ADD_QUESTION_INSIGHT_ERROR , error });
        });
    };
};

export const saveQuestionInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: SAVE_QUESTION_INSIGHT_BEGIN });
        return update( insights, `/questioninsights/` )
            .then( insights => {  
             dispatch({ type: SAVE_QUESTION_INSIGHT_SUCCESS, payload: insights }); 
            }).catch( error => {
            dispatch({ type: SAVE_QUESTION_INSIGHT_ERROR , error });
        });  
    };
 };

export const loadQuestionInsights = () => {
    return dispatch => {
        dispatch({ type: LOAD_QUESTION_INSIGHT_BEGIN });
        return get(`/questioninsights`)
          .then( insights  => { 
             dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: insights }); 
           }).catch( error => {
            dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
        });       
    };
  };

export const loadQuestionInsightByQuestionInsightId = ( questionInsightsId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTION_INSIGHT_BEGIN });
         return getById( questionInsightsId, `/questioninsights/builder?questionInsightsId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadQuestionInsightByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTION_INSIGHT_BEGIN });
         return getById( questionId, `/questioninsights/question?questionId=`)
          .then( insight  => { 
                dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: insight });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadQuestionInsightByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTION_INSIGHT_BEGIN });
         return getById( answerId, `/questioninsights/answer?answerId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadQuestionInsightByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_QUESTION_INSIGHT_BEGIN });
         return getById( userId, `/questioninsights/user?userId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
        });       
    };
};

export const loadPagedQuestionInsights = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/questioninsights/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_QUESTION_INSIGHT_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_QUESTION_INSIGHT_ERROR , error });
            return error;
        });
    };
};

export const deleteQuestionInsight = insights => {
    return dispatch => {
        dispatch({ type: DELETE_QUESTION_INSIGHT_BEGIN });
            return remove( insights, `/questioninsights/` )
            .then( (response ) => {
                dispatch({ type: DELETE_QUESTION_INSIGHT_SUCCESS, payload: insights });
            }).catch( error => {
            dispatch({ type: DELETE_QUESTION_INSIGHT_ERROR , error });
        });
    };
};

export const toggleNewFormBuilderModal = () => ({
    type: TOGGLE_QUESTION_INSIGHT_MODAL
});

export const setIsMaxQuestionDialogOpen = ( isMaxQuestionDialogOpen ) => ({
    type: TOGGLE_MAX_QUESTION_DIALOG, payload: isMaxQuestionDialogOpen
});

export const setIsMaxFieldDialogOpen = ( isMaxFieldDialogOpen ) => ({
    type: TOGGLE_MAX_FIELD_DIALOG, payload: isMaxFieldDialogOpen
});

