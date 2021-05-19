import { 
LOGIN_SUCCESS, 
LOGOUT_SUCCESS, 
LAST_LOGGEDIN_USER,
RESET_USERS_CART,
UPDATE_USER } from "Services/course/Actions/Users";

import { 
setToken } from "Services/course/helpers/ServerHelper";

import { 
setAuthToken } from "Services/course/Api";

import jstz from 'jstz';


export const saveAuthToken = store => next =>  action => {

     const timeZone = jstz?.determine();
     
     switch(action.type){
          case LOGIN_SUCCESS:
          case LAST_LOGGEDIN_USER:     
               setToken(action.payload?.token); 
               setAuthToken(action.payload?.token);
               sessionStorage.removeItem('lastState');
               sessionStorage.setItem('currentuser', JSON.stringify(action.payload));
               sessionStorage.setItem('lastState', JSON.stringify(action.payload));
               sessionStorage.setItem('timeZone', timeZone?.name());
               next(action);
          return;
          case UPDATE_USER:
               sessionStorage.clear();
               sessionStorage.setItem('currentuser', JSON.stringify(action.payload[0]));
               sessionStorage.setItem('lastState', JSON.stringify(action.payload[0]));
               next(action); 
          return;
          case RESET_USERS_CART:  
               sessionStorage.setItem('lastState', JSON.stringify(action.payload));
               next(action);
          return;
          case LOGOUT_SUCCESS:
               setToken(null);
               sessionStorage.removeItem('currentuser');
               next(action);
          return; 
          default:
               next(action);
          return;
      }
     

     // if ( action.type === LOGIN_SUCCESS  ||  action.type === LAST_LOGGEDIN_USER ) {
     //      setToken(action.payload?.token); 
     //      setAuthToken(action.payload?.token);
     //      sessionStorage.removeItem('lastState');
     //      sessionStorage.setItem('currentuser', JSON.stringify(action.payload));
     //      sessionStorage.setItem('lastState', JSON.stringify(action.payload));
     // }

     // if ( action.type === UPDATE_USER ) {
     //      sessionStorage.clear();
     //      sessionStorage.setItem('currentuser', JSON.stringify(action.payload[0]));
     //      sessionStorage.setItem('lastState', JSON.stringify(action.payload[0])); 
     // }

     // if ( action.type === RESET_USERS_CART ) {
     //      sessionStorage.setItem('lastState', JSON.stringify(action.payload));
     // }

     // if ( action.type === LOGOUT_SUCCESS ) {
     //      setToken(null);
     //      sessionStorage.removeItem('currentuser');
     // }
     // next(action);
}