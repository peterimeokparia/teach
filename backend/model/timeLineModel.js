const mongoose = require('mongoose');
const timeLineSchema = require('../schema/timeLineSchema.js');

const timeLineModel = mongoose.model( 'timelines', timeLineSchema );

module.exports = timeLineModel;
