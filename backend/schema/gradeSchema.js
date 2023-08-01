const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const gradeSchema = new Schema ({
    testDate: {
        type: Date, 
        required: true,
        default: Date.now  
    },
    score: { 
        type: Number,
        required: true,
    },
    percentChange: { 
        type: Number, 
        required: false  
    },
    symbol: { 
        type: String, 
        required: false,
    },
    courseId: { 
        type: String, 
        required: true  
    },
    lessonId: { 
        type: String, 
        required: false  
    },
    studentId: { 
        type: String, 
        required: true  
    }
});


module.exports = gradeSchema;