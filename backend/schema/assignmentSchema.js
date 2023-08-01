const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const assignmentSchema = new Schema ({
    title: { 
        type: String, 
        required: true,
    },
    assignmentDateTime: { 
        type: Date, 
        required: false,
        default: Date.now 
    },
    description: { 
        type: String, 
        required: false,
    },
    createdBy: { 
          type: String, 
          required: true,
    },
    operatorId: { 
        type: String, 
        required: true  
    },
    assignmentQuestions: {
        type: Array,
        required: false
    }
});


module.exports = assignmentSchema;