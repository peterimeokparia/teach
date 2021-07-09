import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

//Build new exam from existing set of questions
const formFieldSchema = new Schema ({
   
    questionId:{
        type: String,
        required: false,
    },
    answerId:{
        type: String,
        required: false,
    },
    formFieldGroupId:{
        type: String,
        required: false,
    },
    enableFormFieldGroup:{
        type: Boolean,
        required: false,
    },
    inputType:{
        type: String,
        required: false,
    },
    inputValue:{
        type: String,
        required: false,
    },
    labelType:{
        type: String,
        required: false,
    },
    labelValue:{
        type: String,
        required: false,
    },
    formFieldCreatedOnDateTime: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    formFieldCreatedBy: { 
        type: String, 
        required: false,
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    xAxisformFieldPosition: {
        type: Number,
        required: false
    },
    yAxisformFieldPosition: {
        type: Number,
        required: false
    },
    files: { 
        type: Array, 
        required: false,
    },
    videoUrl: { 
        type: String, 
        required: false,
    },
});

export default formFieldSchema;