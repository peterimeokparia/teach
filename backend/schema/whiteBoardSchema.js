import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const whiteBoardSchema = new Schema ({
    wid: { 
        type: String, 
        required: false,
    },
    whiteBoardJasonData: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    color: { 
        type: String, 
        required: true  
    }
});

export default whiteBoardSchema;