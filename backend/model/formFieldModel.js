const mongoose = require('mongoose');
const formFieldSchema = require('../schema/formFieldSchema.js');

const formFieldModel = mongoose.model('formfields', formFieldSchema);

module.exports = formFieldModel;
