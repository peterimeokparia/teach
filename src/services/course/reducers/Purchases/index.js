import produce from 'immer';

import { 
PURCHASE_HISTORY_BEGIN, 
PURCHASE_HISTORY_SUCCESS, 
PURCHASE_HISTORY_ERROR } from '../../actions/purchases';

const initialState = {
    buy: [],
    purchaseHistory: [],
    error: null,
    loading: false
};

const reducer = produce((draft, action) => {
    switch(action.type){

        case PURCHASE_HISTORY_BEGIN:
            draft.loading = true;  
            draft.error = null;
        return;     
        case PURCHASE_HISTORY_SUCCESS:
             draft.loading = false;
             draft.purchaseHistory = action.payload;  
        return;
        case PURCHASE_HISTORY_ERROR:
             draft.loading = false;  
             draft.error = action.error;  
        return; 
        default:
        return;
        
    } 
}, initialState);

export default reducer;