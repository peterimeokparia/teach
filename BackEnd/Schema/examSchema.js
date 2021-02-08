import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const examSchema = new Schema ({
    title: { 
        type: String, 
        required: true,
    },
    examDateTime: { 
        type: Date, 
        required: false,
        default: Date.now 
    },
    description: { 
        type: String, 
        required: false,
    },
    createdBy: { 
          type: String, 
          required: true,
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    examQuestions: {
        type: Array,
        required: false
    }
});


export default examSchema;