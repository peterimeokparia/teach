const mongoose = require('mongoose');
const fullTextSearchSchema = require('../schema/fullTextSearchSchema.js');

const fullTextSearchModel = mongoose.model('fulltextsearch', fullTextSearchSchema);

module.exports = fullTextSearchModel;
