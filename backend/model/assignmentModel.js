const mongoose = require('mongoose');
const assignmentSchema = require('../schema/assignmentSchema.js');


const assignmentModel = mongoose.model('assignments', assignmentSchema);


module.exports = assignmentModel;
