export const initializeEventForm = currentEvent => {
    return {
        title : currentEvent ? currentEvent?.event?.title : '',
        location : currentEvent ? currentEvent?.location : '',
        startTime : currentEvent ?  ( currentEvent?.event?.recurringEvent ) ? currentEvent?.event?.rrule?.dtstart : currentEvent?.event?.start : new Date(),
        endTime : currentEvent ? currentEvent?.event?.end : new Date(),
        allDay : currentEvent ? currentEvent?.event?.allDay : false,
        recurringEvent : currentEvent ?  ( currentEvent?.event?.recurringEvent ) : false,
        weekDays : currentEvent ? currentEvent?.event?.weekDays : [],
        endDate : ( currentEvent?.event?.recurringEvent ) ? currentEvent?.event?.rrule?.until : new Date(), 
        frequency : currentEvent ? currentEvent?.event?.rrule?.freq : '',
        interval : currentEvent ? currentEvent?.event?.rrule?.interval : 1,
        duration : currentEvent ? currentEvent?.event?.duration : 1,
        schedulingData : ( currentEvent?.schedulingData?.length > 0 ) ? currentEvent?.schedulingData : [],
        consultation: ( currentEvent?.consultation ) ? currentEvent?.consultation : { coursesInterestedIn: [] }
    };
};