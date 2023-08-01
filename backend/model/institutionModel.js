const mongoose = require('mongoose');
const institutionSchema = require('../schema/institutionSchema.js');

const institutionModel = mongoose.model('institutions', institutionSchema);

module.exports = institutionModel;
