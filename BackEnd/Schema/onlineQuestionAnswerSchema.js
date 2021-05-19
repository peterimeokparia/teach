import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const onlineQuestionAnswerSchema = new Schema ({
    onlineQuestionId: { 
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
    markDownContent: { 
        type: String, 
        required: false,
    },
    courseId: { 
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

export default onlineQuestionAnswerSchema;

