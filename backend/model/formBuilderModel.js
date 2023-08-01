const mongoose = require('mongoose');
const formBuilderSchema = require('../schema/formBuilderSchema.js');

const formBuilderModel = mongoose.model('formbuilder', formBuilderSchema);

module.exports = formBuilderModel;
