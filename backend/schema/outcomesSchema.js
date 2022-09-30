import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const outcomesSchema = new Schema ({
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
    quizzId: { 
        type: String, 
        required: false  
    },
    homeWorkId: { 
        type: String, 
        required: false  
    },
    examId: { 
        type: String, 
        required: false  
    },
    userId: {
        type: String, 
        required: false  
    },
    comments: { 
        type: String, 
        required: false,
    },
    outcomeCreationDate: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    outcomeCompletionDate: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    operatorId: { 
        type: String, 
        required: false,
    },
    eventId: {
        type: String, 
        required: false  
    }, 
    parentId: {
        type: String, 
        required: false  
    },
    outcomeType: {
        type: String, 
        required: false  
    }, 
    color: {
        type: String,
        required: false
    },
    outcomeName: { 
        type: String, 
        required: false,
    },
    lessonConcepts: { 
        type: Array, 
        required: false  
    },
    links: { 
        type: Array, 
        required: false  
    }
});

export default outcomesSchema;