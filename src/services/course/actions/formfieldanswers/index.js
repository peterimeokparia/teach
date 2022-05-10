import {
add,
update,
updateWithId,
remove,
get,
getById } from 'services/course/api';


export const ADD_FORMFIELDANSWERS_BEGIN = "ADD FORMFIELDANSWERS BEGIN";
export const ADD_FORMFIELDANSWERS_SUCCESS = "ADD FORMFIELDANSWERS SUCCESS";
export const ADD_FORMFIELDANSWERS_ERROR = "ADD FORMFIELDANSWERS ERROR";
export const LOAD_FORMFIELDANSWERS_BEGIN = "LOAD FORMFIELDANSWERS BEGIN";
export const LOAD_FORMFIELDANSWERS_SUCCESS = "LOAD FORMFIELDANSWERS SUCCESS";
export const LOAD_LATEST_FORMFIELDANSWERS_SUCCESS = "LOAD LATEST FORMFIELDANSWERS SUCCESS";
export const LOAD_FORMFIELDANSWERS_ERROR = "LOAD FORMFIELDANSWERS ERROR";
export const DELETE_FORMFIELDANSWERS_BEGIN = "DELETE FORMFIELDANSWERS BEGIN";
export const DELETE_FORMFIELDANSWERS_ERROR = "DELETE FORMFIELDANSWERS ERROR";
export const DELETE_FORMFIELDANSWERS_SUCCESS = "DELETE FORMFIELDANSWERS SUCCESS";
export const RESET_FORMFIELDANSWERS_ERROR = "RESET FORMFIELDANSWERS ERROR";
export const SAVE_FORMFIELDANSWERS_BEGIN = "SAVE FORMFIELDANSWERS BEGIN";
export const SAVE_FORMFIELDANSWERS_ERROR = "SAVE FORMFIELDANSWERS ERROR";
export const SAVE_FORMFIELDANSWERS_SUCCESS = "SAVE FORMFIELDANSWERS SUCCESS";
export const SET_FORMFIELDANSWERS_MARKDOWN = "SET FORMFIELDANSWERS MARKDOWN";
export const SET_EXPLANATION_ANSWER_MARKDOWN = "SET EXPLANATION ANSWER MARKDOWN";
export const ADD_ANSWER_POINTS = "ADD ANSWER POINTS";
export const STUDENTS_TOTAL_ANSWER_POINTS = "STUDENTS TOTAL ANSWER POINTS";
export const SAVE_FORMFIELDANSWERS_WITH_POINTS_SUCCESS = "SAVE FORMFIELDANSWERS WITH POINTS SUCCESS";

export const addNewFormFieldAnswer = newFormField => {
    return dispatch => {
        dispatch({ type: ADD_FORMFIELDANSWERS_BEGIN });
        return add( newFormField, '/formfieldanswers')
        .then(inputfield => {
            dispatch({ type: ADD_FORMFIELDANSWERS_SUCCESS, payload: inputfield });
        }).catch( error => {
            dispatch({ type: ADD_FORMFIELDANSWERS_ERROR , error });
        });
    };
};

export const saveFormFieldAnswer = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDANSWERS_BEGIN });
        return update( formfields, `/formfieldanswers/` )
            .then( formfields => {  
             dispatch({ type: SAVE_FORMFIELDANSWERS_SUCCESS, payload: formfields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDANSWERS_ERROR , error });
        });  
    };
};

export const saveFormFieldAnswerByFieldId = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDANSWERS_BEGIN });
        return updateWithId( formfields, `/formfieldanswers/`, 'fieldId' )
            .then( formfields => {  
             dispatch({ type: SAVE_FORMFIELDANSWERS_SUCCESS, payload: formfields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDANSWERS_ERROR , error });
        });  
    };
};

export const loadFormFieldAnswers = ( ) => {
    return dispatch => {
        dispatch({ type: LOAD_FORMFIELDANSWERS_BEGIN });
        return get(`/formfieldanswers`)
          .then( formfields  => { 
             dispatch({ type: LOAD_FORMFIELDANSWERS_SUCCESS, payload: formfields }); 
             dispatch({ type: LOAD_LATEST_FORMFIELDANSWERS_SUCCESS, payload: formfields });
           }).catch( error => {
            dispatch({ type: LOAD_FORMFIELDANSWERS_ERROR , error });
        });       
    };
  };

export const loadFormFieldAnswersByFormFieldId = ( formfieldId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDANSWERS_BEGIN });
         return getById( formfieldId, `/formfieldanswers/formfield?formfieldId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDANSWERS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDANSWERS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDANSWERS_ERROR , error });
           });       
    };
};

export const loadFormFieldAnswersByQuestionId = ( questionId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDANSWERS_BEGIN });
         return getById( questionId, `/formfieldanswers/question?questionId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDANSWERS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDANSWERS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDANSWERS_ERROR , error });
           });       
    };
};

export const loadFormFieldAnswersByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_FORMFIELDANSWERS_BEGIN });
         return getById( userId, `/formfieldanswers/formfield/user?userId=`)
          .then( formfields  => { 
                dispatch({ type: LOAD_FORMFIELDANSWERS_SUCCESS, payload: formfields });
                dispatch({ type: LOAD_LATEST_FORMFIELDANSWERS_SUCCESS, payload: formfields });
           }).catch( error => {
                dispatch({ type: LOAD_FORMFIELDANSWERS_ERROR , error });
        });       
    };
};

export const deleteFormFieldAnswer = formfield => {
return dispatch => {
    dispatch({ type: DELETE_FORMFIELDANSWERS_BEGIN });
        return remove( formfield, `/formfieldanswers/` )
        .then( (response ) => {
            dispatch({ type: DELETE_FORMFIELDANSWERS_SUCCESS, payload: formfield });
        }).catch( error => {
        dispatch({ type: DELETE_FORMFIELDANSWERS_ERROR , error });
    });
};
};

export const saveFormFieldAnswerWithPoints = ( formfields ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELDANSWERS_BEGIN });
        return update( formfields, `/formfieldanswers/` )
            .then( fields => {  
             dispatch({ type: SAVE_FORMFIELDANSWERS_WITH_POINTS_SUCCESS, payload: fields }); 
            }).catch( error => {
            dispatch({ type: SAVE_FORMFIELDANSWERS_ERROR , error });
        });  
    };
};

export const saveStudentsAnswerPoints =  ( answerPoints ) => {
    return dispatch => {
        dispatch({ type: STUDENTS_TOTAL_ANSWER_POINTS, payload: answerPoints })
            return answerPoints;
} };
