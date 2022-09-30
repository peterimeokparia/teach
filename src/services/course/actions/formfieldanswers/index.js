import { add, update, updateWithId, remove, get, getById } from 'services/course/api';

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
export const SAVE_FORMFIELDANSWERS_SUCCESS_SKIP_MW = 'SAVE FORMFIELDANSWERS SUCCESS SKIP MW';
export const SET_FORMFIELDANSWERS_MARKDOWN = "SET FORMFIELDANSWERS MARKDOWN";
export const ADD_ANSWER_POINTS = "ADD ANSWER POINTS";
export const STUDENTS_TOTAL_ANSWER_POINTS = "STUDENTS TOTAL ANSWER POINTS";
export const SAVE_FORMFIELDANSWERS_WITH_POINTS_SUCCESS = "SAVE FORMFIELDANSWERS WITH POINTS SUCCESS";
export const SAVE_DRAGGABLE_ANSWER = "SAVE DRAGGABLE ANSWER";
export const SAVE_DRAGGABLE_ANSWERS_SUCCESS = "SAVE DRAGGABLE ANSWERS SUCCESS";
export const UPDATE_ANSWER = "UPDATE ANSWER";
export const FORMFIELD_ANSWER_MARKDOWN = "FORMFIELD ANSWER MARKDOWN";
export const SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_BEFORE_MOVE = "SAVE FORMFIELD DRAGGABLE ANSWERS POINTS BEFORE MOVE";
export const SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_AFTER_MOVE = "SAVE FORMFIELD DRAGGABLE ANSWERS POINTS AFTER MOVE";

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

let timerHandle = null;

export const setMarkDown = ( teachObject, markDownContent, teachObjectType, actionType, saveAction, duration  ) => {
    return ( dispatch, getState )  => {
        dispatch({ type: actionType, payload: {   
            teachObject,
            markDownContent
          }});
          
        if ( timerHandle ){
            clearTimeout( timerHandle );
        };

        timerHandle = setTimeout(() => {
            const latestTeachObjectData = getState()[teachObjectType.propNameOne][teachObjectType.propNameTwo][ teachObject?._id ]; 
    
            if ( latestTeachObjectData !== undefined  ) {
                saveAction( latestTeachObjectData );
            }
        }, duration);  
    };
};

export const saveDraggableFormFieldAnswer = ( formfields ) => {
    return (dispatch, getState) => {    
        dispatch({ type: SAVE_FORMFIELDANSWERS_BEGIN });
        return update( formfields, `/formfieldanswers/` )
            .then( formfields => {  
                dispatch({ type: SAVE_DRAGGABLE_ANSWER, payload: formfields });

                let draggableListItems =  getState()?.formFieldAnswers.draggableFormFieldAnswers;
                let answer = formfields;

                dispatch({ type: SAVE_DRAGGABLE_ANSWERS_SUCCESS, payload:{ answer, draggableListItems }  });
                dispatch({ type: SAVE_FORMFIELDANSWERS_SUCCESS_SKIP_MW, payload: formfields }); 
                getById( formfields?.questionId, `/formfieldanswers/question?questionId=`)
                    .then( draggableFormfields  => { 
                        let pointsAfter = draggableFormfields?.map(item => item?.points)?.reduce((previousVal, currentVal) => previousVal + currentVal, 0);

                        dispatch({ 
                            type: SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_AFTER_MOVE, 
                            payload: {
                                formUuId: formfields?.formUuId,
                                userId: formfields?.userId,
                                points: pointsAfter,
                                answerFormInputField: formfields
                            }});
                }).catch( error => {
                    dispatch({ type: LOAD_FORMFIELDANSWERS_ERROR , error });
                });       
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

export const saveDraggableFormFieldAnswersPointsBeforeMove =  ( payload ) => {
    return dispatch => {
        dispatch({ type: SAVE_FORMFIELD_DRAGGABLE_ANSWERS_POINTS_BEFORE_MOVE, payload  });
        //return payload;
 }; 
};

export const saveStudentsAnswerPoints =  ( answerPoints ) => {
    return dispatch => {
        dispatch({ type: STUDENTS_TOTAL_ANSWER_POINTS, payload: answerPoints });
            return answerPoints;
 }; 
};
