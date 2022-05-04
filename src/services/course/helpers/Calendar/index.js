class Calendar {

    constructor( calendarConfig ) {
        const {  
            courseId,
            lessonId,
            classRoomId,
            userId, 
            calendarEventType, 
            operatorId, 
            users, 
            color  } = calendarConfig;

            this.courseId = courseId;
            this.lessonId = lessonId;
            this.classRoomId = classRoomId;
            this.userId = userId;
            this.calendarEventType = calendarEventType;
            this.operatorId = operatorId;
            this.firstName = users?.find(usr => usr?._id === userId)?.firstname;
            this.color = color;
            this.users = users;
    }

    calendar(){
        return{
            courseId: this.courseId,
            lessonId: this.lessonId,
            classRoomId: this.classRoomId,
            userId: this.userId,
            calendarEventType: this.calendarEventType,
            operatorId: this.operatorId,
            firstName: this.users?.find( usr => usr?._id === this.userId )?.firstname,
            color: this.color   
        };
    };
    
};

export default Calendar;