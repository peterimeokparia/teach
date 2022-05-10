import { 
sendEmail } from 'services/course/api';

import Swal from 'sweetalert2';

export function handleAutoRenewPackageSessions( currentUser,  expiredPackages, autoRenewAction ) {
    if ( expiredPackages?.length === 0 )  return;
    try {      
        expiredPackages?.forEach(expiredPackage => {
            handleExpiredPackages( currentUser, expiredPackage, autoRenewAction ); 
        });
    } catch (error) {
        console.log( error );
    }
}

function handleExpiredPackages( currentUser, currentPackage, autoRenewAction ){
    if ( currentPackage?.autoRenew ) {
          Swal.fire( "Renewing your package." );
          autoRenewProcess( currentUser, currentPackage, autoRenewAction ); 
    } else {
            Swal.fire({
            title: `Package has expired. Do you want to renew this package?  ${currentUser?.nameOfLessonInProgress}`,
            icon: 'question',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: '#673ab7',
            cancelButtonText: 'No'
        }).then( (response) => {
            if ( response?.value ) {
                autoRenewProcess( currentUser, currentPackage,  autoRenewAction); //
            } else {         
                Swal.fire( `Please contact your tutor or the administrator.` );
            }
        });
    }
}

export function checkIfPackageIsSetToAutoRenew( currentUser,  sessions ){   
    let expiredSessions = [];

    if (  currentUser?.role === "Student" ) {
        sessions?.forEach(session => {
            if ( session?.typeOfSession === "Package" &&  session?.numberOfSessions === session?.totalNumberOfSessions ) {    
                expiredSessions.push( session );
            };
        });
    }
    return expiredSessions;
}

export function autoRenewProcess( currentUser, currentSession, renewalPackageAction ){
    renewalPackageAction( currentUser, currentSession );
}

export function sendRenewalNotification( currentUser, currentSession,  onrenewal ) {
    if ( onrenewal ) {
        sendEmailConfirmation( currentSession, currentUser );
    } else {
      sendEmailToAdministrator( currentUser );
      return;
    }
}

export function sendEmailConfirmation( currentSession, currentUser ){
    const msg = `<h3> AutoRenewal Receipt</h3> <div>Package Renewed Successfully </div>` +
    `<div> Type of session: ${currentSession?.typeOfSession} </div>` +
    `<div> Number of sessions: ${currentSession?.numberOfSessions} </div>` +
    `<div> Total Number of sessions: ${currentSession?.totalNumberOfSessions} </div>`;

    let messageOptions = {
        from: "teachpadsconnect247@gmail.com",
        to: "peter.imeokparia@gmail.com",
        subject: "AutoRenewal Receipt",
        messageBody: msg,
        userId: currentUser?._id
    };

    sendEmail(
        messageOptions.from,
        messageOptions.to,
        messageOptions.subject,
        messageOptions.messageBody,
        messageOptions.userId    
    );

    Swal.fire( msg ); 
}

export function sendEmailToAdministrator( currentUser ){
    const msg = `<h3> AutoRenewal Failed</h3>`  + 
                `<div>We were not able to renew your package. </div>` + 
                `<div>An email has been sent to the administrator. </div>`;

    let messageOptions = {
        from: "teachpadsconnect247@gmail.com",
        to: "peter.imeokparia@gmail.com",
        subject: "AutoRenewal Failed",
        messageBody: msg,
        userId: currentUser?._id
    };

    sendEmail(
        messageOptions.from,
        messageOptions.to,
        messageOptions.subject,
        messageOptions.messageBody,
        messageOptions.userId    
    );
    Swal.fire( msg );
}
