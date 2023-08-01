const mongoose = require('mongoose');
const reportFieldSchema = require('../schema/reportFieldSchema.js');

const reportFieldModel = mongoose.model('reportfield', reportFieldSchema);

module.exports = reportFieldModel;
