const mongoose = require('mongoose');
const eventSchema = require('../schema/eventSchema.js');

const eventModel = mongoose.model('event', eventSchema);

module.exports = eventModel;
