import { add, update, remove, get, getById, getPagedData } from 'services/course/api';

export const ADD_STUDENT_QUESTION_INSIGHT_BEGIN = "ADD STUDENT QUESTION INSIGHT BEGIN";
export const ADD_STUDENT_QUESTION_INSIGHT_SUCCESS = "ADD STUDENT QUESTION INSIGHT SUCCESS";
export const ADD_STUDENT_QUESTION_INSIGHT_SUCCESS_NO_REDIRECT = "ADD STUDENT QUESTION INSIGHT SUCCESS NO REDIRECT";
export const ADD_STUDENT_QUESTION_INSIGHT_ERROR = "ADD STUDENT QUESTION INSIGHT ERROR";
export const LOAD_STUDENT_QUESTION_INSIGHT_BEGIN = "LOAD STUDENT QUESTION INSIGHT BEGIN";
export const LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS = "LOAD STUDENT QUESTION INSIGHT SUCCESS";
export const LOAD_STUDENT_QUESTION_INSIGHT_ERROR = "LOAD STUDENT QUESTION INSIGHT ERROR";
export const DELETE_STUDENT_QUESTION_INSIGHT_BEGIN = "DELETE STUDENT QUESTION INSIGHT BEGIN";
export const DELETE_STUDENT_QUESTION_INSIGHT_ERROR = "DELETE STUDENT QUESTION INSIGHT ERROR";
export const DELETE_STUDENT_QUESTION_INSIGHT_SUCCESS = "DELETE STUDENT STUDENT QUESTION INSIGHT SUCCESS";
export const SAVE_STUDENT_QUESTION_INSIGHT_BEGIN = "SAVE STUDENT QUESTION INSIGHT BEGIN";
export const SAVE_STUDENT_QUESTION_INSIGHT_ERROR = "SAVE STUDENT QUESTION INSIGHT ERROR";
export const SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS = "SAVE STUDENT QUESTION INSIGHT SUCCESS";
export const SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS_NO_REDIRECT = "SAVE STUDENT QUESTION INSIGHT SUCCESS NO REDIRECT";
export const TOGGLE_STUDENT_QUESTION_INSIGHT_MODAL = "TOGGLE STUDENT QUESTION INSIGHT MODAL";
export const TOGGLE_MAX_STUDENT_QUESTION_DIALOG = "TOGGLE MAX STUDENT QUESTION DIALOG";
export const TOGGLE_MAX_FIELD_DIALOG = "TOGGLE MAX FIELD DIALOG";
export const DRAGGABLE_ITEM = "DRAGGABLE ITEM";

export const addNewStudentQuestionInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: ADD_STUDENT_QUESTION_INSIGHT_BEGIN });
        dispatch({ type: ADD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights }); // check draggables
        return add( insights, '/studentquestioninsights')
        .then(insights => {
            dispatch({ type: SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights });
        }).catch( error => {
            dispatch({ type: ADD_STUDENT_QUESTION_INSIGHT_ERROR , error });
        });
    };
};

export const saveStudentQuestionInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: SAVE_STUDENT_QUESTION_INSIGHT_BEGIN });
        return update( insights, `/studentquestioninsights/` )
            .then( insights => {  
             dispatch({ type: SAVE_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights }); 
            }).catch( error => {
            dispatch({ type: SAVE_STUDENT_QUESTION_INSIGHT_ERROR , error });
        });  
    };
 };

export const loadStudentQuestionInsights = () => {
    return dispatch => {
        dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_BEGIN });
        return get(`/studentquestioninsights`)
          .then( insights  => { 
             dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights }); 
           }).catch( error => {
            dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
        });       
    };
  };

  export const loadStudentQuestionInsightByFormType = ( formType ) => {
    return dispatch => {
         dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_BEGIN });
         return getById( formType, `/studentquestioninsights/formType?formType=`)
          .then( insights  => { 
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights });
           }).catch( error => {
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadStudentQuestionInsightByQuestionInsightId = ( questionInsightsId ) => {
    return dispatch => {
         dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_BEGIN });
         return getById( questionInsightsId, `/studentquestioninsights/builder?questionInsightsId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadStudentQuestionInsightByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_BEGIN });
         return getById( answerId, `/studentquestioninsights/answer?answerId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
           });       
    };
};

export const loadStudentQuestionInsightByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_BEGIN });
         return getById( userId, `/studentquestioninsights/user?userId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
        });       
    };
};

export const loadPagedStudentQuestionInsights = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/studentquestioninsights/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_STUDENT_QUESTION_INSIGHT_ERROR , error });
            return error;
        });
    };
};

export const deleteQuestionInsight = insights => {
    return dispatch => {
        dispatch({ type: DELETE_STUDENT_QUESTION_INSIGHT_BEGIN });
            return remove( insights, `/studentquestioninsights/` )
            .then( (response ) => {
                dispatch({ type: DELETE_STUDENT_QUESTION_INSIGHT_SUCCESS, payload: insights });
            }).catch( error => {
            dispatch({ type: DELETE_STUDENT_QUESTION_INSIGHT_ERROR , error });
        });
    };
};

export const toggleNewFormBuilderModal = () => ({
    type: TOGGLE_STUDENT_QUESTION_INSIGHT_MODAL
});

export const setIsMaxQuestionDialogOpen = ( isMaxQuestionDialogOpen ) => ({
    type: TOGGLE_MAX_STUDENT_QUESTION_DIALOG, payload: isMaxQuestionDialogOpen
});

export const setIsMaxFieldDialogOpen = ( isMaxFieldDialogOpen ) => ({
    type: TOGGLE_MAX_FIELD_DIALOG, payload: isMaxFieldDialogOpen
});

