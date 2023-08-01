const mongoose = require('mongoose');
const conceptSchema = require('../schema/conceptSchema.js');

const conceptModel = mongoose.model('concept', conceptSchema);

module.exports = conceptModel;
