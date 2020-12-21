import { 
SIGN_UP_SUCCESS, 
LOGIN_SUCCESS, 
LOGOUT_SUCCESS, 
LAST_LOGGEDIN_USER, 
RESET_USERS_CART } from "./services/course/actions";

import { 
setToken } from "./helpers/serverHelper";

import { 
setAuthToken } from "./services/course/api";


export const saveAuthToken = store => next =>  action => {

    // if ( action.type === LOGIN_SUCCESS || action.type === SIGN_UP_SUCCESS || action.type === LAST_LOGGEDIN_USER) {

    if ( action.type === LOGIN_SUCCESS  ||  action.type === LAST_LOGGEDIN_USER ) {

        setToken(action.payload?.token); 

        setAuthToken(action.payload?.token);
    
         sessionStorage.removeItem('lastState');
         sessionStorage.setItem('currentuser', JSON.stringify(action.payload));
         sessionStorage.setItem('lastState', JSON.stringify(action.payload));
    }

    if ( action.type === RESET_USERS_CART ) {
         sessionStorage.setItem('lastState', JSON.stringify(action.payload));
    }


    if ( action.type === LOGOUT_SUCCESS ) {

          setToken(null);
          sessionStorage.removeItem('currentuser');
    }

     next(action);
   
 
}