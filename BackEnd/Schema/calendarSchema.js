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
    calendarEvents: {
        type: Array,
        required: true
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});


export default calendarSchema;