import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

//Build new exam from existing set of questions

const questionFormSchema = new Schema ({
   
    questionNumber:{
        type: String,
        required: false,
    },
    type:{
        type: String,
        required: false,
    },
    markDownContent:{
        type: String,
        required: false,
    },
    value:{
        type: String,
        required: false,
    },
    multipleChoiceQuestionAnswerKey:{
        type: String,
        required: false,
    },
    multipleChoiceQuestionExplanationAnswer:{
        type: String,
        required: false,
    },
    multipleChoiceQuestionPoints:{
        type: Number,
        required: false,
    },
    questionCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    explanationQuestionMarkDownContent:{
        type: String,
        required: false,
    },
    explanationQuestionAnswerKeyMarkDownContent:{
        type: String,
        required: false,
    },
    explanationQuestionPoints:{
        type: Number,
        required: false,
    },
    formFieldGroupCollection:{
        type: Array,
        required: false,
    },
    questionTotalPoints:{
        type: Number,
        required: false,
    },
    lessonId: { 
        type: String, 
        required: false,
    },
    studentId: { 
        type: String, 
        required: false,
    },
    files: {
        type: Array,
        required: false
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
    coursesCovered: {
        type: Array,
        required: false
    }, 
    lessonsCovered:{
        type: Array,
        required: false
    },   
    examId: { 
        type: String, 
        required: false,
    },
    assignmentId: { 
        type: String, 
        required: false,
    },
    videoUrl: { 
        type: String, 
        required: false  
    }
});

export default questionFormSchema;