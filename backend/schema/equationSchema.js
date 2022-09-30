import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const equationSchema = new Schema ({
    type: { 
        type: String, 
        required: false,
    },
    heading: { 
        type: String, 
        required: false,
    },
    equation: { 
        type: String, 
        required: false,
    },
    markDownContent: { 
        type: String, 
        required: false,
    },
    text: { 
        type: String, 
        required: false,
    },
});

export default equationSchema;
