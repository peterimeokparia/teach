const mongoose = require('mongoose');
const formQuestionPointsSchema = require('../schema/formQuestionPointsSchema.js');

const formQuestionPointsModel = mongoose.model('formquestionpoints', formQuestionPointsSchema);

module.exports = formQuestionPointsModel;
