const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const conceptSchema = new Schema ({
    title: { 
        type: String,
        required: true,
    },
    introduction: { 
        type: String,
        required: true,
    },
    type: { 
        type: String,
        required: true,
    },
    courseId: { 
        type: String, 
        required: true  
    },
    lessonOutcomeId: {
        type: Array,
        required: false
    },
    userId: {
        type: String, 
        required: true  
    },
    markDownContent: { 
        type: String, 
        required: false  
    },
    linkUrl: { 
        type: String, 
        required: false  
    },
    videoUrl: { 
         type: String, 
         required: false  
    },
    files: {
        type: Array,
        required: false
    },
    createDate: {
        type: Date, 
        required: false,
        default: Date.now  
    }
});

module.exports = conceptSchema;