class Calendar {

    constructor( calendarConfig ) {
        const {  
            userId, 
            calendarEventType, 
            operatorId, 
            users, 
            color  } = calendarConfig;

            this.userId = userId;
            this.calendarEventType = calendarEventType;
            this.operatorId = operatorId;
            this.firstName = users?.find(usr => usr?._id === userId)?.firstname;
            this.color = color;
            this.users = users;
    }

    calendar(){
        return{
            userId: this.userId,
            calendarEventType: this.calendarEventType,
            operatorId: this.operatorId,
            firstName: this.users?.find( usr => usr?._id === this.userId )?.firstname,
            color: this.color   
        };
    };
    
};

export default Calendar;