import produce from 'immer';

import { 
    ADD_NEW_LOGIN_BEGIN,
    LOAD_LOGINS_BEGIN,  
    ADD_NEW_LOGIN_SUCCESS,
    DELETE_LOGIN_SUCCESS,
    LOAD_LOGINS_SUCCESS,
    LOAD_SINGLE_USERS_LOGIN_SESSION_SUCCESS, 
    SAVE_LOGIN_BEGIN,
    SAVE_LOGIN_SUCCESS } from 'services/course/actions/logins';

const initialState = {
    loginsSaving:false,
    loginsLoaded:false,
    onLoginFail:null,
    logins:{},
    login:{}  
};

const reducer =  produce( (draft, action) => {
    switch(action.type){
        
        case ADD_NEW_LOGIN_BEGIN:
        case LOAD_LOGINS_BEGIN:
            draft.loginsLoaded = true;
            draft.onLoginFail = null;
        return;    
        case ADD_NEW_LOGIN_SUCCESS:    
             draft.loginsLoaded = false;
             draft.logins[action.payload?._id] = action.payload; 
        return;
        case SAVE_LOGIN_BEGIN: 
             draft.loginsSaving = true;
             draft.onLoginFail = null;
        return;
        case SAVE_LOGIN_SUCCESS: 
             draft.loginsSaving = false;
             draft.logins[action.payload?._id] = action.payload; 
        return;
        case LOAD_LOGINS_SUCCESS:
             draft.loginsLoaded = false;
             draft.logins = action.payload;
        return;
        case LOAD_SINGLE_USERS_LOGIN_SESSION_SUCCESS:
             draft.loginsLoaded = false;
             if ( action?.payload === null ) return;
             draft.logins = action.payload;
        return;     
        case DELETE_LOGIN_SUCCESS:
             delete draft.login[action.payload?._id];
        return;
        default:

    return;
    
    }
}, initialState);

export default reducer;