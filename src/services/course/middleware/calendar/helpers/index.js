import {
sendEmail } from 'services/course/api';

import {
saveCalendar } from 'services/course/actions/calendar';

import {
addEvent } from 'services/course/actions/event';

import {
sendPushNotificationMessage } from 'services/course/actions/notifications';

const emailMessageConfig = {
    sendersEmailAddress: "teachpadsconnect247@gmail.com",
    emailHeader: "Welcome to teach!",
};

export const addCalendarEventsOnAddingANewCalendar = ( calendar, store ) => {
    try {
                let eventConfig = {
                    event: {
                        calendarId: calendar?._id, 
                        userId: calendar?.currentUser?._id,
                        event: calendar?.event,
                        location: calendar?.location,
                        schedulingData: calendar?.schedulingData,
                        consultation: calendar?.consultation,
                        calendarEventType: calendar?.calendarEventType,
                        operatorId: calendar?.operatorId,
                        color: calendar?.color
                    },
                    currentUser: calendar?.currentUser, 
                    pushNotificationUser: calendar?.pushNotificationUser, 
                    emailAddresses: calendar?.emailAddresses 
                };

                store?.dispatch( addEvent( eventConfig ) );
    } catch (error) {
        throw Error(`Problem with adding a calendar event: ${ error }`);
    }
};

export const addCalendarTimeLineGroupOnAddingANewCalendar = ( calendar, store ) => {
    try {
        store?.dispatch( saveCalendar({
            ...calendar, 
            timeLineGroup: { 
                id: calendar?._id, 
                title: `${calendar?.firstName}_${calendar?._id}`, 
                rightTitle: `${calendar?.firstName}_${calendar?._id}`, 
                color: calendar?.color 
            }
        }));
    } catch (error) {
        throw Error(`Problem with adding a calendar time line group: ${ error }`);
    }
};

export const sendPushNotificationsAfterDeletingACalendar = ( calendar, store ) => {
    try {
    //     store.dispatch(sendPushNotificationMessage( 
    //         calendar?.pushNotificationUser, { 
    //        title:`${  calendar?.currentUser?.firstname } Deleted A Calendar!`, 
    //        body:`Deleted Calendar: ${  calendar?.calendar?._id }` 
    //    })); 
    } catch (error) {
        console.error( `Problem with notifying users after deleting calendar`);
    }
};

export const sendEmailNotificationsAfterDeletingACalendar = ( calendar ) => {
    try {
    //     sendEmail(
    //     emailMessageConfig?.sendersEmailAddress,
    //     calendar?.currentUser?.email, 
    //     emailMessageConfig?.emailHeader, 
    //     `${  calendar?.currentUser?.firstname } Deleted A Calendar!`,
    //     calendar?.currentUser?._id
    // );
    } catch (error) {
        console.error( `Problem with notifying users after deleting calendar`);
    }
};
