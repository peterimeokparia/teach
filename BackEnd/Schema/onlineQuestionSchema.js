import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const onlineQuestionSchema = new Schema ({
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
    }
});

export default onlineQuestionSchema;

