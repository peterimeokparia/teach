const mongoose = require('mongoose');
const attendanceSchema = require('../schema/attendanceSchema.js');


const attendance = mongoose.model('attendances', attendanceSchema);


module.exports = attendance;
