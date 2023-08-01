const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const lessonSchema = new Schema ({
    title: { 
        type: String,
        required: true,
    },
    introduction: { 
        type: String,
        required: true,
    },
    courseId: { 
        type: String, 
        required: true  
    },
    userId: {
        type: String, 
        required: true  
    },
    markDownContent: { 
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
    lessonDate: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    lessonType: {
        type: String, 
        required: false  
    }
});

module.exports = lessonSchema;