const mongoose = require('mongoose');
const meetingNotesSchema = require('../schema/meetingNotesSchema.js');

const meetingNotesModel = mongoose.model('meetingnotes', meetingNotesSchema);

module.exports = meetingNotesModel;
