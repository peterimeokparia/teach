const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const calendarSchema = new Schema ({
    userId: { 
        type: String, 
        required: true  
    },
    courseId: { 
        type: String, 
        required: false  
    },
    lessonId: { 
        type: String, 
        required: false  
    },
    classRoomId: { 
        type: String, 
        required: false  
    },
    calendarEventType: { 
        type: String, 
        required: true  
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    firstName: {
        type: String, 
        required: false  
    },
    backgroundColor: {
        type: String,
        required: false
    },
    textColor: {
        type: String,
        required: false
    },
    url: {
        type: String,
        required: false
    },
    color: {
        type: String,
        required: false
    },
    timeLineGroup: {
        id: {
            type: String, 
            required: false  
        },
        title: {
            type: String, 
            required: false  
        },
        rightTitle: {
            type: String, 
            required: false  
        },
        color: {
            type: String, 
            required: false  
        },
    }
});

module.exports = calendarSchema;