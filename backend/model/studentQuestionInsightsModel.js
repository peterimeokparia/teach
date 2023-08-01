const mongoose = require('mongoose');
const questionInsightsSchema = require('../schema/questionInsightsSchema.js');

const studentQuestionInsightsModel = mongoose.model('studentquestioninsights', questionInsightsSchema);

module.exports = studentQuestionInsightsModel;
