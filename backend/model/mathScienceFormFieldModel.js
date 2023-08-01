const mongoose = require('mongoose');
const formFieldSchema = require('../schema/formFieldSchema.js');

const mathScienceFormFieldModel = mongoose.model('mathscienceformfields', formFieldSchema);

module.exports = mathScienceFormFieldModel;
