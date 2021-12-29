// formquestionpoints
import {
add,
update,
updateWithId,
remove,
get,
getById } from 'services/course/api';

export const ADD_FORMFIELDPOINTS_BEGIN = "ADD FORMFIELDPOINTS BEGIN";
export const ADD_FORMFIELDPOINTS_SUCCESS = "ADD FORMFIELDPOINTS SUCCESS";
export const ADD_FORMFIELDPOINTS_ERROR = "ADD FORMFIELDPOINTS ERROR";
export const LOAD_FORMFIELDPOINTS_BEGIN = "LOAD FORMFIELDPOINTS BEGIN";
export const LOAD_FORMFIELDPOINTS_SUCCESS = "LOAD FORMFIELDPOINTS SUCCESS";
export const LOAD_LATEST_FORMFIELDPOINTS_SUCCESS = "LOAD LATEST FORMFIELDPOINTS SUCCESS";
export const LOAD_FORMFIELDPOINTS_ERROR = "LOAD FORMFIELDPOINTS ERROR";
export const DELETE_FORMFIELDPOINTS_BEGIN = "DELETE FORMFIELDPOINTS BEGIN";
export const DELETE_FORMFIELDPOINTS_ERROR = "DELETE FORMFIELDPOINTS ERROR";
export const DELETE_FORMFIELDPOINTS_SUCCESS = "DELETE FORMFIELDPOINTS SUCCESS";
export const RESET_FORMFIELDPOINTS_ERROR = "RESET FORMFIELDPOINTS ERROR";
export const SAVE_FORMFIELDPOINTS_BEGIN = "SAVE FORMFIELDPOINTS BEGIN";
export const SAVE_FORMFIELDPOINTS_ERROR = "SAVE FORMFIELDPOINTS ERROR";
export const SAVE_FORMFIELDPOINTS_SUCCESS = "SAVE FORMFIELDPOINTS SUCCESS";

export const addNewFormFieldPoint = newFormField => {
    return dispatch => {
        dispatch({ type: ADD_FORMFIELDPOINTS_BEGIN });
        return add( newFormField, '/formquestionpoints')
        .then(inputfield => {
            dispatch({ type: ADD_FORMFIELDPOINTS_SUCCESS, payload: inputfield });
            // if I have to dispatch a unique action to addNewFormFielAnswer and not addNewFormField without the middleware
        }).catch( error => {
            dispatch({ type: ADD_FORMFIELDPOINTS_ERROR , error });
        });
    };
};

export const saveFormFieldPoint = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDPOINTS_BEGIN });
        return update( formfields, `/formquestionpoints/` )
            .then( formfields => {  
                dispatch({ type: SAVE_FORMFIELDPOINTS_SUCCESS, payload: formfields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDPOINTS_ERROR , error });
        });  
    };
};

export const saveFormFieldPointsByFieldId = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDPOINTS_BEGIN });
        return updateWithId( formfields, `/formquestionpoints/`, 'fieldId' )
            .then( formfields => {  
                dispatch({ type: SAVE_FORMFIELDPOINTS_SUCCESS, payload: formfields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDPOINTS_ERROR , error });
        });  
    };
};

export const loadFormFieldPoints = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_FORMFIELDPOINTS_BEGIN });
        return get(`/formquestionpoints`)
            .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDPOINTS_SUCCESS, payload: formfields }); 
                dispatch({ type: LOAD_LATEST_FORMFIELDPOINTS_SUCCESS, payload: formfields });
            }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDPOINTS_ERROR , error });
        });       
    };
    };

export const loadFormFieldPointsByFormFieldId = ( formfieldId ) => {
    return dispatch => {
            dispatch({ type: LOAD_FORMFIELDPOINTS_BEGIN });
            return getById( formfieldId, `/formquestionpoints/formfield?formfieldId=`)
            .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDPOINTS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDPOINTS_SUCCESS, payload: formfields });
            }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDPOINTS_ERROR , error });
            });       
    };
};

export const loadFormFieldPointsByQuestionId = ( questionId ) => {
    return dispatch => {
            dispatch({ type: LOAD_FORMFIELDPOINTS_BEGIN });
            return getById( questionId, `/formquestionpoints/question?questionId=`)
            .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDPOINTS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDPOINTS_SUCCESS, payload: formfields });
            }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDPOINTS_ERROR , error });
            });       
    };
};

export const loadFormFieldPointsByUserId = ( userId ) => {
    return dispatch => {
            dispatch({ type: LOAD_FORMFIELDPOINTS_BEGIN });
            return getById( userId, `/formquestionpoints/formfield/user?userId=`)
            .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDPOINTS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDPOINTS_SUCCESS, payload: formfields });
            }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDPOINTS_ERROR , error });
        });       
    };
};

export const deleteFormFieldPoints = formfield => {
return dispatch => {
    dispatch({ type: DELETE_FORMFIELDPOINTS_BEGIN });
        return remove( formfield, `/formquestionpoints/` )
        .then( (response ) => {
            dispatch({ type: DELETE_FORMFIELDPOINTS_SUCCESS, payload: formfield });
        }).catch( error => {
        dispatch({ type: DELETE_FORMFIELDPOINTS_ERROR , error });
    });
};
};