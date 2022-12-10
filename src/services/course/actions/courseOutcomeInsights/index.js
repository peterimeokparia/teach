import { add, update, remove, get, getById, getPagedData } from 'services/course/api';

export const ADD_COURSE_OUTCOME_INSIGHT_BEGIN = "ADD COURSE OUTCOME INSIGHT BEGIN";
export const ADD_COURSE_OUTCOME_INSIGHT_SUCCESS = "ADD COURSE OUTCOME INSIGHT SUCCESS";
export const ADD_COURSE_OUTCOME_INSIGHT_SUCCESS_NO_REDIRECT = "ADD COURSE OUTCOME INSIGHT SUCCESS NO REDIRECT";
export const ADD_COURSE_OUTCOME_INSIGHT_ERROR = "ADD COURSE OUTCOME INSIGHT ERROR";
export const LOAD_COURSE_OUTCOME_INSIGHT_BEGIN = "LOAD COURSE OUTCOME INSIGHT BEGIN";
export const LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS = "LOAD COURSE OUTCOME INSIGHT SUCCESS";
export const LOAD_COURSE_OUTCOME_INSIGHT_ERROR = "LOAD COURSE OUTCOME INSIGHT ERROR";
export const DELETE_COURSE_OUTCOME_INSIGHT_BEGIN = "DELETE COURSE OUTCOME INSIGHT BEGIN";
export const DELETE_COURSE_OUTCOME_INSIGHT_ERROR = "DELETE COURSE OUTCOME INSIGHT ERROR";
export const DELETE_COURSE_OUTCOME_INSIGHT_SUCCESS = "DELETE COURSE OUTCOME INSIGHT SUCCESS";
export const SAVE_COURSE_OUTCOME_INSIGHT_BEGIN = "SAVE COURSE OUTCOME INSIGHT BEGIN";
export const SAVE_COURSE_OUTCOME_INSIGHT_ERROR = "SAVE COURSE OUTCOME INSIGHT ERROR";
export const SAVE_COURSE_OUTCOME_INSIGHT_SUCCESS = "SAVE COURSE OUTCOME INSIGHT SUCCESS";
export const SAVE_COURSE_OUTCOME_INSIGHT_SUCCESS_NO_REDIRECT = "SAVE COURSE OUTCOME INSIGHT SUCCESS NO REDIRECT";

export const addNewCourseOutcomeInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: ADD_COURSE_OUTCOME_INSIGHT_BEGIN });
        return add( insights, '/courseoutcomeinsights')
        .then(insight => {
            dispatch({ type: ADD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: insight });
        }).catch( error => {
            dispatch({ type: ADD_COURSE_OUTCOME_INSIGHT_ERROR , error });
        });
    };
};

export const saveCourseOutcomeInsight = ( insights ) => {
    return dispatch => {
        dispatch({ type: SAVE_COURSE_OUTCOME_INSIGHT_BEGIN });
        return update( insights, `/courseoutcomeinsights/` )
            .then( insight => {  
             dispatch({ type: SAVE_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: insight }); 
            }).catch( error => {
            dispatch({ type: SAVE_COURSE_OUTCOME_INSIGHT_ERROR , error });
        });  
    };
 };

export const loadCourseOutcomeInsights = () => {
    return dispatch => {
        dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_BEGIN });
        return get(`/courseoutcomeinsights`)
          .then( insights  => { 
             dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: insights }); 
           }).catch( error => {
            dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_ERROR , error });
        });       
    };
  };

export const loadCourseOutcomeInsightByOutcomeInsightId = ( insights ) => {
    return dispatch => {
         dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_BEGIN });
         return getById( insights, `/courseoutcomeinsights/builder?outcomeInsightsId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_ERROR , error });
           });       
    };
};

export const loadCourseOutcomeInsightByAnswerId = ( answerId ) => {
    return dispatch => {
         dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_BEGIN });
         return getById( answerId, `/courseoutcomeinsights/answer?answerId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_ERROR , error });
           });       
    };
};

export const loadCourseOutcomeInsightByUserId = ( userId ) => {
    return dispatch => {
         dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_BEGIN });
         return getById( userId, `/courseoutcomeinsights/user?userId=`)
          .then( builder  => { 
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: builder });
           }).catch( error => {
                dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_ERROR , error });
        });       
    };
};

export const loadPagedCourseOutcomeInsights = ( formType, page, limit ) => { 
    return dispatch => {
        return getPagedData( `/courseoutcomeinsights/pagedRoute?id=${formType}&page=${page}&limit=${limit}`)
        .then( form => {
            dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: form });
            return form;
        }).catch( error => {
            dispatch({ type: LOAD_COURSE_OUTCOME_INSIGHT_ERROR , error });
            return error;
        });
    };
};

export const deleteCourseOutcomeInsight = insights => {
    return dispatch => {
        dispatch({ type: DELETE_COURSE_OUTCOME_INSIGHT_BEGIN });
            return remove( insights, `/courseoutcomeinsights/` )
            .then( (response ) => {
                dispatch({ type: DELETE_COURSE_OUTCOME_INSIGHT_SUCCESS, payload: insights });
            }).catch( error => {
            dispatch({ type: DELETE_COURSE_OUTCOME_INSIGHT_ERROR , error });
        });
    };
};



