const mongoose = require('mongoose');
const questionSchema = require('../schema/questionSchema.js');


const questionModel = mongoose.model('questions', questionSchema);


module.exports = questionModel;
