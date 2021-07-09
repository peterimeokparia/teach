import {
LAST_LOGGEDIN_USER } from 'Services/course/Actions/Users';

import {
setAutoRenewPackageStatus } from 'Services/course/Actions/Sessions';

import { 
sendEmailConfirmation } from 'Services/course/Pages/Packages/helpers';

export const sendUpdatesAfterRenewingUsersSessionPackage = ( response, store ) => {
    try {
        sendEmailConfirmation( response.Session, response.User );
        store?.dispatch( setAutoRenewPackageStatus( { ...response.User, paymentStatus:"" }) );
        store?.dispatch({
            type: LAST_LOGGEDIN_USER, 
            payload: {
                ...response.User,
                paymentStatus: ""
            }
        });
    } catch (error) {
        console.error(`Problem with updating user after renewing session: ${ error }`);
    }
};