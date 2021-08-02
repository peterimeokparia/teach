import {
get,
operatorSignUp } from 'services/course/api';

export const OPERATOR_LOGIN_BEGIN = "OPERATOR LOGIN BEGIN";
export const OPERATOR_LOGIN_SUCCESS = "OPERATOR LOGIN SUCCESS";
export const OPERATOR_LOGIN_ERROR = "OPERATOR LOGIN ERROR";
export const OPERATOR_SIGN_UP_BEGINS = "OPERATOR SIGN UP BEGINS";
export const OPERATOR_SIGN_UP_SUCCESSS = "OPERATOR SIGN UP SUCCESSS";
export const OPERATOR_SIGN_UP_ERRORS = "OPERATOR SIGN UP ERRORS";
export const LOAD_OPERATORS_BEGIN = "LOAD OPERATORS BEGIN";
export const LOAD_OPERATORS_SUCCESS = "LOAD OPERATORS SUCCESS";
export const LOAD_OPERATORS_ERROR = "LOAD OPERATORS ERROR";
export const SAVE_OPERATOR_BEGIN = "SAVE OPERATOR BEGIN";
export const SAVE_OPERATOR_SUCCESS = "SAVE_OPERATOR_SUCCESS";
export const SAVE_OPERATOR_ERROR = "SAVE_OPERATOR_ERROR";
export const SET_OPERATOR = "SET OPERATOR";
export const SET_BUSINESS_NAME = "SET BUSINESS NAME";

export const loadOperators = () => {
    return dispatch => {
        dispatch({ type: LOAD_OPERATORS_BEGIN });
        get('/operators')
         .then( users => {
             dispatch({ type: LOAD_OPERATORS_SUCCESS, payload: users });
         }).catch( error => {
               dispatch({ type: LOAD_OPERATORS_ERROR , error });
        });
    };
};

export const createOperator = (newUser) => {
    return dispatch => {
    dispatch({ type: OPERATOR_SIGN_UP_BEGINS });  
     return operatorSignUp(newUser)
         .then( operator => {
             dispatch({ type: OPERATOR_SIGN_UP_SUCCESSS, payload: operator });
         }).catch( error => {
               dispatch({ type: OPERATOR_SIGN_UP_ERRORS , error });
        });
    };
};

export const setOperator = operator => ({
   type: SET_OPERATOR,
   operator
}); 

export const setOperatorBusinessName = businessName => ({
    type: SET_BUSINESS_NAME,
    businessName
 }); 