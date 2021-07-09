import { 
AUTO_RENEW_PACKAGE_SUCCESS,
AUTO_RENEW_PACKAGE_ERROR } from 'Services/course/Actions/Sessions';

import { 
sendEmailToAdministrator } from 'Services/course/Pages/Packages/helpers';

import {
sendUpdatesAfterRenewingUsersSessionPackage } from 'Services/course/MiddleWare/sessions/helpers';

export const sessions = store => next =>  action => {
     switch(action.type){
          
          case AUTO_RENEW_PACKAGE_SUCCESS:
               sendUpdatesAfterRenewingUsersSessionPackage( action.payload, store ); 
               next(action);
          return;
          case AUTO_RENEW_PACKAGE_ERROR: 
               sendEmailToAdministrator( action.payload?.currentUser );
               next(action);
          return;
          default:
               next(action);
          return;
          
      };
};