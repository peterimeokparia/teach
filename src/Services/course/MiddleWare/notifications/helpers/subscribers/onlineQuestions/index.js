import {
getPushMessageConfigValues } from 'Services/course/MiddleWare/notifications/helpers';

export const getOnlineQuestionEmailMessageSubscribers = ( state, action ) => {
    let currentUser = Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.userId );
    let questionEmailSubcribers = ( action?.payload?.questionEmailNotificationSubscribers === null || action?.payload?.questionEmailNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.questionEmailNotificationSubscribers
                                       : action?.payload?.questionEmailNotificationSubscribers;
    let emailNotificationSubscribers = Object.values( state?.users?.users )?.filter( user => questionEmailSubcribers?.includes( user?._id ))?.map(( user ) => { return { email: user?.email, userId: user?._id }; });

    return {
         currentUser,
         emailNotificationSubscribers
    };
};

export const getOnlineQuestionPushMessageSubscribers = ( state, action ) => {
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentUser = configValues?.currentUser;
    let questionPushSubcribers = ( action?.payload?.questionPushNotificationSubscribers === null || action?.payload?.questionPushNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.questionPushNotificationSubscribers
                                       : action?.payload?.questionPushNotificationSubscribers;
    let currentSubscription = subscribedPushUsers?.filter( user => questionPushSubcribers?.includes( user?.userId ));

    return {
        subscribedPushUsers,
        currentUser,
        currentSubscription
    };
};

export const getSavedOnlineQuestionPushMessageSubscribers = ( state, action ) => {
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentUser = configValues?.currentUser;
    let savedQuestionPushSubcribers = ( action?.payload?.savedQuestions === null || action?.payload?.savedQuestions === undefined ) 
                                       ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.savedQuestions
                                       : action?.payload?.savedQuestions;
    let currentSubscription = subscribedPushUsers?.filter( user => savedQuestionPushSubcribers?.includes( user?.userId ));
    
    return {
        subscribedPushUsers,
        currentUser,
        currentSubscription
    };
};