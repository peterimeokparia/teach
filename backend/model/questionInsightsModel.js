const mongoose = require('mongoose');
const questionInsightsSchema = require('../schema/questionInsightsSchema.js');

const questionInsightsModel = mongoose.model('questioninsights', questionInsightsSchema);

module.exports = questionInsightsModel;
