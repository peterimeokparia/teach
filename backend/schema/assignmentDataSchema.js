const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const assignmentDataSchema = new Schema ({
    numberOfStudentsThatWroteAssignment: { 
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
    assignmentId: { 
        type: String, 
        required: true,
    }
});


module.exports = assignmentDataSchema;