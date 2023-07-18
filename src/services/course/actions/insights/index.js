import { add, update, remove, get, getById, getPagedData } from 'services/course/api';

export const ADD_INSIGHT_BEGIN = "ADD INSIGHT BEGIN";
export const ADD_INSIGHT_SUCCESS = "ADD INSIGHT SUCCESS";
export const ADD_INSIGHT_SUCCESS_NO_REDIRECT = "ADD INSIGHT SUCCESS NO REDIRECT";
export const ADD_INSIGHT_ERROR = "ADD INSIGHT ERROR";
export const LOAD_INSIGHT_BEGIN = "LOAD INSIGHT BEGIN";
export const LOAD_INSIGHT_SUCCESS = "LOAD INSIGHT SUCCESS";
export const LOAD_INSIGHT_ERROR = "LOAD INSIGHT ERROR";
export const DELETE_INSIGHT_BEGIN = "DELETE INSIGHT BEGIN";
export const DELETE_INSIGHT_ERROR = "DELETE INSIGHT ERROR";
export const DELETE_INSIGHT_SUCCESS = "DELETE INSIGHT SUCCESS";
export const SAVE_INSIGHT_BEGIN = "SAVE INSIGHT BEGIN";
export const SAVE_INSIGHT_ERROR = "SAVE INSIGHT ERROR";
export const SAVE_INSIGHT_SUCCESS = "SAVE INSIGHT SUCCESS";
export const SAVE_INSIGHT_SUCCESS_NO_REDIRECT = "SAVE INSIGHT SUCCESS NO REDIRECT";
export const TOGGLE_INSIGHT_MODAL = "TOGGLE INSIGHT MODAL";
export const TOGGLE_MAX_DIALOG = "TOGGLE MAX DIALOG";
export const TOGGLE_MAX_FIELD_DIALOG = "TOGGLE MAX FIELD DIALOG";
   
export const addNewInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: ADD_INSIGHT_BEGIN });
        return add( insights, '/insights')
        .then(insights => {
            dispatch({ type: ADD_INSIGHT_SUCCESS, payload: insights });
        }).catch( error => {
            dispatch({ type: ADD_INSIGHT_ERROR , error });
        });
    };
};

export const saveInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: SAVE_INSIGHT_BEGIN });
        return update( insights, `/insights/` )
            .then( insights => {  
             dispatch({ type: SAVE_INSIGHT_SUCCESS, payload: insights }); 
            }).catch( error => {
            dispatch({ type: SAVE_INSIGHT_ERROR , error });
        });  
    };
 };

export const loadInsights = () => {
    return dispatch => {
        dispatch({ type: LOAD_INSIGHT_BEGIN });
        return get(`/insights`)
          .then( insights  => { 
             dispatch({ type: LOAD_INSIGHT_SUCCESS, payload: insights }); 
           }).catch( error => {
            dispatch({ type: LOAD_INSIGHT_ERROR , error });
        });       
    };
  };

export const loadInsightByInsightId = ( insightsId ) => {
    return dispatch => {
         dispatch({ type: LOAD_INSIGHT_BEGIN });
         return getById( insightsId, `/insights/builder?insightsId=`)
          .then( insights  => { 
                dispatch({ type: LOAD_INSIGHT_SUCCESS, payload: insights });
           }).catch( error => {
                dispatch({ type: LOAD_INSIGHT_ERROR , error });
           });       
    };
};

export const loadInsightByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_INSIGHT_BEGIN });
         return getById( userId, `/insights/user?userId=`)
          .then( insights  => { 
                dispatch({ type: LOAD_INSIGHT_SUCCESS, payload: insights });
           }).catch( error => {
                dispatch({ type: LOAD_INSIGHT_ERROR , error });
        });       
    };
};

export const loadPagedInsights = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/insights/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_INSIGHT_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_INSIGHT_ERROR , error });
            return error;
        });
    };
};

export const deleteInsight = insights => {
    return dispatch => {
        dispatch({ type: DELETE_INSIGHT_BEGIN });
            return remove( insights, `/insights/` )
            .then( (response ) => {
                dispatch({ type: DELETE_INSIGHT_SUCCESS, payload: insights });
            }).catch( error => {
            dispatch({ type: DELETE_INSIGHT_ERROR , error });
        });
    };
};

export const toggleNewFormBuilderModal = () => ({
    type: TOGGLE_INSIGHT_MODAL
});

export const setIsMaxDialogOpen = ( isMaxDialogOpen ) => ({
    type: TOGGLE_MAX_DIALOG, payload: isMaxDialogOpen
});

export const setIsMaxFieldDialogOpen = ( isMaxFieldDialogOpen ) => ({
    type: TOGGLE_MAX_FIELD_DIALOG, payload: isMaxFieldDialogOpen
});

