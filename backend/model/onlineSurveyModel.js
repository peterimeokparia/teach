const mongoose = require('mongoose');
const onlineSurveySchema = require('../schema/onlineSurveySchema.js');

const onlineSurveyModel = mongoose.model('onlinesurveys', onlineSurveySchema);

module.exports = onlineSurveyModel;
