const mongoose = require('mongoose');

const Schema = mongoose.Schema; 

const fullTextSearchSchema = new Schema ({
    contentId: { 
        type: String, 
        required: false,
    },
    modelNamePrimary: {
        type: String, 
        required: false,
    },
    modelNameSecondary: {
        type: String, 
        required: false,
    },
    formType: { 
        type: String, 
        required: false,
    },
    formName:{
        type: String,
        required: false,
    },
    formUuId:{
        type: String,
        required: false,
    },
    type: { 
        type: String, 
        required: false,
    },
    fullTextSearchContent:{ 
        type: String, 
        required: false,
    },
    fullTextSearchMarkDownContent:{ 
        type: String, 
        required: false,
    },
    fullTextSearchExplanationMarkDownContent:{ 
        type: String, 
        required: false,
    },
    route: { 
        type: String, 
        required: false,
    },
    dateFirstIndexed: { 
        type: Date, 
        required: false,
        default: Date.now  
    },
    userId: { 
        type: String, 
        required: false,
    },
    operatorId: { 
        type: String, 
        required: false  
    }
});

//fullTextSearchSchema.index({ fullTextSearchContent: 'text',  fullTextSearchMarkDownContent: 'text', fullTextSearchExplanationMarkDownContent: 'text', });

module.exports = fullTextSearchSchema;
