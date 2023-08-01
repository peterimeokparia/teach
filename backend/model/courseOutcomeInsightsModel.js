const mongoose = require('mongoose');
const outcomeInsightsSchema = require('../schema/outcomeInsightsSchema.js');

const courseOutcomeInsightsModel = mongoose.model('courseoutcomeinsights', outcomeInsightsSchema);

module.exports = courseOutcomeInsightsModel;