const mongoose = require('mongoose');
const examSchema = require('../schema/examSchema.js');


const examModel = mongoose.model('exams', examSchema);


module.exports = examModel;
