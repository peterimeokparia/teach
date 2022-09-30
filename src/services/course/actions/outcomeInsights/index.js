import { add, update, remove, get, getById, getPagedData } from 'services/course/api';

export const ADD_OUTCOME_INSIGHT_BEGIN = "ADD OUTCOME INSIGHT BEGIN";
export const ADD_OUTCOME_INSIGHT_SUCCESS = "ADD OUTCOME INSIGHT SUCCESS";
export const ADD_OUTCOME_INSIGHT_SUCCESS_NO_REDIRECT = "ADD OUTCOME INSIGHT SUCCESS NO REDIRECT";
export const ADD_OUTCOME_INSIGHT_ERROR = "ADD OUTCOME INSIGHT ERROR";
export const LOAD_OUTCOME_INSIGHT_BEGIN = "LOAD OUTCOME INSIGHT BEGIN";
export const LOAD_OUTCOME_INSIGHT_SUCCESS = "LOAD OUTCOME INSIGHT SUCCESS";
export const LOAD_OUTCOME_INSIGHT_ERROR = "LOAD OUTCOME INSIGHT ERROR";
export const DELETE_OUTCOME_INSIGHT_BEGIN = "DELETE OUTCOME INSIGHT BEGIN";
export const DELETE_OUTCOME_INSIGHT_ERROR = "DELETE OUTCOME INSIGHT ERROR";
export const DELETE_OUTCOME_INSIGHT_SUCCESS = "DELETE OUTCOME INSIGHT SUCCESS";
export const SAVE_OUTCOME_INSIGHT_BEGIN = "SAVE OUTCOME INSIGHT BEGIN";
export const SAVE_OUTCOME_INSIGHT_ERROR = "SAVE OUTCOME INSIGHT ERROR";
export const SAVE_OUTCOME_INSIGHT_SUCCESS = "SAVE OUTCOME INSIGHT SUCCESS";
export const SAVE_OUTCOME_INSIGHT_SUCCESS_NO_REDIRECT = "SAVE OUTCOME INSIGHT SUCCESS NO REDIRECT";
export const TOGGLE_OUTCOME_INSIGHT_MODAL = "TOGGLE OUTCOME INSIGHT MODAL";
export const TOGGLE_MAX_OUTCOME_DIALOG = "TOGGLE MAX OUTCOME DIALOG";
export const TOGGLE_MAX_FIELD_DIALOG = "TOGGLE MAX FIELD DIALOG";
   
export const addNewOutcomeInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: ADD_OUTCOME_INSIGHT_BEGIN });
        return add( insights, '/outcomeinsights')
        .then(insight => {
            dispatch({ type: ADD_OUTCOME_INSIGHT_SUCCESS, payload: insight });
        }).catch( error => {
            dispatch({ type: ADD_OUTCOME_INSIGHT_ERROR , error });
        });
    };
};

export const saveOutcomeInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: SAVE_OUTCOME_INSIGHT_BEGIN });
        return update( insights, `/outcomeinsights/` )
            .then( insight => {  
             dispatch({ type: SAVE_OUTCOME_INSIGHT_SUCCESS, payload: insight }); 
            }).catch( error => {
            dispatch({ type: SAVE_OUTCOME_INSIGHT_ERROR , error });
        });  
    };
 };

export const loadOutcomeInsights = () => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOME_INSIGHT_BEGIN });
        return get(`/outcomeinsights`)
          .then( insights  => { 
             dispatch({ type: LOAD_OUTCOME_INSIGHT_SUCCESS, payload: insights }); 
           }).catch( error => {
            dispatch({ type: LOAD_OUTCOME_INSIGHT_ERROR , error });
        });       
    };
  };

export const loadOutcomeInsightByOutcomeInsightId = ( insights ) => {
    return dispatch => {
         dispatch({ type: LOAD_OUTCOME_INSIGHT_BEGIN });
         return getById( insights, `/outcomeinsights/builder?outcomeInsightsId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_OUTCOME_INSIGHT_ERROR , error });
           });       
    };
};

export const loadOutcomeInsightByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_OUTCOME_INSIGHT_BEGIN });
         return getById( answerId, `/outcomeinsights/answer?answerId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_OUTCOME_INSIGHT_ERROR , error });
           });       
    };
};

export const loadOutcomeInsightByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_OUTCOME_INSIGHT_BEGIN });
         return getById( userId, `/outcomeinsights/user?userId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_OUTCOME_INSIGHT_ERROR , error });
        });       
    };
};

export const loadPagedOutcomeInsights = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/outcomeinsights/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_OUTCOME_INSIGHT_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_OUTCOME_INSIGHT_ERROR , error });
            return error;
        });
    };
};

export const deleteOutcomeInsight = insights => {
    return dispatch => {
        dispatch({ type: DELETE_OUTCOME_INSIGHT_BEGIN });
            return remove( insights, `/outcomeinsights/` )
            .then( (response ) => {
                dispatch({ type: DELETE_OUTCOME_INSIGHT_SUCCESS, payload: insights });
            }).catch( error => {
            dispatch({ type: DELETE_OUTCOME_INSIGHT_ERROR , error });
        });
    };
};

export const toggleNewFormBuilderModal = () => ({
    type: TOGGLE_OUTCOME_INSIGHT_MODAL
});

export const setIsMaxOutcomeDialogOpen = ( isMaxQuestionDialogOpen ) => ({
    type: TOGGLE_MAX_OUTCOME_DIALOG, payload: isMaxQuestionDialogOpen
});

export const setIsMaxFieldDialogOpen = ( isMaxFieldDialogOpen ) => ({
    type: TOGGLE_MAX_FIELD_DIALOG, payload: isMaxFieldDialogOpen
});

