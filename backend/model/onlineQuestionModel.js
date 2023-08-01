const mongoose = require('mongoose');
const onlineQuestionSchema = require('../schema/onlineQuestionSchema.js');

const onlineQuestionModel = mongoose.model('onlinequestions', onlineQuestionSchema);

module.exports = onlineQuestionModel;
