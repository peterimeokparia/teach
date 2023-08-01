const mongoose = require('mongoose');
const lessonPlanSchema = require('../schema/lessonPlanSchema.js');


const lessonDetailModel = mongoose.model('lessondetail', lessonPlanSchema);


module.exports = lessonDetailModel;
