const mongoose = require('mongoose');
const insightsSchema = require('../schema/insightsSchema.js');

const insightsModel = mongoose.model('insights', insightsSchema);

module.exports = insightsModel;
