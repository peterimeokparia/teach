import produce from 'immer';

import { 
SEND_EMAIL_SUCCESS, 
SEND_EMAIL_ERROR } from '../../actions/emails';

const initialState = {
    emails:{},
    onError: null  
};

const reducer =  produce( (draft, action) => {
    switch(action.type){

    case SEND_EMAIL_SUCCESS:
        console.log(action.payload);
        draft.emails = action.payload;  
    return;
    case SEND_EMAIL_ERROR:
        draft.onError = action.error; 
    return;
    default:
    return;
    
    }
}, initialState);

export default reducer;