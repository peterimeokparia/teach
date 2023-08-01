const mongoose = require('mongoose');
const answerFormSchema = require('../schema/answerFormSchema.js');

const answerFormModel = mongoose.model('answerforms', answerFormSchema);

module.exports = answerFormModel;
