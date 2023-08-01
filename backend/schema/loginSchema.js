const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const loginSchema = new Schema ({
    userId: { 
        type: String, 
        required: true
    },
    logInTime: {
        type: Date, 
        required: false,
        default: Date.now  
    },
    logOutTime: {
        type: Date, 
        required: false,
        default: Date.now  
    }
});

module.exports = loginSchema;