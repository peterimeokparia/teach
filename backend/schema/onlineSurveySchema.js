import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const onlineSurveySchema = new Schema ({
    type: { 
        type: String, 
        required: false,
    },
    placeHolderText: { 
        type: String, 
        required: false,
    },
    surveyCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
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
    surveyCreatedBy: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

export default onlineSurveySchema;

