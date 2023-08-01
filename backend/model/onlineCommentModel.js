const mongoose = require('mongoose');
const onlineQuestionAnswersCommentsSchema = require('../schema/onlineQuestionAnswersCommentsSchema.js');

const onlineCommentModel = mongoose.model('onlinecomments', onlineQuestionAnswersCommentsSchema);

module.exports = onlineCommentModel;
