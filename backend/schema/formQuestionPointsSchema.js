import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const formQuestionPointsSchema = new Schema ({
    
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
    cummulativePoints: { 
        type: Number, 
        required: false,
    }
});

export default formQuestionPointsSchema;