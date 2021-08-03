import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const calendarSchema = new Schema ({
    userId: { 
        type: String, 
        required: true  
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

export default calendarSchema;