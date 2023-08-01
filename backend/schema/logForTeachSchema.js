const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const logForTeachSchema = new Schema ({
    objectName: { 
        type: String, 
        required: false,
    },
    errorMessage:{
        type: Array, 
        required: false,
    }
});


module.exports = logForTeachSchema;