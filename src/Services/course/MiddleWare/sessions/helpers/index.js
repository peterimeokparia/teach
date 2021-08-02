import {
    LAST_LOGGEDIN_USER } from 'services/course/actions/users';
    
    import {
    setAutoRenewPackageStatus } from 'services/course/actions/sessions';
    
    import { 
    sendEmailConfirmation } from 'services/course/pages/Packages/helpers';
    
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