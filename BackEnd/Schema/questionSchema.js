import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

//Build new exam from existing set of questions

const questionSchema = new Schema ({
   
    questions:{
        type: Array,
        required: false,
    },
    lessonId: { 
        type: String, 
        required: false,
    },
    studentId: { 
        type: String, 
        required: false,
    },
    files: {
        type: Array,
        required: false
    },
    questionDifficultyLevel: { 
        type: String, 
        required: false,
    },
    questionCreatedBy: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    },
    coursesCovered: {
        type: Array,
        required: false
    }, 
    lessonsCovered:{
        type: Array,
        required: false
    },   
    examId: { 
        type: String, 
        required: false,
    },
    assignmentId: { 
        type: String, 
        required: false,
    }
});


export default questionSchema;