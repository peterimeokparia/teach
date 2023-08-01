const mongoose = require('mongoose');
const lessonPlanSchema = require('../schema/lessonPlanSchema.js');

const lessonDetailPlanModel = mongoose.model('lessondetailplan', lessonPlanSchema);

module.exports = lessonDetailPlanModel;
