import {
getPushMessageConfigValues } from 'services/course/middleware/subscriptions/helpers'; 

export const getOnlineQuestionEmailMessageSubscribers = ( state, action ) => {
    let currentUser = Object.values( state.users.users )?.find(user => user?._id === action?.payload?.userId );

    let emailNotificationSubscribers = Object.values( state?.users?.users )
        ?.filter( user => action?.payload?.questionEmailNotificationSubscribers?.includes( user?._id ))
            ?.map(( user ) => { return { email: user?.email, userId: user?._id }; });

    return {
         currentUser,
         emailNotificationSubscribers
    };
};

export const getOnlineQuestionPushMessageSubscribers = ( state, action ) => {
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentSubscription = subscribedPushUsers?.filter( user => action?.payload?.questionPushNotificationSubscribers?.includes( user?.userId ));

    return {
        subscribedPushUsers,
        currentUser: configValues?.currentUser,
        currentSubscription
    };
};

export const getSavedOnlineQuestionPushMessageSubscribers = ( state, action ) => {
    // let configValues = getPushMessageConfigValues( state, action );
    // let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    // let currentUser = configValues?.currentUser;
    // let savedQuestionPushSubcribers = ( action?.payload?.savedQuestions === null || action?.payload?.savedQuestions === undefined ) 
    //                                    ? Object.values( state?.onlineQuestions?.onlineQuestions )?.find( question => question?._id === action?.payload?.onlineQuestionId )?.savedQuestions
    //                                    : action?.payload?.savedQuestions;
    // let currentSubscription = subscribedPushUsers?.filter( user => savedQuestionPushSubcribers?.includes( user?.userId ));
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentSubscription = subscribedPushUsers?.filter( user => action?.payload?.savedQuestions?.includes( user?.userId ));
    
    return {
        subscribedPushUsers,
        currentUser: configValues?.currentUser,
        currentSubscription
    };
};