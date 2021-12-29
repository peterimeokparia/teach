import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const formFieldSchema = new Schema ({
    formType:{
        type: String,
        required: false,
    },
    formName:{
        type: String,
        required: false,
    },
    formUuId:{
        type: String,
        required: false,
    }, 
    userId:{
        type: String,
        required: false,
    },
    testTime:{
        type: Number,
        required: false,
    }
});

export default formFieldSchema;