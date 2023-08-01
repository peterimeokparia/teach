const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const lessonPlanSchema = new Schema ({
    warmUp: { 
        type: String,
        required: true,
    },
    warmUpActivityList: { 
        type: Array,
        required: true,
    },
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
    lessonId: { 
        type: String, 
        required: true  
    },
    lessonDetailId: { 
        type: String, 
        required: true  
    },
    concepts: {
        type: Array,
        required: false
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

module.exports = lessonPlanSchema;