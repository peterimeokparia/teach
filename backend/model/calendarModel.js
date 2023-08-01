const mongoose = require('mongoose');
const calendarSchema = require('../schema/calendarSchema.js');

const calendarModel = mongoose.model('calendar', calendarSchema);

module.exports = calendarModel;
