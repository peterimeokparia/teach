const mongoose = require('mongoose');
const questionFormSchema = require('../schema/questionFormSchema.js');

const questionFormModel = mongoose.model('questionforms', questionFormSchema);

module.exports = questionFormModel;
