import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

// To DO: Shared amongs tutors: Build new exam(s) & quizzes from existing set of questions - in progress
const formFieldSchema = new Schema ({
   
    formId:{
        type: String,
        required: false,
    },
    fieldId:{
        type: String,
        required: false,
    },
    parentComponentId:{
        type: String,
        required: false,
    },
    formFieldGroupId:{
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
    formUuId:{
        type: String,
        required: false,
    },
    enableFormFieldGroup:{
        type: Boolean,
        required: false,
    },
    selected: {
        type: Boolean,
        required: false,
    },
    inputType:{
        type: String,
        required: false,
    },
    inputValue:{
        type: String,
        required: false,
    },
    dropDownOptions: { 
        type: Array, 
        required: false,
    },
    labelType:{
        type: String,
        required: false,
    },
    labelValue:{
        type: String,
        required: false,
    },
    formFieldCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    formFieldSavedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    formFieldCreatedBy: { 
        type: String, 
        required: false,
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    answer: { 
        type: String, 
        required: false,
    },
    answerKey: { 
        type: String, 
        required: false,
    },
    pointsRecived: { 
        type: Number, 
        required: false,
    },
    points: { 
        type: Number, 
        required: false,
    },
    xAxisformFieldPosition: {
        type: Number,
        required: false
    },
    yAxisformFieldPosition: {
        type: Number,
        required: false
    },
    files: { 
        type: Array, 
        required: false,
    },
    videoUrl: { 
        type: String, 
        required: false,
    },
    questionId:{
        type: String,
        required: false,
    },
    userId:{
        type: String,
        required: false,
    },
    examId: { 
        type: String, 
        required: false,
    },
    eventId: { 
        type: String, 
        required: false,
    }
});

export default formFieldSchema;