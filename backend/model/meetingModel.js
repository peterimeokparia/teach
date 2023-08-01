const mongoose = require('mongoose');
const meetingSchema = require('../schema/meetingSchema.js');


const meetingModel = mongoose.model('meetings', meetingSchema);


module.exports = meetingModel;
