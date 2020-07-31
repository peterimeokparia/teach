import produce from 'immer';
import { BUY_COURSE_BEGIN,  BUY_COURSE_SUCCESS, BUY_COURSE_ERROR, 
              PURCHASE_HISTORY_BEGIN, PURCHASE_HISTORY_SUCCESS, PURCHASE_HISTORY_ERROR } from '../services/course/actions';


const initialState = {
    buy: [],
    purchaseHistory: [],
    error: null,
    loading: false
};


const reducer = produce((draft, action) => {
    switch(action.type){
        // case BUY_COURSE_BEGIN:  
        case PURCHASE_HISTORY_BEGIN:
            draft.loading = true;  
            draft.error = null;
        return;     
        // case BUY_COURSE_SUCCESS:
        //      draft.loading = false;  
        //      draft.buy = action.payload;   
        // return;
        case PURCHASE_HISTORY_SUCCESS:
             draft.loading = false;
             draft.purchaseHistory = action.payload;  
        return;
        // case BUY_COURSE_ERROR:  
        case PURCHASE_HISTORY_ERROR:
             draft.loading = false;  
             draft.error = action.error;  
        return; 
        default:
        return;

    }
    
}, initialState);


export default reducer;