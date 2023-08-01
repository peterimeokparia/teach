const mongoose = require('mongoose');
const logForTeachSchema = require('../schema/logForTeachSchema.js');

const logForTeachModel = mongoose.model('logforteach', logForTeachSchema);

module.exports = logForTeachModel;
