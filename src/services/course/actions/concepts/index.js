import { add, get, remove, update, getById } from 'services/course/api';

export const ADD_NEW_CONCEPT_BEGIN = "ADD NEW CONCEPT BEGIN";
export const ADD_NEW_CONCEPT_SUCCESS = "ADD NEW CONCEPT SUCCESS";
export const ADD_NEW_CONCEPT_ERROR = "ADD NEW CONCEPT ERROR";
export const LOAD_CONCEPTS_BEGIN = "LOAD CONCEPTS BEGIN";
export const LOAD_CONCEPTS_SUCCESS = "LOAD CONCEPTS SUCCESS";
export const LOAD_CONCEPTS_ERROR = "LOAD CONCEPTS ERROR";
export const SAVE_CONCEPT_BEGIN = "SAVE CONCEPT BEGIN";
export const SAVE_CONCEPT_SUCCESS = "SAVE CONCEPT SUCCESS";
export const SAVE_CONCEPT_ERROR = "SAVE CONCEPT ERROR";
export const RESET_CONCEPT_ERROR = "RESET CONCEPT ERROR";
export const DELETE_CONCEPT_SUCCESS = "DELETE CONCEPT SUCCESS";
export const DELETE_CONCEPT_BEGIN = "DELETE CONCEPT BEGIN";
export const DELETE_CONCEPT_ERROR = "DELETE CONCEPT ERROR";
export const SET_CONCEPT_MARKDOWN = "SET CONCEPT MARKDOWN";
export const SET_CONCEPT_LINK = "SET CONCEPT LINK"; 
export const SET_SELECTED_CONCEPT = "SET SELECTED CONCEPT";
export const TOGGLE_CONCEPTS = "TOGGLE CONCEPTS";
export const TOGGLE_CONCEPT_MODAL = "TOGGLE CONCEPT MODAL";
export const SET_CURRENT_CONCEPT = "SET CURRENT CONCEPT";

export const addNewConcept = ( concept ) => {
    return dispatch => {
        dispatch({ type: ADD_NEW_CONCEPT_BEGIN });
        return add(concept, '/concept')  
        .then( resp => { 
            dispatch({ type: ADD_NEW_CONCEPT_SUCCESS, payload: resp }); 
            return resp;
        }).catch( error => {
            dispatch({ type: ADD_NEW_CONCEPT_ERROR , payload: { error, title: concept?.title } });
        });
    };
};

export const saveConcept = ( concept ) => {
   return dispatch => {
        dispatch({ type: SAVE_CONCEPT_BEGIN });
        return update( concept, `/concept/` )
            .then( resp => {  
                dispatch({        
                type: SAVE_CONCEPT_SUCCESS, payload: resp }); 
                return resp;
            }).catch( error => {
                dispatch({ type: SAVE_CONCEPT_ERROR , error });
        });  
   };
};

export const loadConcepts = () => {
    return dispatch => {
        dispatch({ type: LOAD_CONCEPTS_BEGIN });
        return get('/concept')
            .then( resp => {
                dispatch({ type: LOAD_CONCEPTS_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_CONCEPTS_ERROR , error });
        });
    };
};

export const loadConceptByConceptId = ( conceptId ) => {
    return dispatch => {
        dispatch({ type: LOAD_CONCEPTS_BEGIN });
        return getById( conceptId, `/concept?conceptId=`)
            .then( resp => {
                dispatch({ type: LOAD_CONCEPTS_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_CONCEPTS_ERROR , error });
        });
    };
};

export const loadConceptsByType = ( type ) => {
    return dispatch => {
        dispatch({ type: LOAD_CONCEPTS_BEGIN });
        return getById( type, `/concept?type=`)
            .then( resp => {
                dispatch({ type: LOAD_CONCEPTS_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_CONCEPTS_ERROR , error });
        });
    };
};

export const loadConceptsByCourseId = ( courseId ) => {
    return dispatch => {
        dispatch({ type: LOAD_CONCEPTS_BEGIN });
        return getById( courseId, `/concept?courseId=`)
            .then( resp => {
                dispatch({ type: LOAD_CONCEPTS_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_CONCEPTS_ERROR , error });
        });
    };
};

export const loadConceptsBylessonOutcomeId = ( lessonOutcomeId ) => {
    return dispatch => {
        dispatch({ type: LOAD_CONCEPTS_BEGIN });
        return getById( lessonOutcomeId, `/concept?lessonOutcomeId=`)
            .then( resp => {
                dispatch({ type: LOAD_CONCEPTS_SUCCESS, payload: resp });
                return resp;
            })
            .catch( error => {
                dispatch({ type: LOAD_CONCEPTS_ERROR , error });
        });
    };
};

export const deleteConcept = concept => {
    return dispatch => {
        dispatch({ type: DELETE_CONCEPT_BEGIN });
         return remove( concept, `/concept/` ) 
         .then( () => {
             dispatch({ type: DELETE_CONCEPT_SUCCESS, payload: concept });
         }).catch( error => {
            dispatch({ type: DELETE_CONCEPT_ERROR , error  });
        });
    };
};

export const setCurrentConcept = concept => ({ 
    type: SET_CURRENT_CONCEPT, payload: concept  
});

export const setConceptLink = conceptLink => ({ 
     type: SET_CONCEPT_LINK, payload: conceptLink  
});

export const toggleConceptModal = () => ({
    type: TOGGLE_CONCEPT_MODAL
});

export const setSelectedConcept = concept => ({ 
    type: SET_SELECTED_CONCEPT, payload: concept  
});

export const toggleConcepts = () => ({
    type: TOGGLE_CONCEPTS
});