const mongoose = require('mongoose');
const formFieldSchema = require('../schema/formFieldSchema.js');

const formFieldAnswerModel = mongoose.model('formfieldanswers', formFieldSchema);

module.exports = formFieldAnswerModel;
