class CalendarEvent {

    constructor( calendarEventConfig ) {
        const { 
            calendar, 
            calendarEventData, 
            testAdminUsers, 
            calendarEventType, 
            courseId,
            lessonId,
            operatorId, 
            pushNotificationSubscribers, 
            user, 
            users,
            color
         } = calendarEventConfig;

        let emailAddresses = Object.values(users)?.filter(user => testAdminUsers.includes(user?._id))?.map(user => user?.email);

        this.calendarId = calendar?._id;
        this.userId = user?._id;
        this.event = { ...calendarEventData?.event, color: ( calendar?.color ) ? calendar?.color : color };
        this.location = calendarEventData?.location;
        this.schedulingData = calendarEventData?.schedulingData;
        this.consultation = calendarEventData?.consultation;
        this.calendarEventType = calendarEventType;
        this.courseId = courseId;
        this.lessonId = lessonId;
        this.operatorId = operatorId;
        this.color = ( calendar?.color ) ? calendar?.color : color;
        this.currentUser = user;
        this.pushNotificationUser = pushNotificationSubscribers?.filter(subscriber => testAdminUsers.includes( subscriber?.userId ) );  
        this.emailAddresses = emailAddresses;   
    }

    eventDataObject(){
        return    {
            currentUser: this.currentUser, 
            pushNotificationUser: this.pushNotificationUser,  
            emailAddresses: this.emailAddresses,
            event: {
                calendarId: this.calendarId, 
                userId: this.userId,
                event: this.event,
                location: this.location,
                schedulingData: this.schedulingData,
                consultation: this.consultation,
                calendarEventType: this.calendarEventType,
                courseId: this.courseId,
                lessonId: this.lessonId,
                operatorId: this.operatorId,
                color: this.color 
            }
        };
    }
};

export default CalendarEvent;
