import { add, get, remove, update, getById } from 'services/course/api';

export const ADD_NEW_OUTCOME_BEGIN = "ADD NEW OUTCOME BEGIN";
export const ADD_NEW_OUTCOME_SUCCESS = "ADD NEW OUTCOME SUCCESS";
export const ADD_NEW_OUTCOME_ERROR = "ADD NEW OUTCOME ERROR";
export const LOAD_OUTCOMES_BEGIN = "LOAD OUTCOMES BEGIN";
export const LOAD_OUTCOMES_SUCCESS = "LOAD OUTCOMES SUCCESS";
export const LOAD_OUTCOMES_ERROR = "LOAD OUTCOMES ERROR";
export const SAVE_OUTCOME_BEGIN = "SAVE OUTCOME BEGIN";
export const SAVE_OUTCOME_SUCCESS = "SAVE OUTCOME SUCCESS";
export const SAVE_OUTCOME_ERROR = "SAVE OUTCOME ERROR";
export const RESET_OUTCOME_ERROR = "RESET OUTCOME ERROR";
export const DELETE_OUTCOME_SUCCESS = "DELETE OUTCOME SUCCESS";
export const DELETE_OUTCOME_BEGIN = "DELETE OUTCOME BEGIN";
export const DELETE_OUTCOME_ERROR = "DELETE OUTCOME ERROR";
export const SET_OUTCOME_MARKDOWN = "SET OUTCOME MARKDOWN";
export const SET_OUTCOME_LINK = "SET OUTCOME LINK"; 
export const SET_SELECTED_OUTCOME = "SET SELECTED OUTCOME";
export const TOGGLE_CONCEPTS = "TOGGLE CONCEPTS";
export const TOGGLE_FURTHER_STUDY_MODAL = "TOGGLE FURTHER STUDY MODAL";
export const SET_CURRENT_OUTCOME = "SET CURRENT OUTCOME";

export const addNewOutcome = ( outcome ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_OUTCOME_BEGIN });
        return add(outcome, '/outcomes')  
        .then( resp => { 
            dispatch({ type: ADD_NEW_OUTCOME_SUCCESS, payload: resp }); 
            return resp;
        }).catch( error => {
            dispatch({ type: ADD_NEW_OUTCOME_ERROR , payload: { error, title: outcome?.title } });
        });
    };
};

export const saveOutcome = ( outcome ) => {
   return dispatch => {
        dispatch({ type: SAVE_OUTCOME_BEGIN });
        return update( outcome, `/outcomes/` )
            .then( resp => {  
                dispatch({        
                type: SAVE_OUTCOME_SUCCESS, payload: resp }); 
                return resp;
            }).catch( error => {
                dispatch({ type: SAVE_OUTCOME_ERROR , error });
        });  
   };
};

export const loadOutcomes = () => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOMES_BEGIN });
        return get('/outcomes')
            .then( resp => {
                dispatch({ type: LOAD_OUTCOMES_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOMES_ERROR , error });
        });
    };
};

export const loadOutcomeByOutcomeId = ( outcomeId ) => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOMES_BEGIN });
        return getById( outcomeId, `/outcomes?outcomeId=`)
            .then( resp => {
                dispatch({ type: LOAD_OUTCOMES_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOMES_ERROR , error });
        });
    };
};

export const loadOutcomesByType = ( type ) => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOMES_BEGIN });
        return getById( type, `/outcomes?type=`)
            .then( resp => {
                dispatch({ type: LOAD_OUTCOMES_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOMES_ERROR , error });
        });
    };
};

export const loadOutcomesByLessonId = ( lessonId ) => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOMES_BEGIN });
        return getById( lessonId, `/outcomes?lessonId=`)
            .then( resp => {
                dispatch({ type: LOAD_OUTCOMES_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOMES_ERROR , error });
        });
    };
};

export const loadOutcomesByParentId = ( parentId ) => {
    return dispatch => {
        dispatch({ type: LOAD_OUTCOMES_BEGIN });
        return getById( parentId, `/outcomes?parentId=`)
            .then( resp => {
                dispatch({ type: LOAD_OUTCOMES_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_OUTCOMES_ERROR , error });
        });
    };
};

export const deleteOutcome = outcome => {
    return dispatch => {
        dispatch({ type: DELETE_OUTCOME_BEGIN });
         return remove( outcome, `/outcomes/` ) 
         .then( () => {
             dispatch({ type: DELETE_OUTCOME_SUCCESS, payload: outcome });
         }).catch( error => {
            dispatch({ type: DELETE_OUTCOME_ERROR , error  });
        });
    };
};

export const setCurrentOutcome = outcome => ({ 
    type: SET_CURRENT_OUTCOME, payload: outcome  
});

export const setOutcomeLink = outcomeLink => ({ 
     type: SET_OUTCOME_LINK, payload: outcomeLink  
});

export const toggleOutComeFurtherStudyModal = () => ({
    type: TOGGLE_FURTHER_STUDY_MODAL
});

export const setSelectedOutcome = outcome => ({ 
    type: SET_SELECTED_OUTCOME, payload: outcome  
});

export const toggleConcepts = () => ({
    type: TOGGLE_CONCEPTS
});