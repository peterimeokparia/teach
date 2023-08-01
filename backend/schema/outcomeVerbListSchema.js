const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const outcomeVerbListSchema = new Schema ({
    level: { 
        type: String,
        required: false,
    },
    verbList: { 
        type: Array, 
        required: false  
    },
    position: { 
        type: Number, 
        required: false  
    },
    color: { 
        type: String,
        required: false,
    },
    description: { 
        type: String,
        required: false,
    },
    userId: {
        type: String, 
        required: false  
    },
    creationDate: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    operatorId: { 
        type: String, 
        required: false,
    },
});

module.exports = outcomeVerbListSchema;