const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const onlineQuestionAnswersCommentsSchema = new Schema ({
    onlineQuestionId: { 
        type: String, 
        required: false,
    },
    onlineQuestionAnswerId: { 
        type: String, 
        required: false,
    },
    childComments: {
        type: Array,
        required: false
    },
    commentParentId: { 
        type: String, 
        required: false,
    },
    commentDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    commentBy: {
        type: String, 
        required: false,
    },
    inputValue:{ 
        type: String, 
        required: false,
    },
    markDownContent: { 
        type: Schema.Types.Mixed, 
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
    operatorId: { 
        type: String, 
        required: false  
    },
    videoUrl: { 
        type: String, 
        required: false  
    },
    color: { 
        type: String, 
        required: false  
    }
});

module.exports = onlineQuestionAnswersCommentsSchema;

