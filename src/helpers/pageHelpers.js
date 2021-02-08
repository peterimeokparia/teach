import React from 'react';

import {
serviceWorkerSupported,
send    
} from './pushNotifications';


export const newSiteUser = {
    firstname:"", 
    email:"",
    password:"",
    token: null,
    role: null,
    courses: [],
    numberOfCourseSessions: [],
    cart: [],
    cartTotal: 0,
    paymentStatus:"",
    userId: null,
    purchaseHistoryTimeStamp: null,
    inviteeSessionUrl: "",
    lessonInProgress: false,
    userIsValidated: false,
    nameOfLessonInProgress: "",
    loginCount: 0,
    meetingId: "",
    meetings: [],
    sessions: [],
    markDown: "",
    avatarUrl: "",
    files: [],
    classRooms: [],
    operatorId: "",
    timeMeetingStarted: null,
    timeMeetingEnded: null,
    assignments: [],
    exams: []
};


export const operatorUser = {
    firstName: "", 
    lastName: "",
    businessName: "",
    email: "",
    password: "",
    token: null,
    phone: "",
    timeJoined: Date.now()

};


export const role = {
    Tutor: "Tutor",
    Student: "Student"
};



export const cleanUrl = ( urlValue ) => {

    return urlValue?.replace(/\s+/g, "%20");
}; 



export const handlePushNotificationSubscription = ( subscribedUsers, user,  newSubscriptionAction, addDeviceToExistintSubscriptionAction ) => {
 
    let subscription = undefined;

    let subscribedUser = subscribedUsers?.find( user => user?.userId === user?._id );
   
    if ( serviceWorkerSupported() ) {

        subscription = send();
    }

    subscription
    .then(
        response => {

            let test = response;

            let endpointExists = subscribedUser?.subscriptions?.find( subscription => subscription?.endpoint === response?.endpoint );

            if  ( subscribedUser && (! endpointExists ) ) {

                addDeviceToExistintSubscriptionAction( { ...subscribedUser, subscriptions: [ ...subscribedUser?.subscriptions,  response ] } );

            } else {

                newSubscriptionAction( { userId: user?._id,  subscriptions: [ response ],  operatorId: user?.operatorId } );

            }
        }
    )
    .catch( error => console.error( error ));   
}


export const validateOperatorBusinessName = () => <div>{"Please verify the url"}</div> 


       
