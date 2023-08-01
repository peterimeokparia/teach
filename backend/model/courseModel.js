const mongoose = require('mongoose');
const courseSchema = require('./../schema/courseSchema.js');


const courseModel = mongoose.model('courses', courseSchema);


module.exports = courseModel;
