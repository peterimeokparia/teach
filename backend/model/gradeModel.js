const mongoose = require('mongoose');
const gradeSchema = require('../schema/gradeSchema.js');


const gradeModel = mongoose.model('grades', gradeSchema);


module.exports = gradeModel;
