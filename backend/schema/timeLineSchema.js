import mongoose from 'mongoose';

const Schema = mongoose.Schema; 

const timeLineSchema = new Schema ({
    timeLineName: { 
        type: String, 
        required: true  
    },
    groups: {
        type: Array,
        required: false
    },
    items: {
        type: Array,
        required: false
    },
    configProperties : {
        type: Array,
        required: false
    },
    operatorId: { 
        type: String, 
        required: true  
    }
});


export default timeLineSchema;