import {
getPushMessageConfigValues } from 'Services/course/MiddleWare/notifications/helpers';

export const getCourseEmailMessageSubscribers = ( state, action ) => {
    let currentUser = Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.userId );
    let courseEmailSubcribers = ( action?.payload?.courseEmailNotificationSubscribers === null || action?.payload?.courseEmailNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.courses?.courses )?.find( course => course?._id === action?.payload?._id )?.courseEmailNotificationSubscribers
                                       : action?.payload?.courseEmailNotificationSubscribers;

        courseEmailSubcribers = ( !courseEmailSubcribers?.includes( currentUser?._id ) ) 
                                       ? [ ...courseEmailSubcribers, currentUser?._id ] 
                                       : courseEmailSubcribers;
                                       
    let emailNotificationSubscribers = Object.values( state?.users?.users )?.filter( user => courseEmailSubcribers?.includes( user?._id ))?.map(( user ) => { return { email: user?.email, userId: user?._id }; });

    return {
         currentUser,
         emailNotificationSubscribers
    };
};

export const getCoursePushMessageSubscribers = ( state, action ) => {
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentUser = configValues?.currentUser;
    let coursePushSubcribers = ( action?.payload?.coursePushNotificationSubscribers === null || action?.payload?.coursePushNotificationSubscribers === undefined ) 
                                       ? Object.values( state?.courses?.courses )?.find( course => course?._id === action?.payload?._id )?.coursePushNotificationSubscribers
                                       : action?.payload?.coursePushNotificationSubscribers;

        coursePushSubcribers = ( !coursePushSubcribers?.includes( currentUser?._id ) ) 
                                        ? [ ...coursePushSubcribers, currentUser?._id ] 
                                        : coursePushSubcribers;

    let currentSubscription = subscribedPushUsers?.filter( user => coursePushSubcribers?.includes( user?.userId ));

    return {
         subscribedPushUsers,
         currentUser,
         currentSubscription
    };
};