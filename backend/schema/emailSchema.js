const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const emailSchema = new Schema ({
    fromEmail: { 
        type: String, 
        required: true
    },
    toEmail: { 
        type: String, 
        required: true,
    },
    subject: { 
        type: String, 
        required: true,
    },
    messageBody: { 
        type: String, 
        required: true,
    },
    userId: { 
        type: String, 
        required: true,
    },
});


module.exports = emailSchema;