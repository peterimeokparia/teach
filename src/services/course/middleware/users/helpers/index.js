import {
add,
updateUser,
sendEmail } from 'services/course/api';

import {
getHostName } from 'services/course/helpers/PageHelpers';

import {
RESET_USERS_CART,
LAST_LOGGEDIN_USER } from 'services/course/actions/users';

import {
addNewLoginSession,
saveLoginSession } from 'services/course/actions/logins';

import {
getItemFromSessionStorage } from 'services/course/helpers/ServerHelper';

import { 
addTime,
saveTime } from 'services/course/actions/countdowntimer';

const emailMessageConfig = {
    sendersEmailAddress: "teachpadsconnect247@gmail.com",
    emailHeader: "Welcome to teach!",
};

const routePrefix = getHostName() ? "http://localhost:3000" : `https://ravingfanstudents.com`;

export const logLogOutTime = ( loginSession, store ) => {

    let currentLoginSession = loginSession;

    let loginConfig = { 
        ...currentLoginSession,
        logOutTime: Date.now()
     };

    store?.dispatch( saveLoginSession( currentLoginSession?._id, loginConfig ) ); 
};

export const handleCartOnPurchase = ( user, store ) => {
    if (!user || !store ) return;
    user.cart?.forEach(( course ) => {
        add( courseConfig( course ), `/sessions`)
        .then(session => {
            updateStudentsSession( user, store, session );
            updateTutorsSession( course, store, session );           
        })
        .catch(error => {  
            console.log( error );
        });
    });
};

export const handleSignUpSuccess = ( user, store ) => {
    if (!user) return;

    let currentState = store?.getState();

    let operatorBusinessName = (currentState?.operators?.operators[user?.operatorId])?.businessName;
    
    try {
        sendEmail(
            emailMessageConfig?.sendersEmailAddress, // change
            user?.email, 
            emailMessageConfig?.emailHeader, // too specific change
            `Kindly verify your account ${routePrefix}/${operatorBusinessName}/accountverification/${user?._id}`,
            user?._id
        );
        
        sendEmail(
            emailMessageConfig?.sendersEmailAddress,
            user?.email, 
            emailMessageConfig?.emailHeader,
            `Your credentials: ${user.firstname}, ${user.password}`,
            user?._id
        );
    } catch (error) {
        console.error( `Problem sending sign up success email message(s)${ error }`);   
    }
};

export const handleOperatorSignUpSuccess = ( operator ) => {
    if ( !operator ) return;
    try {
        sendEmail(
            emailMessageConfig?.sendersEmailAddress,
            operator?.email, 
            emailMessageConfig?.emailHeader,
            `Your credentials: ${operator.email}, ${operator.password}. Your website url: ${routePrefix}/${operator?.businessName}/login`,
            operator?._id
        );
    } catch (error) {
        console.error( `Problem sending operator sign up success email message(s)${ error }`);  
    }
};

const updateStudentsSession = ( user, store, session ) => {
    updateUser({ ...user, sessions: [ ...user?.sessions, session?._id ], cart: [],  
        cartTotal: 0, paymentStatus: "" })
    .then( user => {
        store?.dispatch({ type: RESET_USERS_CART, payload: user }); 
        store?.dispatch({ type: LAST_LOGGEDIN_USER, payload : user }); 
    })
    .catch( error => console.log( error ) );
};

const updateTutorsSession = ( course, store, session  ) => {
    updateUser({ ...course?.tutor, sessions: [ ...course?.tutor?.sessions, session?._id ] })
    .then(tutor => {
        console.log( `updating: ${ tutor?.email }`);
    })
    .catch(error => console.log(error));  
};

function courseConfig( course ) {
    return { 
        courseId: course?.course?._id, 
        typeOfSession: course?.sessionType,  
        numberOfSessions: parseInt(course?.numberOfSessions,10), 
        totalNumberOfSessions: parseInt(course?.totalNumberOfSessions,10), 
        userId: course?.userId,
        tutorId: course?.tutor?._id,
        startDate: Date.now(),
        status: true,
        autoRenew: course.autoRenew
    };
};  

export const handleFormBuilderTimer = (store) => {
    let timer = getItemFromSessionStorage('formbuildertimer');

    if ( !timer ) {
        return Error('no form builder timer set');
    }

    if ( timer && timer?._id ){
       
        store?.dispatch( saveTime( timer  ) );
        return;
    } 

    store?.dispatch( addTime( { formType: timer?.formType, formName: timer?.formName, formUuId: timer?.formUuId, userId: timer?.userId, testTime: timer?.testTime, role: timer?.role } ) );
}

