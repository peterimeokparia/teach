const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const whiteBoardSchema = new Schema ({
    wid: { 
        type: String, 
        required: false,
    },
    meetingId: { 
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
    },
    timeSaved: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
});

module.exports = whiteBoardSchema;