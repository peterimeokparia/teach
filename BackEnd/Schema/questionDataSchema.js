import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const questionDataSchema = new Schema ({
    questionNumber: { 
        type: String, 
        required: true,
    },
    questionId: { 
        type: String, 
        required: true,
    }, 
    numberOfStudentsThatAnsweredThisQuestionCorrectly: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsThatAnsweredThisQuestionInCorrectly: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsThatSkippedThisQuestion: { 
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
    },
    assignmentId: { 
        type: String, 
        required: true,
    }
});


export default questionDataSchema;