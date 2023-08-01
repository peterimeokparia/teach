const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const insightsSchema = new Schema ({
    type: { 
        type: String, 
        required: false,
    },
    id: { 
        type: String, 
        required: false,
    },
    formName: { 
        type: String, 
        required: false,
    },
    userId: { 
        type: String, 
        required: false,
    },
    formUuId: { 
        type: String, 
        required: false,
    },
    totalPointsReceived: { 
        type: Number, 
        required: false,
    },
    numberOfStudents: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsPassed: { 
        type: Number, 
        required: false,
    },
    numberOfStudentsFailed: { 
        type: Number, 
        required: false,
    },
    passPercentRate: { 
        type: Number, 
        required: false,
    },
    failurePercentRate: { 
        type: Number, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});


module.exports = insightsSchema;