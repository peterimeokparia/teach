import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const notesSchema = new Schema ({
    title: { 
        type: String,
        required: false,
    },
    courseId: { 
        type: String, 
        required: false  
    },
    lessonId: { 
        type: String, 
        required: false  
    },
    userId: {
        type: String, 
        required: false  
    },
    markDownContent: { 
        type: Schema.Types.Mixed, 
        required: false  
    },
    content: { 
        type: String, 
        required: false  
    },
    noteDate: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    operatorId: { 
        type: String, 
        required: false,
    },
    operatorBusinessName: { 
        type: String, 
        required: false,
    },
    eventId: {
        type: String, 
        required: false  
    }, 
    outcomeId: {
        type: String, 
        required: false  
    },
    color: {
        type: String, 
        required: false  
    },
    noteType: {
        type: String, 
        required: false  
    }
});

export default notesSchema;