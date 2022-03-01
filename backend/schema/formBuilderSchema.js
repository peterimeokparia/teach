import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

// To DO: Shared amongs tutors: Build new exam(s) & quizzes from existing set of questions
const formBuilderSchema = new Schema ({
    operatorBusinessName:{
        type: String,
        required: false,
    },
    formType:{
        type: String,
        required: false,
    },
    formName:{
        type: String,
        required: false,
    },
    formDisplayName:{
        type: String,
        required: false,
    },
    formId:{
        type: String,
        required: false,
    },
    lessonId:{
        type: String,
        required: false,
    },
    courseId:{
        type: String,
        required: false,
    },
    formUuId:{
        type: String,
        required: false,
    },
    createDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    takingDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    createdBy: { 
        type: String, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false,
    },
    status: { 
        type: String, 
        required: false,
    },
    state: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: false
    },
    orderedFormQuestions: {
        type: Array,
        required: false
    },
    eventId: { 
        type: String, 
        required: false,
    }
});

export default formBuilderSchema;