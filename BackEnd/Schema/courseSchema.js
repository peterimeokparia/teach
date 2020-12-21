import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const courseSchema = new Schema ({
    name: { 
        type: String, 
        required: true,
    },
    price: { 
         type: Number, 
         required: false  
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
    }
});


export default courseSchema;