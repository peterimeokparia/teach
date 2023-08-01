const mongoose = require('mongoose');
const outcomeInsightsSchema = require('../schema/outcomeInsightsSchema.js');

const outcomeInsightsModel = mongoose.model('outcomeinsights', outcomeInsightsSchema);

module.exports = outcomeInsightsModel; 
