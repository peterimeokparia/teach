const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const examDataSchema = new Schema ({
    numberOfStudentsThatTookThisExam: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsEnrolledInCourse: { 
        type: Number, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    examId: { 
        type: String, 
        required: true,
    }
});


module.exports = examDataSchema;