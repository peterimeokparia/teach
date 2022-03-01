import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const ADD_INSTITUTIONS_BEGIN = "ADD INSTITUTIONS BEGIN";
export const ADD_INSTITUTIONS_SUCCESS = "ADD INSTITUTIONS SUCCESS";
export const ADD_INSTITUTIONS_ERROR = "ADD INSTITUTIONS ERROR";
export const LOAD_INSTITUTIONS_BEGIN = "LOAD INSTITUTIONS BEGIN";
export const LOAD_INSTITUTIONS_SUCCESS = "LOAD INSTITUTIONS SUCCESS";
export const LOAD_INSTITUTIONS_ERROR = "LOAD INSTITUTIONS ERROR";
export const DELETE_INSTITUTIONS_BEGIN = "DELETE INSTITUTIONS BEGIN";
export const DELETE_INSTITUTIONS_SUCCESS = "DELETE INSTITUTIONS SUCCESS";
export const DELETE_INSTITUTIONS_ERROR = "DELETE INSTITUTIONS ERROR";
export const SAVE_INSTITUTIONS_BEGIN = "SAVE INSTITUTIONS BEGIN";
export const SAVE_INSTITUTIONS_SUCCESS = "SAVE INSTITUTIONS SUCCESS";
export const SAVE_INSTITUTIONS_ERROR = "SAVE INSTITUTIONS ERROR";

export const addNewInstitution = institution => {
    return dispatch => {
        dispatch({ type: ADD_INSTITUTIONS_BEGIN });
        return add( institution, '/institutions')
        .then(institutionData => {
            dispatch({ type: ADD_INSTITUTIONS_SUCCESS, payload: institutionData });
        }).catch( error => {
            dispatch({ type: ADD_INSTITUTIONS_ERROR , error });
        });
    };
};

export const saveInstitution = ( institution ) => {
    return dispatch => {
        dispatch({ type: SAVE_INSTITUTIONS_BEGIN });
        return update( institution, `/institutions/` )
            .then( institutionData => {  
            dispatch({ type: SAVE_INSTITUTIONS_SUCCESS, payload: institutionData }); 
            }).catch( error => {
            dispatch({ type: SAVE_INSTITUTIONS_ERROR , error });
        });  
    };
};

export const loadInstitutions = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_INSTITUTIONS_BEGIN });
        return get(`/institutions`)
          .then( institutions  => { 
             dispatch({ type: LOAD_INSTITUTIONS_SUCCESS, payload: institutions }); 
           }).catch( error => {
            dispatch({ type: LOAD_INSTITUTIONS_ERROR , error });
        });       
    };
};

export const loadInstitutionByInstitutionId = ( institutionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_INSTITUTIONS_BEGIN });
         return getById( institutionId, `/institutions/institution?institutionId=`)
          .then( institutions  => { 
                dispatch({ type: LOAD_INSTITUTIONS_SUCCESS, payload: institutions });
           }).catch( error => {
                dispatch({ type: LOAD_INSTITUTIONS_ERROR , error });
           });       
    };
};

export const deleteInstitution = institution => {
    return dispatch => {
        dispatch({ type: DELETE_INSTITUTIONS_BEGIN });
            return remove( institution, `/institutions/` )
            .then( (response ) => {
                dispatch({ type: DELETE_INSTITUTIONS_SUCCESS, payload: institution });
            }).catch( error => {
            dispatch({ type: DELETE_INSTITUTIONS_ERROR , error });
        });
    };
};