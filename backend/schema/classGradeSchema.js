import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const classGradeSchema = new Schema ({
    grade: { 
        type: String, 
        required: false,
    },
    numberOfStudentsInGrade: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});

export default classGradeSchema;