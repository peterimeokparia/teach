import {
getPushMessageConfigValues } from 'services/course/middleware/subscriptions/helpers';

export const getCourseEmailMessageSubscribers = ( state, action ) => {
    let currentUser = Object.values( state?.users?.users )?.find(user => user?._id === action?.payload?.user.userId );                                       
    let emailNotificationSubscribers = Object.values( state?.users?.users )
        ?.filter( user => action?.payload?.course?.courseEmailNotificationSubscribers?.includes( user?._id ))
            ?.map(( user ) => { return { email: user?.email, userId: user?._id }; });
            
    return {
         currentUser,
         emailNotificationSubscribers
    };
};

export const getCoursePushMessageSubscribers = ( state, action ) => {
    let configValues = getPushMessageConfigValues( state, action );
    let subscribedPushUsers = configValues?.allSubscribedPushUsers;
    let currentUser = configValues?.currentUser;
    let currentSubscription = subscribedPushUsers?.filter( user => action?.payload?.course.coursePushNotificationSubscribers?.includes( user?.userId ));

    return {
         subscribedPushUsers,
         currentUser,
         currentSubscription
    };
};