import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const institutionSchema = new Schema ({
    name: { 
        type: String, 
        required: true,
    },
    description: { 
        type: String, 
        required: false,
    },
    createDate: { 
        type: Date, 
        required: false,
        default: Date.now 
    },
    studentCount: {
        type: Number,
        require: false
    },
    createdBy: { 
          type: String, 
          required: true,
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});

export default institutionSchema;