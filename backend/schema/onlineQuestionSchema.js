import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const onlineQuestionSchema = new Schema ({
    formId: { 
        type: String, 
        required: false,
    },
    formType: { 
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
    type: { 
        type: String, 
        required: false,
    },
    placeHolderText: { 
        type: String, 
        required: false,
    },
    questionCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    answerExplanationMarkDownContent: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
        required: false,
    },
    answerKey: { 
        type: String, 
        required: false,
    },
    pointsAssigned: { 
        type: Number, 
        required: false,
    },
    pointsReceived: { 
        type: Number, 
        required: false,
    },
    onlineQuestionId: { 
        type: String, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false,
    },
    files: {
        type: Array,
        required: false
    },
    questionPushNotificationSubscribers: { 
        type: Array, 
        required: false,
    },
    questionEmailNotificationSubscribers: { 
        type: Array, 
        required: false,
    },
    savedQuestions: { 
        type: Array, 
        required: false,
    },
    questionDifficultyLevel: { 
        type: String, 
        required: false,
    },
    questionCreatedBy: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    },
    videoUrl: { 
        type: String, 
        required: false  
    },  
    xAxisformQuestionPosition: {
        type: Number,
        required: false
    },
    yAxisformQuestionPosition: {
        type: Number,
        required: false
    },
    xAxisColumnPosition: {
        type: Number,
        required: false
    },
    yAxisColumnPosition: {
        type: Number,
        required: false
    },
    columnMinWidth: {
        type: Number,
        required: false
    },
    columnMinHeight: {
        type: Number,
        required: false
    },
    columnAlign: { 
        type: String, 
        required: false  
    },  
});

export default onlineQuestionSchema;
