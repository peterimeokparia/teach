import {
purchaseHistory } from 'services/course/api';

export const PURCHASE_HISTORY_BEGIN = "PURCHASE HISTORY BEGIN";
export const PURCHASE_HISTORY_SUCCESS = "PURCHASE HISTORY SUCCESS";
export const PURCHASE_HISTORY_ERROR = "PURCHASE HISTORY ERROR";

export const addToPurchaseHistory = (currentUser) => {
    return dispatch => {
         dispatch({ type: PURCHASE_HISTORY_BEGIN });
        return purchaseHistory(currentUser)
         .then( history => {
            dispatch({ type: PURCHASE_HISTORY_SUCCESS, history });
         }).catch( error => {
               dispatch({type: PURCHASE_HISTORY_ERROR, error });
        });
    };
};