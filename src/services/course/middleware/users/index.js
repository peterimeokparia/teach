import { 
BUY_COURSE_SUCCESS,     
LOGIN_SUCCESS, 
LOGOUT_SUCCESS, 
LAST_LOGGEDIN_USER,
RESET_USERS_CART,
UPDATE_USER,
SIGN_UP_SUCCESSS } from 'services/course/actions/users';

import {
OPERATOR_SIGN_UP_SUCCESSS } from 'services/course/actions/operator';

import {
handleCartOnPurchase,
handleOperatorSignUpSuccess,
handleSignUpSuccess } from 'services/course/middleware/users/helpers';

import { 
setToken } from 'services/course/helpers/ServerHelper';

import { 
setAuthToken } from 'services/course/api';

import jstz from 'jstz';

export const users = store => next =>  action => {
     const timeZone = jstz?.determine();

     switch(action.type){
          
          case SIGN_UP_SUCCESSS:  
               handleSignUpSuccess( action.payload, store ); 
               next(action);
          return;
          case OPERATOR_SIGN_UP_SUCCESSS:  
               handleOperatorSignUpSuccess( action.payload );
               next(action);
          return;
          case BUY_COURSE_SUCCESS:  
               handleCartOnPurchase( action.payload, store );
               next(action);
          return;
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
          
          };
};