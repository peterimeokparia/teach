import {
add,
update,
remove,
get,
getById } from 'services/course/api';

export const ADD_FORMFIELDS_BEGIN = "ADD FORMFIELDS BEGIN";
export const ADD_FORMFIELDS_SUCCESS = "ADD FORMFIELDS SUCCESS";
export const ADD_FORMFIELDS_ERROR = "ADD FORMFIELDS ERROR";
export const LOAD_FORMFIELDS_BEGIN = "LOAD FORMFIELDS BEGIN";
export const LOAD_FORMFIELDS_SUCCESS = "LOAD FORMFIELDS SUCCESS";
export const LOAD_LATEST_FORMFIELDS_SUCCESS = "LOAD LATEST FORMFIELDS SUCCESS";
export const LOAD_FORMFIELDS_ERROR = "LOAD FORMFIELDS ERROR";
export const DELETE_FORMFIELDS_BEGIN = "DELETE FORMFIELDS BEGIN";
export const DELETE_FORMFIELDS_ERROR = "DELETE FORMFIELDS ERROR";
export const DELETE_FORMFIELDS_SUCCESS = "DELETE FORMFIELDS SUCCESS";
export const RESET_FORMFIELDS_ERROR = "RESET FORMFIELDS ERROR";
export const SAVE_FORMFIELDS_BEGIN = "SAVE FORMFIELDS BEGIN";
export const SAVE_FORMFIELDS_ERROR = "SAVE FORMFIELDS ERROR";
export const SAVE_FORMFIELDS_SUCCESS = "SAVE FORMFIELDS SUCCESS";
export const SET_FORMFIELDS_MARKDOWN = "SET FORMFIELDS MARKDOWN";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";
export const SAVE_FORMFIELDS_SUCCESS_MW = "SAVE FORMFIELDS SUCCESS MW";

export const addNewFormField = newFormField => {
    return dispatch => {
        dispatch({ type: ADD_FORMFIELDS_BEGIN });
        return add( newFormField, '/formfields')
        .then(inputfield => {
            dispatch({ type: ADD_FORMFIELDS_SUCCESS, payload: inputfield });
        }).catch( error => {
            dispatch({ type: ADD_FORMFIELDS_ERROR , error });
        });
    };
};

export const saveFormField = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDS_BEGIN });
        return update( formfields, `/formfields/` )
            .then( formfields => {  
            dispatch({ type: SAVE_FORMFIELDS_SUCCESS, payload: formfields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDS_ERROR , error });
        });  
    };
 };

export const saveFormFieldNoCallback = formfieldvalues => ({
    type: SAVE_FORMFIELDS_SUCCESS_MW,
    payload: formfieldvalues
});


export const loadFormFields = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_FORMFIELDS_BEGIN });
        return get(`/formfields`)
          .then( formfields  => { 
             dispatch({ type: LOAD_FORMFIELDS_SUCCESS, payload: formfields }); 
             dispatch({ type: LOAD_LATEST_FORMFIELDS_SUCCESS, payload: formfields });
           }).catch( error => {
            dispatch({ type: LOAD_FORMFIELDS_ERROR , error });
        });       
    };
  };

export const loadFormFieldsByFormFieldId = ( formfieldId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDS_BEGIN });
         return getById( formfieldId, `/formfields/formfield?formfieldId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDS_ERROR , error });
           });       
    };
};

export const loadFormFieldsByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDS_BEGIN });
         return getById( questionId, `/formfields/question?questionId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDS_ERROR , error });
           });       
    };
};

export const loadFormFieldsByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDS_BEGIN });
         return getById( userId, `/formfields/formfield/user?userId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDS_ERROR , error });
        });       
    };
};

export const deleteFormField = formfield => {
return dispatch => {
    dispatch({ type: DELETE_FORMFIELDS_BEGIN });
        return remove( formfield, `/formfields/` )
        .then( (response ) => {
            dispatch({ type: DELETE_FORMFIELDS_SUCCESS, payload: formfield });
        }).catch( error => {
        dispatch({ type: DELETE_FORMFIELDS_ERROR , error });
    });
};
};