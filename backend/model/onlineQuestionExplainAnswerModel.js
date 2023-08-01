const mongoose = require('mongoose');
const onlineQuestionSchema = require('../schema/onlineQuestionSchema.js');

const onlineQuestionExplainAnswerModel = mongoose.model('onlinequestionexplainanswer', onlineQuestionSchema );

module.exports = onlineQuestionExplainAnswerModel;
