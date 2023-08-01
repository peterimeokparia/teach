const mongoose = require('mongoose');
const classGradeSchema = require('../schema/classGradeSchema.js');

const classGradeModel = mongoose.model('classgrades', classGradeSchema);

module.exports = classGradeModel;
