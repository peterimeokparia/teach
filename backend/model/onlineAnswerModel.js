const mongoose = require('mongoose');
const onlineQuestionAnswerSchema = require('../schema/onlineQuestionAnswerSchema.js');

const onlineAnswerModel = mongoose.model('onlineanswers', onlineQuestionAnswerSchema);

module.exports = onlineAnswerModel;
