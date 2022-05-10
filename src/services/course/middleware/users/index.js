import { 
setItemInSessionStorage } from 'services/course/helpers/ServerHelper';

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
ADD_NEW_LOGIN_SUCCESS } from 'services/course/actions/logins';

import {
handleCartOnPurchase,
handleOperatorSignUpSuccess,
handleSignUpSuccess,
handleFormBuilderTimer,
logLogOutTime } from 'services/course/middleware/users/helpers';

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
               setItemInSessionStorage('currentuser', action.payload);
               setItemInSessionStorage('lastState', action.payload);
               setItemInSessionStorage('timeZone', timeZone?.name());
               next(action);
          return;
          case UPDATE_USER:
               sessionStorage.clear();
               setItemInSessionStorage('currentuser', action.payload[0]);
               setItemInSessionStorage('lastState', action.payload[0]);
               next(action); 
          return;
          case RESET_USERS_CART:  
               setItemInSessionStorage('lastState', action.payload);
               next(action);
          return;
          case ADD_NEW_LOGIN_SUCCESS:  
               setItemInSessionStorage('currentlogins', action.payload);
               next(action);
          return;
          case LOGOUT_SUCCESS:
               setToken(null);
               logLogOutTime( JSON.parse( sessionStorage?.getItem('currentlogins')), store );
               sessionStorage.removeItem('currentuser');
               sessionStorage.removeItem('currentlogins');
               handleFormBuilderTimer(store)
               next(action);
          return; 
          default:
               next(action);
          return;
          
          };
};