const mongoose = require('mongoose');
const outcomesSchema = require('../schema/outcomesSchema.js');

const outcomesModel = mongoose.model('outcomes', outcomesSchema);

module.exports = outcomesModel;
