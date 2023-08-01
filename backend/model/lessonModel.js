const mongoose = require('mongoose');
const lessonSchema = require('../schema/lessonSchema.js');


const lessonModel = mongoose.model('lessons', lessonSchema);


module.exports = lessonModel;
