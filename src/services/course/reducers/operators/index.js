import produce from 'immer';

import {
OPERATOR_LOGIN_BEGIN, 
OPERATOR_LOGIN_SUCCESS, 
OPERATOR_LOGIN_ERROR, 
OPERATOR_SIGN_UP_BEGINS, 
OPERATOR_SIGN_UP_SUCCESSS,
OPERATOR_SIGN_UP_ERRORS, 
LOAD_OPERATORS_BEGIN, 
LOAD_OPERATORS_SUCCESS,  
LOAD_OPERATORS_ERROR,
SAVE_OPERATOR_BEGIN,
SAVE_OPERATOR_SUCCESS,
SAVE_OPERATOR_ERROR,
SET_OPERATOR,
SET_BUSINESS_NAME } from '../../actions/operator';

const initialState = {
    operators: {},
    operator:{},
    operatorBusinessName:'',
    error: null,
    loading: false,
    saveOperatorInProgress: false,
    onSaveOperatorError: null
};

const reducer = produce((draft, action) => {
    switch(action.type){
        
        case OPERATOR_SIGN_UP_BEGINS:
        case OPERATOR_LOGIN_BEGIN:
            draft.loading = true;
            draft.error = null;
        return;
        case OPERATOR_SIGN_UP_SUCCESSS:
        case OPERATOR_LOGIN_SUCCESS:      
             draft.loading = false;
             draft.operator = action.payload;   
        return;
        case OPERATOR_SIGN_UP_ERRORS:
        case OPERATOR_LOGIN_ERROR:    
             draft.loading = false;
             draft.error = action.error;
             draft.operator = null;
        return;
        case LOAD_OPERATORS_BEGIN:
            draft.loading = true;
            draft.error = null;
        return;
        case LOAD_OPERATORS_SUCCESS: 
            draft.loading = false;
            action.payload?.forEach(operator => {
                draft.operators[operator?._id] = operator; 
            });
        return;
        case LOAD_OPERATORS_ERROR:
             draft.loading = false;
             draft.error = action.error;
        return;
        case SAVE_OPERATOR_BEGIN:
             draft.saveOperatorInProgress = true;
             draft.onSaveOperatorError = null;
        return; 
        case SAVE_OPERATOR_SUCCESS:    
             draft.operators[action.payload._id] = action.payload;
             draft.operator =  action.payload;
             draft.saveOperatorInProgress = false;
         return;    
         case SAVE_OPERATOR_ERROR:
             draft.saveOperatorInProgress = false;    
             draft.onSaveOperatorError = action.error;
        return;    
        case SET_OPERATOR:
            draft.operator = action.payload;    
        return;   
        case SET_BUSINESS_NAME:
            draft.operatorBusinessName = action.businessName;    
        return;
        default:
        return;
        
    }  
}, initialState);

export default reducer;