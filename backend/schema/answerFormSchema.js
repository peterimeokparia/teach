const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const answerFormSchema = new Schema ({
    questionId: { 
        type: String, 
        required: false,
    },
    type: { 
        type: String, 
        required: false,
    },
    answerDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    multipleChoiceQuestionAnswer:{
        type: String,
        required: false,
    },
    multipleChoiceQuestionAnswerPointsReceived:{
        type: Number,
        required: false,
    },
    explanationQuestionAnswerPointsReceived:{
        type: Number,
        required: false,
    },
    questionTotalPointsReceived:{
        type: Number,
        required: false,
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
        required: false,
    },
    lessonId: { 
        type: String, 
        required: false,
    },
    examId: { 
        type: String, 
        required: false,
    },
    assignmentId: { 
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
    answerBy: {
        type: String, 
        required: false  
    },
    videoUrl: { 
        type: String, 
        required: false  
    }
});

module.exports = answerFormSchema;

