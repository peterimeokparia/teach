const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const attendanceSchema = new Schema ({
    attendanceDate: {
        type: Date, 
        required: true,
        default: Date.now  
    },
    attendanceMark: { 
        type: String,
        required: true,
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


module.exports = attendanceSchema;